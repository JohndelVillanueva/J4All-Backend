import { type Context } from 'hono';
import { PrismaClient, Prisma } from '@prisma/client';
import { applicationSchema } from '../../shared/application.js';
import { verifyToken } from '../../utils/auth.js';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

// Real-time event emitter for application updates
const realTimeEvents = new Map();

// Function to broadcast real-time updates
const broadcastUpdate = (eventType: string, data: any, userId?: number) => {
  const event = {
    type: eventType,
    data,
    timestamp: new Date().toISOString(),
    userId
  };
  
  // Broadcast to all connected clients or specific user
  realTimeEvents.forEach((callback, clientId) => {
    try {
      callback(event);
    } catch (error) {
      console.error(`Error broadcasting to client ${clientId}:`, error);
    }
  });
};

// Apply for a job
export const applyForJobController = async (c: Context): Promise<Response> => {
  try {
    console.log('[DEBUG] Starting job application processing');

    const formData = await c.req.formData();
    console.log('[DEBUG] Received form fields:', [...formData.keys()]);

    // Get and verify token
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('[ERROR] Missing or invalid Authorization header');
      return c.json({ 
        success: false, 
        error: "Missing or invalid authorization" 
      }, 401);
    }
    
    const token = authHeader.split(' ')[1];
    const verifiedToken = verifyToken(token);
    
    if (!verifiedToken || !verifiedToken.userId) {
      console.error('[ERROR] Invalid or expired token');
      return c.json({ 
        success: false, 
        error: "Invalid authorization token" 
      }, 401);
    }

    const userId = verifiedToken.userId;

    // Find the JobSeeker profile for this user
    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { user_id: userId }
    });
    if (!jobSeeker) {
      return c.json({ success: false, error: "JobSeeker profile not found" }, 400);
    }
    const seekerId = jobSeeker.id;

    // Validate required fields
    const requiredFields = ['job_listing_id', 'employer_id', 'cover_letter'];
    const missingFields = requiredFields.filter(field => !formData.has(field));
    
    if (missingFields.length > 0) {
      console.error('[ERROR] Missing fields:', missingFields);
      return c.json({
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`
      }, 400);
    }

    // Parse and validate IDs
    const employerId = Number(formData.get('employer_id'));
    const jobListingId = Number(formData.get('job_listing_id'));
    
    if (isNaN(employerId) || isNaN(jobListingId)) {
      console.error('[ERROR] Invalid ID format');
      return c.json({
        success: false,
        error: "Invalid job or employer ID format"
      }, 400);
    }

    // Check for duplicate application
    const existingApplication = await prisma.jobApplication.findFirst({
      where: {
        job_id: jobListingId,
        seeker_id: seekerId
      }
    });

    if (existingApplication) {
      console.log('[INFO] Duplicate application detected');
      return c.json({
        success: false,
        error: "You've already applied to this job"
      }, 400);
    }

    // Process resume if provided
    let resumeUrl = null;
    const resumeFile = formData.get('resume');
    if (resumeFile instanceof File && resumeFile.size > 0) {
      console.log('[DEBUG] Processing resume file:', {
        name: resumeFile.name,
        size: resumeFile.size,
        type: resumeFile.type
      });

      const allowedTypes = ['application/pdf', 'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(resumeFile.type)) {
        return c.json({ 
          success: false,
          error: "Invalid file type. Only PDF and Word documents are allowed" 
        }, 400);
      }

      if (resumeFile.size > 5 * 1024 * 1024) {
        return c.json({ 
          success: false,
          error: "Resume too large (max 5MB)" 
        }, 400);
      }
      // Save the file to disk in uploads/resume
      const buffer = Buffer.from(await resumeFile.arrayBuffer());
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'resume');
      await fs.mkdir(uploadDir, { recursive: true });
      const fileName = `${userId}_${Date.now()}_${resumeFile.name}`;
      const filePath = path.join(uploadDir, fileName);
      await fs.writeFile(filePath, buffer);
      resumeUrl = `/uploads/resume/${fileName}`;
    }

    // Create application
    const application = await prisma.jobApplication.create({
      data: {
        job_id: jobListingId,
        seeker_id: seekerId,
        employer_id: employerId,
        cover_letter: formData.get('cover_letter') as string,
        resume: resumeUrl,
        status: 'PENDING'
      },
      include: {
        job_listing: {
          select: {
            job_title: true,
            employer: {
              select: {
                company_name: true,
                user_id: true
              }
            }
          }
        }
      }
    });

    // Log activity (best-effort)
    try {
      await (prisma as any).activity?.create({
        data: {
          type: 'application',
          seeker_id: seekerId,
          employer_id: employerId,
          job_id: jobListingId,
          application_id: application.id,
          title: 'Application submitted',
          description: `Seeker ${seekerId} applied to ${application.job_listing.job_title}`,
          status: 'applied',
        }
      });
    } catch {}

    // Get applicant information for notification
    const applicantUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        first_name: true,
        last_name: true,
        username: true
      }
    });

    // Send notification to employer about new application
    try {
      const applicantName = applicantUser?.first_name && applicantUser?.last_name
        ? `${applicantUser.first_name} ${applicantUser.last_name}`
        : applicantUser?.username || 'An applicant';

      await prisma.notification.create({
        data: {
          title: 'New Job Application',
          message: `${applicantName} has applied for the position: ${application.job_listing.job_title}`,
          type: 'application',
          user_id: application.job_listing.employer.user_id,
          is_read: false,
          application_id: application.id
        }
      });

      console.log('[INFO] Notification sent to employer for new application');
    } catch (notificationError) {
      console.error('[ERROR] Failed to send notification:', notificationError);
      // Don't fail the application if notification fails
    }

    // Send confirmation notification to job seeker
    try {
      await prisma.notification.create({
        data: {
          title: 'Application Submitted Successfully',
          message: `Your application for "${application.job_listing.job_title}" at ${application.job_listing.employer.company_name} has been submitted successfully.`,
          type: 'success',
          user_id: userId,
          is_read: false,
          application_id: application.id
        }
      });

      console.log('[INFO] Confirmation notification sent to job seeker');
    } catch (notificationError) {
      console.error('[ERROR] Failed to send confirmation notification:', notificationError);
      // Don't fail the application if notification fails
    }

    // 🔄 REAL-TIME: Broadcast new application to employer
    try {
      broadcastUpdate('NEW_APPLICATION', {
        application_id: application.id,
        job_title: application.job_listing.job_title,
        company: application.job_listing.employer.company_name,
        applicant_name: applicantUser?.first_name && applicantUser?.last_name
          ? `${applicantUser.first_name} ${applicantUser.last_name}`
          : applicantUser?.username || 'An applicant',
        applied_at: application.application_date,
        status: application.status
      }, application.job_listing.employer.user_id);
    } catch (rtError) {
      console.error('[ERROR] Failed to broadcast real-time update:', rtError);
    }

    // ✅ ADDED: Real-time response with refresh instructions
    return c.json({
      success: true,
      data: {
        application_id: application.id,
        job_title: application.job_listing.job_title,
        company: application.job_listing.employer.company_name,
        status: application.status,
        applied_at: application.application_date
      },
      // 🔄 REAL-TIME: Add real-time flags
      realTime: true,
      refresh: true,
      message: "Application submitted successfully!",
      broadcast: true,
      timestamp: new Date().toISOString()
    }, 201);
    
  } catch (error) {
    console.error('[ERROR] Controller error:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return c.json({ 
          success: false,
          error: "Duplicate application detected" 
        }, 400);
      }
      if (error.code === 'P2003') {
        return c.json({ 
          success: false,
          error: "Invalid job, employer, or applicant ID" 
        }, 400);
      }
    }
    if (error instanceof Error) {
      return c.json({ 
        success: false,
        error: error.message || "Internal server error" 
      }, 500);
    }
    return c.json({ 
      success: false,
      error: "Internal server error" 
    }, 500);
  }
};

// Get applications for logged-in user
export const getUserApplicationsController = async (c: Context): Promise<Response> => {
  try {
    console.log('[DEBUG] Starting to fetch user applications');

    // Get and verify token
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('[ERROR] Missing or invalid Authorization header');
      return c.json({ 
        success: false, 
        error: "Missing or invalid authorization" 
      }, 401);
    }
    
    const token = authHeader.split(' ')[1];
    const verifiedToken = verifyToken(token);
    
    if (!verifiedToken || !verifiedToken.userId) {
      console.error('[ERROR] Invalid or expired token');
      return c.json({ 
        success: false, 
        error: "Invalid authorization token" 
      }, 401);
    }

    const userId = verifiedToken.userId;

    // Find the JobSeeker profile for this user
    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { user_id: userId }
    });
    
    if (!jobSeeker) {
      console.log('[INFO] No JobSeeker profile found for user:', userId);
      return c.json({ 
        success: true, 
        data: [],
        message: "No applications found - user is not a job seeker"
      });
    }

    const seekerId = jobSeeker.id;

    // Get query parameters for filtering
    const { status, page = '1', limit = '10' } = c.req.query();
    const pageNumber = parseInt(page);
    const pageSize = parseInt(limit);
    const skip = (pageNumber - 1) * pageSize;

    // Build where clause
    const whereClause: any = {
      seeker_id: seekerId
    };
    
    if (status && status !== 'all') {
      whereClause.status = status.toUpperCase();
    }

    console.log('[DEBUG] Fetching applications with filters:', { seekerId, status, pageNumber, pageSize });

    // Fetch applications with job details
    const [applications, total] = await Promise.all([
      prisma.jobApplication.findMany({
        where: whereClause,
        skip,
        take: pageSize,
        orderBy: {
          application_date: 'desc'
        },
        include: {
          job_listing: {
            select: {
              id: true,
              job_title: true,
              job_type: true,
              job_location: true,
              salary_range_min: true,
              salary_range_max: true,
              work_mode: true,
              posted_date: true,
              employer: {
                select: {
                  id: true,
                  company_name: true,
                  logo_path: true,
                  contact_person: true, // HR name
                  user: {
                    select: {
                      photo: true // Employer profile photo
                    }
                  }
                }
              }
            }
          }
        }
      }),
      prisma.jobApplication.count({
        where: whereClause
      })
    ]);

    console.log('[DEBUG] Found applications:', applications.length);

    // Transform the data to match frontend expectations
    const transformedApplications = applications.map(app => ({
      id: app.id,
      jobId: app.job_id,
      status: app.status.toLowerCase(),
      date: app.application_date.toISOString().split('T')[0],
      coverLetter: app.cover_letter,
      resume: app.resume,
      job: {
        id: app.job_listing.id,
        title: app.job_listing.job_title,
        company: app.job_listing.employer.company_name,
        location: app.job_listing.job_location || '',
        salary: app.job_listing.salary_range_min && app.job_listing.salary_range_max 
          ? `$${app.job_listing.salary_range_min.toLocaleString()} - $${app.job_listing.salary_range_max.toLocaleString()}`
          : '',
        type: app.job_listing.job_type || '',
        posted: app.job_listing.posted_date.toISOString().split('T')[0],
        workMode: app.job_listing.work_mode,
        logo: app.job_listing.employer.logo_path,
        hrName: app.job_listing.employer.contact_person,
        hrPhoto: app.job_listing.employer.user?.photo
      },
      updates: [] // Placeholder for future updates feature
    }));

    return c.json({
      success: true,
      data: transformedApplications,
      // 🔄 REAL-TIME: Add real-time support
      realTime: true,
      timestamp: new Date().toISOString(),
      pagination: {
        current_page: pageNumber,
        total_pages: Math.ceil(total / pageSize),
        total_items: total,
        per_page: pageSize
      }
    });

  } catch (error) {
    console.error('[ERROR] Error fetching user applications:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return c.json({ 
        success: false,
        error: "Database error occurred" 
      }, 500);
    }
    if (error instanceof Error) {
      return c.json({ 
        success: false,
        error: error.message || "Internal server error" 
      }, 500);
    }
    return c.json({ 
      success: false,
      error: "Internal server error" 
    }, 500);
  }
};

// Get applicants for an employer
export const getEmployerApplicantsController = async (c: Context): Promise<Response> => {
  try {
    console.log('[DEBUG] Starting to fetch employer applicants');

    // Get and verify token
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('[ERROR] Missing or invalid Authorization header');
      return c.json({ 
        success: false, 
        error: "Missing or invalid authorization" 
      }, 401);
    }
    
    const token = authHeader.split(' ')[1];
    const verifiedToken = verifyToken(token);
    
    if (!verifiedToken || !verifiedToken.userId) {
      console.error('[ERROR] Invalid or expired token');
      return c.json({ 
        success: false, 
        error: "Invalid authorization token" 
      }, 401);
    }

    // ✅ SAFE FIX: Handle both string and number user IDs
    let userId: number;
    if (typeof verifiedToken.userId === 'string') {
      userId = parseInt(verifiedToken.userId, 10);
      if (isNaN(userId)) {
        console.error('[ERROR] Invalid user ID format:', verifiedToken.userId);
        return c.json({ 
          success: false, 
          error: "Invalid user ID format" 
        }, 400);
      }
    } else if (typeof verifiedToken.userId === 'number') {
      userId = verifiedToken.userId;
    } else {
      console.error('[ERROR] Unexpected user ID type:', typeof verifiedToken.userId);
      return c.json({ 
        success: false, 
        error: "Invalid user ID type" 
      }, 400);
    }

    console.log('[DEBUG] User ID (processed):', userId, 'Type:', typeof userId);

    // Find the Employer profile for this user
    const employer = await prisma.employer.findUnique({
      where: { user_id: userId } // Now passing as number
    });
    if (!employer) {
      console.log('[INFO] No Employer profile found for user:', userId);
      return c.json({ 
        success: true, 
        data: [],
        message: "No applicants found - user is not an employer"
      });
    }

    const employerId = employer.id;

    // Get query parameters for filtering
    const { status, job_id, page = '1', limit = '10' } = c.req.query();
    const pageNumber = parseInt(page);
    const pageSize = parseInt(limit);
    const skip = (pageNumber - 1) * pageSize;

    // Build where clause
    const whereClause: any = {
      employer_id: employerId
    };
    
    if (status && status !== 'all') {
      whereClause.status = status.toUpperCase();
    }

    if (job_id && job_id !== 'all') {
      whereClause.job_id = parseInt(job_id);
    }

    console.log('[DEBUG] Fetching applicants with filters:', { employerId, status, job_id, pageNumber, pageSize });

    // Fetch applications with job seeker and job details
    const [applications, total] = await Promise.all([
      prisma.jobApplication.findMany({
        where: whereClause,
        skip,
        take: pageSize,
        orderBy: {
          application_date: 'desc'
        },
        include: {
          seeker: true,
          job_listing: {
            select: {
              id: true,
              job_title: true,
              job_type: true,
              job_location: true,
              salary_range_min: true,
              salary_range_max: true,
              work_mode: true,
              posted_date: true
            }
          }
        }
      }),
      prisma.jobApplication.count({
        where: whereClause
      })
    ]);

    // Fetch user data for each seeker
    const seekerUserIds = [...new Set(applications.map(app => app.seeker.user_id))];
    const users = await prisma.user.findMany({
      where: {
        id: { in: seekerUserIds }
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone_number: true,
        photo: true // Include user photo
      }
    });

    // Create a map for quick user lookup
    const userMap = new Map(users.map(user => [user.id, user]));

    console.log('[DEBUG] Found applications:', applications.length);

    // Transform the data to match frontend expectations
    const transformedApplicants = applications.map(app => {
      const user = userMap.get(app.seeker.user_id);
      return {
        id: app.id,
        applicationId: app.id,
        name: user ? `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Unknown Applicant' : 'Unknown Applicant',
        email: user?.email || 'No email',
        phone: user?.phone_number || 'No phone',
        photo: user?.photo || null, // Add photo field
        position: app.job_listing.job_title,
        status: app.status.toLowerCase(),
        experience: app.seeker.experience_years ? `${app.seeker.experience_years} years` : 'Not specified',
        applied: app.application_date.toISOString().split('T')[0],
        coverLetter: app.cover_letter,
        resume: app.resume,
        education: app.seeker.education,
        currentJobTitle: app.seeker.current_job_title,
        desiredJobTitle: app.seeker.desired_job_title,
        desiredSalary: app.seeker.desired_salary,
        locationPreference: app.seeker.location_preference,
        user_id: app.seeker.user_id, // Add user_id for messaging
        job: {
          id: app.job_listing.id,
          title: app.job_listing.job_title,
          type: app.job_listing.job_type,
          location: app.job_listing.job_location,
          salary: app.job_listing.salary_range_min && app.job_listing.salary_range_max 
            ? `$${app.job_listing.salary_range_min.toLocaleString()} - $${app.job_listing.salary_range_max.toLocaleString()}`
            : 'Not specified',
          workMode: app.job_listing.work_mode,
          posted: app.job_listing.posted_date.toISOString().split('T')[0]
        },
        skills: [] // Placeholder for future skills feature
      };
    });

    return c.json({
      success: true,
      data: transformedApplicants,
      // 🔄 REAL-TIME: Add real-time support
      realTime: true,
      timestamp: new Date().toISOString(),
      pagination: {
        current_page: pageNumber,
        total_pages: Math.ceil(total / pageSize),
        total_items: total,
        per_page: pageSize
      }
    });

  } catch (error) {
    console.error('[ERROR] Error fetching employer applicants:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return c.json({ 
        success: false,
        error: "Database error occurred" 
      }, 500);
    }
    if (error instanceof Error) {
      return c.json({ 
        success: false,
        error: error.message || "Internal server error" 
      }, 500);
    }
    return c.json({ 
      success: false,
      error: "Internal server error" 
    }, 500);
  }
};

