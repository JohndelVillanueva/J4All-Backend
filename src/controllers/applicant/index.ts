import { type Context } from 'hono';
import { PrismaClient, Prisma } from '@prisma/client';
import { applicationSchema } from '../../shared/application.js';
import { verifyToken } from '../../utils/auth.js';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

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
    const verifiedToken = await verifyToken(token); // Use your actual token verification function
    
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
          type: 'info',
          user_id: application.job_listing.employer.user_id,
          is_read: false
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
          is_read: false
        }
      });

      console.log('[INFO] Confirmation notification sent to job seeker');
    } catch (notificationError) {
      console.error('[ERROR] Failed to send confirmation notification:', notificationError);
      // Don't fail the application if notification fails
    }

    return c.json({
      success: true,
      data: {
        application_id: application.id,
        job_title: application.job_listing.job_title,
        company: application.job_listing.employer.company_name,
        status: application.status,
        applied_at: application.application_date
      }
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
    const verifiedToken = await verifyToken(token);
    
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
                  logo_path: true
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
        logo: app.job_listing.employer.logo_path
      },
      updates: [] // Placeholder for future updates feature
    }));

    return c.json({
      success: true,
      data: transformedApplications,
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
    const verifiedToken = await verifyToken(token);
    
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
        phone_number: true
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
        resumeText: app.seeker.resume_text,
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
    const verifiedToken = await verifyToken(token);
    
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
    const verifiedToken = await verifyToken(token);
    
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
    const verifiedToken = await verifyToken(token);
    
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
          ? `$${job.salary_range_min.toLocaleString()} - $${job.salary_range_max.toLocaleString()}`
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
    const verifiedToken = await verifyToken(token);
    
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
      }
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