// Update application status (for employers)
export const updateApplicationStatusController = async (c: Context): Promise<Response> => {
  try {
    console.log('[DEBUG] Starting application status update');

    // Get and verify token
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('[ERROR] Missing or invalid Authorization header');
      return c.json({ 
        success: false, 
        error: "Missing or invalid authorization" 
      }, 401);
    }
    
    const token = authHeader.split(' ')[1];
    const verifiedToken = verifyToken(token);
    
    if (!verifiedToken || !verifiedToken.userId) {
      console.error('[ERROR] Invalid or expired token');
      return c.json({ 
        success: false, 
        error: "Invalid authorization token" 
      }, 401);
    }

    const userId = verifiedToken.userId;

    // Find the Employer profile for this user
    const employer = await prisma.employer.findUnique({
      where: { user_id: userId }
    });
    
    if (!employer) {
      return c.json({ 
        success: false, 
        error: "Only employers can update application status" 
      }, 403);
    }

    const applicationId = parseInt(c.req.param('id'));
    const body = await c.req.json();
    const { status, notes } = body;

    // Validate status
    const validStatuses = ['PENDING', 'REVIEW', 'INTERVIEW', 'HIRED', 'REJECTED'];
    if (!validStatuses.includes(status?.toUpperCase())) {
      return c.json({
        success: false,
        error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      }, 400);
    }

    // Get the application with related data
    const application = await prisma.jobApplication.findFirst({
      where: {
        id: applicationId,
        employer_id: employer.id // Ensure employer owns this application
      },
      include: {
        job_listing: {
          select: {
            job_title: true,
            employer: {
              select: {
                company_name: true,
                user_id: true
              }
            }
          }
        },
        seeker: {
          select: {
            user_id: true
          }
        }
      }
    });

    if (!application) {
      return c.json({
        success: false,
        error: "Application not found or access denied"
      }, 404);
    }

    // Update the application status
    const updatedApplication = await prisma.jobApplication.update({
      where: { id: applicationId },
      data: {
        status: status.toUpperCase(),
        notes: notes || null
      }
    });

    // Log activity for status update (best-effort)
    try {
      const normalized = status.toUpperCase() === 'HIRED' ? 'approved' : status.toUpperCase() === 'REJECTED' ? 'declined' : 'applied';
      await (prisma as any).activity?.create({
        data: {
          type: 'application',
          seeker_id: application.seeker_id,
          employer_id: application.employer_id,
          job_id: application.job_id,
          application_id: application.id,
          title: 'Application status updated',
          description: `Status: ${status}`,
          status: normalized,
        }
      });
    } catch {}

    // Send notification to job seeker about status change
    try {
      const statusMessages = {
        'REVIEW': 'Your application is under review',
        'INTERVIEW': 'You have been selected for an interview!',
        'HIRED': 'Congratulations! You have been hired!',
        'REJECTED': 'Your application was not selected for this position'
      };

      const message = statusMessages[status.toUpperCase() as keyof typeof statusMessages] || 
        `Your application status has been updated to: ${status}`;

      await prisma.notification.create({
        data: {
          title: 'Application Status Update',
          message: `${message} for the position "${application.job_listing.job_title}" at ${application.job_listing.employer.company_name}.`,
          type: status.toUpperCase() === 'HIRED' ? 'success' : 
                status.toUpperCase() === 'REJECTED' ? 'error' : 'info',
          user_id: application.seeker.user_id,
          is_read: false
        }
      });

      // 🔄 REAL-TIME: Broadcast status update to job seeker
      try {
        broadcastUpdate('STATUS_UPDATE', {
          application_id: updatedApplication.id,
          job_title: application.job_listing.job_title,
          company: application.job_listing.employer.company_name,
          status: updatedApplication.status,
          previous_status: application.status,
          updated_at: updatedApplication.application_date,
          message: message
        }, application.seeker.user_id);
      } catch (rtError) {
        console.error('[ERROR] Failed to broadcast real-time status update:', rtError);
      }

      // Send chat message to applicant if hired or rejected
      const employerUser = await prisma.user.findUnique({ where: { id: employer.user_id } });
      const applicantUser = await prisma.user.findUnique({ where: { id: application.seeker.user_id } });
      if (employerUser && applicantUser) {
        // Find or create conversation
        let conversation = await prisma.conversation.findFirst({
          where: {
            OR: [
              { participant1_id: employerUser.id, participant2_id: applicantUser.id },
              { participant1_id: applicantUser.id, participant2_id: employerUser.id }
            ]
          }
        });
        if (!conversation) {
          conversation = await prisma.conversation.create({
            data: {
              participant1_id: employerUser.id,
              participant2_id: applicantUser.id
            }
          });
        }
        let content = "";
        if (status.toUpperCase() === "HIRED") {
          content = `Congratulations! You have been hired for the position \"${application.job_listing.job_title}\" at ${application.job_listing.employer.company_name}.`;
        } else if (status.toUpperCase() === "REJECTED") {
          content = `We regret to inform you that your application for \"${application.job_listing.job_title}\" at ${application.job_listing.employer.company_name} was not successful.`;
        }
        if (content) {
          await prisma.message.create({
            data: {
              conversation_id: conversation.id,
              sender_id: employerUser.id,
              receiver_id: applicantUser.id,
              content
            }
          });
        }
      }

      console.log('[INFO] Status update notification sent to job seeker');
    } catch (notificationError) {
      console.error('[ERROR] Failed to send status update notification:', notificationError);
      // Don't fail the status update if notification fails
    }

    return c.json({
      success: true,
      data: {
        application_id: updatedApplication.id,
        status: updatedApplication.status,
        notes: updatedApplication.notes,
        updated_at: updatedApplication.application_date
      },
      // 🔄 REAL-TIME: Add real-time flags
      realTime: true,
      broadcast: true,
      message: `Application status updated to ${status} successfully!`,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('[ERROR] Error updating application status:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return c.json({ 
        success: false,
        error: "Database error occurred" 
      }, 500);
    }
    if (error instanceof Error) {
      return c.json({ 
        success: false,
        error: error.message || "Internal server error" 
      }, 500);
    }
    return c.json({ 
      success: false,
      error: "Internal server error" 
    }, 500);
  }
};

// 🔄 REAL-TIME: Add WebSocket/SSE endpoint for real-time updates
export const realTimeUpdatesController = async (c: Context): Promise<Response> => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ success: false, error: "Missing authorization" }, 401);
    }
    
    const token = authHeader.split(' ')[1];
    const verifiedToken = verifyToken(token);
    
    if (!verifiedToken || !verifiedToken.userId) {
      return c.json({ success: false, error: "Invalid token" }, 401);
    }

    const userId = verifiedToken.userId;
    const clientId = `client_${userId}_${Date.now()}`;

    // Set up Server-Sent Events
    c.header('Content-Type', 'text/event-stream');
    c.header('Cache-Control', 'no-cache');
    c.header('Connection', 'keep-alive');

    const stream = new ReadableStream({
      start(controller) {
        // Add client to real-time events
        realTimeEvents.set(clientId, (event: any) => {
          // Only send events for this user or broadcast events
          if (!event.userId || event.userId === userId) {
            const data = `data: ${JSON.stringify(event)}\n\n`;
            controller.enqueue(new TextEncoder().encode(data));
          }
        });

        // Send connection established event
        const connectEvent = {
          type: 'CONNECTED',
          data: { clientId, userId },
          timestamp: new Date().toISOString()
        };
        controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify(connectEvent)}\n\n`));

        // Handle client disconnect
        c.req.raw.signal.addEventListener('abort', () => {
          realTimeEvents.delete(clientId);
          controller.close();
        });
      },
      cancel() {
        realTimeEvents.delete(clientId);
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('[ERROR] Real-time updates controller error:', error);
    return c.json({ success: false, error: "Real-time connection failed" }, 500);
  }
};

// Save a job for logged-in user
export const saveJobController = async (c: Context): Promise<Response> => {
  try {
    console.log('[DEBUG] Starting to save job');

    // Get and verify token
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('[ERROR] Missing or invalid Authorization header');
      return c.json({ 
        success: false, 
        error: "Missing or invalid authorization" 
      }, 401);
    }
    
    const token = authHeader.split(' ')[1];
    const verifiedToken = verifyToken(token);
    
    if (!verifiedToken || !verifiedToken.userId) {
      console.error('[ERROR] Invalid or expired token');
      return c.json({ 
        success: false, 
        error: "Invalid authorization token" 
      }, 401);
    }

    const userId = verifiedToken.userId;

    // Find the JobSeeker profile for this user
    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { user_id: userId }
    });
    
    if (!jobSeeker) {
      console.log('[INFO] No JobSeeker profile found for user:', userId);
      return c.json({ 
        success: false, 
        error: "User is not a job seeker" 
      }, 400);
    }

    const seekerId = jobSeeker.id;

    // Get job ID from request body
    const body = await c.req.json();
    const { job_id } = body;

    if (!job_id) {
      return c.json({ 
        success: false, 
        error: "Job ID is required" 
      }, 400);
    }

    // Check if job already exists
    const existingJob = await prisma.jobListing.findUnique({
      where: { id: job_id }
    });

    if (!existingJob) {
      return c.json({ 
        success: false, 
        error: "Job not found" 
      }, 404);
    }

    // Check if job is already saved
    const existingSavedJob = await prisma.savedJob.findUnique({
      where: {
        seeker_id_job_id: {
          seeker_id: seekerId,
          job_id: job_id
        }
      }
    });

    if (existingSavedJob) {
      return c.json({ 
        success: false, 
        error: "Job is already saved" 
      }, 400);
    }

    // Save the job
    const savedJob = await prisma.savedJob.create({
      data: {
        seeker_id: seekerId,
        job_id: job_id,
        saved_date: new Date()
      }
    });

    // Get job details separately
    const jobDetails = await prisma.jobListing.findUnique({
      where: { id: job_id },
      select: {
        id: true,
        job_title: true,
        employer: {
          select: {
            company_name: true
          }
        }
      }
    });

    console.log('[DEBUG] Job saved successfully:', savedJob.id);

    return c.json({
      success: true,
      data: {
        saved_job_id: savedJob.id,
        job_title: jobDetails?.job_title || 'Unknown Job',
        company: jobDetails?.employer?.company_name || 'Unknown Company',
        saved_date: savedJob.saved_date
      },
      message: "Job saved successfully"
    });

  } catch (error) {
    console.error('[ERROR] Error saving job:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return c.json({ 
          success: false,
          error: "Job is already saved" 
        }, 400);
      }
      return c.json({ 
        success: false,
        error: "Database error occurred" 
      }, 500);
    }
    if (error instanceof Error) {
      return c.json({ 
        success: false,
        error: error.message || "Internal server error" 
      }, 500);
    }
    return c.json({ 
      success: false,
      error: "Internal server error" 
    }, 500);
  }
};

// Unsave a job for logged-in user
export const unsaveJobController = async (c: Context): Promise<Response> => {
  try {
    console.log('[DEBUG] Starting to unsave job');

    // Get and verify token
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('[ERROR] Missing or invalid Authorization header');
      return c.json({ 
        success: false, 
        error: "Missing or invalid authorization" 
      }, 401);
    }
    
    const token = authHeader.split(' ')[1];
    const verifiedToken = verifyToken(token);
    
    if (!verifiedToken || !verifiedToken.userId) {
      console.error('[ERROR] Invalid or expired token');
      return c.json({ 
        success: false, 
        error: "Invalid authorization token" 
      }, 401);
    }

    const userId = verifiedToken.userId;

    // Find the JobSeeker profile for this user
    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { user_id: userId }
    });
    
    if (!jobSeeker) {
      console.log('[INFO] No JobSeeker profile found for user:', userId);
      return c.json({ 
        success: false, 
        error: "User is not a job seeker" 
      }, 400);
    }

    const seekerId = jobSeeker.id;

    // Get job ID from request body
    const body = await c.req.json();
    const { job_id } = body;

    if (!job_id) {
      return c.json({ 
        success: false, 
        error: "Job ID is required" 
      }, 400);
    }

    // Find and delete the saved job
    const deletedSavedJob = await prisma.savedJob.deleteMany({
      where: {
        seeker_id: seekerId,
        job_id: job_id
      }
    });

    if (deletedSavedJob.count === 0) {
      return c.json({ 
        success: false, 
        error: "Job is not saved" 
      }, 404);
    }

    console.log('[DEBUG] Job unsaved successfully');

    return c.json({
      success: true,
      message: "Job unsaved successfully"
    });

  } catch (error) {
    console.error('[ERROR] Error unsaving job:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return c.json({ 
        success: false,
        error: "Database error occurred" 
      }, 500);
    }
    if (error instanceof Error) {
      return c.json({ 
        success: false,
        error: error.message || "Internal server error" 
      }, 500);
    }
    return c.json({ 
      success: false,
      error: "Internal server error" 
    }, 500);
  }
};

// Get saved jobs for logged-in user
export const getSavedJobsController = async (c: Context): Promise<Response> => {
  try {
    console.log('[DEBUG] Starting to fetch saved jobs');

    // Get and verify token
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('[ERROR] Missing or invalid Authorization header');
      return c.json({ 
        success: false, 
        error: "Missing or invalid authorization" 
      }, 401);
    }
    
    const token = authHeader.split(' ')[1];
    const verifiedToken = verifyToken(token);
    
    if (!verifiedToken || !verifiedToken.userId) {
      console.error('[ERROR] Invalid or expired token');
      return c.json({ 
        success: false, 
        error: "Invalid authorization token" 
      }, 401);
    }

    const userId = verifiedToken.userId;

    // Find the JobSeeker profile for this user
    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { user_id: userId }
    });
    
    if (!jobSeeker) {
      console.log('[INFO] No JobSeeker profile found for user:', userId);
      return c.json({ 
        success: true, 
        data: [],
        message: "No saved jobs found - user is not a job seeker"
      });
    }

    const seekerId = jobSeeker.id;

    // Get query parameters for pagination
    const { page = '1', limit = '10' } = c.req.query();
    const pageNumber = parseInt(page);
    const pageSize = parseInt(limit);
    const skip = (pageNumber - 1) * pageSize;

    console.log('[DEBUG] Fetching saved jobs with pagination:', { seekerId, pageNumber, pageSize });

    // Fetch saved jobs
    const [savedJobs, total] = await Promise.all([
      prisma.savedJob.findMany({
        where: { seeker_id: seekerId },
        skip,
        take: pageSize,
        orderBy: {
          saved_date: 'desc'
        }
      }),
      prisma.savedJob.count({
        where: { seeker_id: seekerId }
      })
    ]);

    console.log('[DEBUG] Found saved jobs:', savedJobs.length);

    // Get job details for each saved job
    const jobIds = savedJobs.map(savedJob => savedJob.job_id);
    const jobDetails = await prisma.jobListing.findMany({
      where: { id: { in: jobIds } },
      select: {
        id: true,
        job_title: true,
        job_type: true,
        job_location: true,
        salary_range_min: true,
        salary_range_max: true,
        work_mode: true,
        posted_date: true,
        employer: {
          select: {
            id: true,
            company_name: true,
            logo_path: true,
            user_id: true
          }
        },
        job_description: true,
        job_requirements: true,
        required_skills: {
          select: {
            id: true,
            skill: {
              select: {
                id: true,
                name: true,
                category: true
              }
            },
            is_required: true,
            importance_level: true
          }
        }
      }
    });

    // Create a map for quick job lookup
    const jobMap = new Map(jobDetails.map(job => [job.id, job]));

    // Manual user lookup for employer
    const employerUserIds = Array.from(new Set(jobDetails.map(j => j.employer?.user_id).filter(Boolean)));
    const employerUsers = await prisma.user.findMany({
      where: { id: { in: employerUserIds } },
      select: { id: true, first_name: true, last_name: true }
    });
    const employerUserMap = new Map(employerUsers.map(u => [u.id, u]));

    // Transform the data to match frontend expectations
    const transformedSavedJobs = savedJobs.map(savedJob => {
      const job = jobMap.get(savedJob.job_id) as any;
      const employerUser = job?.employer?.user_id ? employerUserMap.get(job.employer.user_id) : null;
      return {
        id: savedJob.job_id,
        title: job?.job_title || 'Unknown Job',
        company: job?.employer?.company_name || 'Unknown Company',
        location: job?.job_location || '',
        salary: job?.salary_range_min && job?.salary_range_max 
          ? `${job.salary_range_min.toLocaleString()} - ${job.salary_range_max.toLocaleString()}`
          : '',
        type: job?.job_type || '',
        posted: job?.posted_date ? job.posted_date.toISOString().split('T')[0] : '',
        workMode: job?.work_mode,
        logo: job?.employer?.logo_path,
        savedDate: savedJob.saved_date.toISOString().split('T')[0],
        status: "saved",
        job_description: job?.job_description || "",
        job_requirements: job?.job_requirements || "",
        skills: (job?.required_skills || []).map((rs: any) => ({
          id: rs.skill.id,
          name: rs.skill.name,
          category: rs.skill.category,
          is_required: rs.is_required,
          importance_level: rs.importance_level
        })),
        hrFirstName: employerUser?.first_name || '',
        hrLastName: employerUser?.last_name || '',
        employer_id: job?.employer?.id || null,
        employer_user_id: job?.employer?.user_id || null,
      };
    });

    return c.json({
      success: true,
      data: transformedSavedJobs,
      pagination: {
        current_page: pageNumber,
        total_pages: Math.ceil(total / pageSize),
        total_items: total,
        per_page: pageSize
      }
    });

  } catch (error) {
    console.error('[ERROR] Error fetching saved jobs:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return c.json({ 
        success: false,
        error: "Database error occurred" 
      }, 500);
    }
    if (error instanceof Error) {
      return c.json({ 
        success: false,
        error: error.message || "Internal server error" 
      }, 500);
    }
    return c.json({ 
      success: false,
      error: "Internal server error" 
    }, 500);
  }
};

export const getApplicationDetailsController = async (c: Context): Promise<Response> => {
  const id = c.req.param('id');
  try {
    const application = await prisma.jobApplication.findUnique({
      where: { id: Number(id) },
      include: {
        job_listing: {
          select: {
            job_title: true,
            employer: { select: { company_name: true } }
          }
        },
        seeker: true
      }
    });
    if (!application) {
      console.error(`[ERROR] Application not found for id: ${id}`);
      return c.json({ success: false, message: 'Application not found' }, 404);
    }

    let applicantUser = null;
    if (application.seeker && application.seeker.user_id) {
      applicantUser = await prisma.user.findUnique({
        where: { id: application.seeker.user_id }
      });
      if (!applicantUser) {
        console.error(`[ERROR] User not found for seeker user_id: ${application.seeker.user_id}`);
      }
    } else {
      console.error(`[ERROR] Seeker or seeker.user_id not found for application id: ${id}`);
    }

    return c.json({
      success: true,
      data: {
        id: application.id,
        job_title: application.job_listing.job_title,
        company: application.job_listing.employer.company_name,
        status: application.status,
        applied_at: application.application_date,
        resume: application.resume,
        cover_letter: application.cover_letter,
        applicant: applicantUser ? {
          first_name: applicantUser.first_name,
          last_name: applicantUser.last_name,
          email: applicantUser.email,
          phone_number: applicantUser.phone_number,
          photo: applicantUser.photo
        } : null
      }
    });
  } catch (err: any) {
    console.error('[ERROR] getApplicationDetailsController:', err);
    return c.json({ success: false, message: 'Server error', error: err.message }, 500);
  }
};

// Get detailed applicant profile information
export const getApplicantProfileController = async (c: Context): Promise<Response> => {
  try {
    console.log('[DEBUG] Starting to fetch applicant profile');

    // Get and verify token
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('[ERROR] Missing or invalid Authorization header');
      return c.json({ 
        success: false, 
        error: "Missing or invalid authorization" 
      }, 401);
    }
    
    const token = authHeader.split(' ')[1];
    const verifiedToken = verifyToken(token);
    
    if (!verifiedToken || !verifiedToken.userId) {
      console.error('[ERROR] Invalid or expired token');
      return c.json({ 
        success: false, 
        error: "Invalid authorization token" 
      }, 401);
    }

    const userId = verifiedToken.userId;

    // Find the Employer profile for this user
    const employer = await prisma.employer.findUnique({
      where: { user_id: userId }
    });
    
    if (!employer) {
      console.log('[INFO] No Employer profile found for user:', userId);
      return c.json({ 
        success: false, 
        error: "Only employers can view applicant profiles" 
      }, 403);
    }

    // Get applicant user ID from query parameter
    const { applicantUserId } = c.req.query();
    
    if (!applicantUserId) {
      return c.json({ 
        success: false, 
        error: "Applicant user ID is required" 
      }, 400);
    }

    const applicantUserIdNum = parseInt(applicantUserId);
    if (isNaN(applicantUserIdNum)) {
      return c.json({ 
        success: false, 
        error: "Invalid applicant user ID format" 
      }, 400);
    }

    // Fetch user data
    const user = await prisma.user.findUnique({
      where: { id: applicantUserIdNum },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone_number: true,
        photo: true,
        user_type: true,
        created_at: true,
        last_login: true
      }
    });

    if (!user) {
      return c.json({ 
        success: false, 
        error: "Applicant not found" 
      }, 404);
    }

    // Fetch job seeker data
    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { user_id: applicantUserIdNum },
      include: {
        skills: {
          include: {
            skill: {
              select: {
                id: true,
                name: true,
                category: true
              }
            }
          }
        }
      }
    });

    if (!jobSeeker) {
      return c.json({ 
        success: false, 
        error: "Job seeker profile not found" 
      }, 404);
    }

    // Transform skills data
    const skills = jobSeeker.skills.map(seekerSkill => ({
      id: seekerSkill.skill.id,
      name: seekerSkill.skill.name,
      category: seekerSkill.skill.category,
      proficiency_level: seekerSkill.proficiency_level,
      years_of_experience: seekerSkill.years_of_experience
    }));

    // Return combined profile data
    return c.json({
      success: true,
      data: {
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          phone_number: user.phone_number,
          photo: user.photo,
          user_type: user.user_type,
          created_at: user.created_at,
          last_login: user.last_login
        },
        jobSeeker: {
          id: jobSeeker.id,
          education: jobSeeker.education,
          experience_years: jobSeeker.experience_years,
          current_job_title: jobSeeker.current_job_title,
          desired_job_title: jobSeeker.desired_job_title,
          desired_salary: jobSeeker.desired_salary,
          location_preference: jobSeeker.location_preference,
          disability: jobSeeker.disability,
          skills: skills
        }
      }
    });

  } catch (error) {
    console.error('[ERROR] Error fetching applicant profile:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return c.json({ 
        success: false,
        error: "Database error occurred" 
      }, 500);
    }
    if (error instanceof Error) {
      return c.json({ 
        success: false,
        error: error.message || "Internal server error" 
      }, 500);
    }
    return c.json({ 
      success: false,
      error: "Internal server error" 
    }, 500);
  }
};

export const checkSavedJobController = async (c: Context): Promise<Response> => {
  try {
    console.log('[DEBUG] Checking if job is saved');

    // Get and verify token
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('[ERROR] Missing or invalid Authorization header');
      return c.json({ 
        success: false, 
        error: "Missing or invalid authorization" 
      }, 401);
    }
    
    const token = authHeader.split(' ')[1];
    const verifiedToken = verifyToken(token);
    
    if (!verifiedToken || !verifiedToken.userId) {
      console.error('[ERROR] Invalid or expired token');
      return c.json({ 
        success: false, 
        error: "Invalid authorization token" 
      }, 401);
    }

    const userId = verifiedToken.userId;

    // Find the JobSeeker profile for this user
    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { user_id: userId }
    });
    
    if (!jobSeeker) {
      console.log('[INFO] No JobSeeker profile found for user:', userId);
      return c.json({ 
        success: true, 
        data: { isSaved: false },
        message: "User is not a job seeker"
      });
    }

    const seekerId = jobSeeker.id;

    // Get job ID from query parameter
    const jobId = parseInt(c.req.param('jobId'));
    
    if (isNaN(jobId)) {
      return c.json({ 
        success: false, 
        error: "Invalid job ID format" 
      }, 400);
    }

    // Check if job is saved
    const savedJob = await prisma.savedJob.findUnique({
      where: {
        seeker_id_job_id: {
          seeker_id: seekerId,
          job_id: jobId
        }
      }
    });

    const isSaved = !!savedJob;

    console.log('[DEBUG] Job saved status:', { jobId, isSaved });

    return c.json({
      success: true,
      data: {
        isSaved: isSaved,
        job_id: jobId
      }
    });

  } catch (error) {
    console.error('[ERROR] Error checking saved job:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return c.json({ 
        success: false,
        error: "Database error occurred" 
      }, 500);
    }
    if (error instanceof Error) {
      return c.json({ 
        success: false,
        error: error.message || "Internal server error" 
      }, 500);
    }
    return c.json({ 
      success: false,
      error: "Internal server error" 
    }, 500);
  }
};