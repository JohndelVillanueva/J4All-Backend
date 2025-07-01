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
                company_name: true
              }
            }
          }
        }
      }
    });

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

// Get applicant's applications
// export const getMyApplicationsController = async (c: Context): Promise<Response> => {
//   try {
//     const applicantId = c.get('applicantId');
//     const { status, page = '1', limit = '10' } = c.req.query();

//     const pageNumber = parseInt(page);
//     const pageSize = parseInt(limit);
//     const skip = (pageNumber - 1) * pageSize;

//     const whereClause = {
//       applicant_id: applicantId,
//       ...(status && { status })
//     };

//     const [applications, total] = await Promise.all([
//       prisma.jobApplication.findMany({
//         where: whereClause,
//         skip,
//         take: pageSize,
//         orderBy: {
//           applied_at: 'desc'
//         },
//         include: {
//           job_listing: {
//             select: {
//               id: true,
//               job_title: true,
//               job_type: true,
//               job_location: true,
//               employer: {
//                 select: {
//                   name: true,
//                   logo_url: true
//                 }
//               }
//             }
//           }
//         }
//       }),
//       prisma.jobApplication.count({
//         where: whereClause
//       })
//     ]);

//     return c.json({
//       success: true,
//       data: applications.map(app => ({
//         id: app.id,
//         status: app.status,
//         applied_at: app.applied_at,
//         job: {
//           id: app.job_listing.id,
//           title: app.job_listing.job_title,
//           type: app.job_listing.job_type,
//           location: app.job_listing.job_location,
//           company: app.job_listing.employer.name,
//           logo: app.job_listing.employer.logo_url
//         }
//       })),
//       pagination: {
//         current_page: pageNumber,
//         total_pages: Math.ceil(total / pageSize),
//         total_items: total,
//         per_page: pageSize
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching applications:', error);
//     return c.json({
//       success: false,
//       message: 'Failed to fetch applications',
//     }, 500);
//   }
// };

// // Get application details
// export const getApplicationDetailsController = async (c: Context): Promise<Response> => {
//   try {
//     const applicantId = c.get('applicantId');
//     const applicationId = parseInt(c.req.param('id'));

//     const application = await prisma.jobApplication.findFirst({
//       where: {
//         id: applicationId,
//         applicant_id: applicantId
//       },
//       include: {
//         job_listing: {
//           select: {
//             id: true,
//             job_title: true,
//             job_description: true,
//             job_requirements: true,
//             job_type: true,
//             job_location: true,
//             posted_date: true,
//             employer: {
//               select: {
//                 id: true,
//                 name: true,
//                 about: true,
//                 website_url: true
//               }
//             }
//           }
//         },
//         answers: {
//           include: {
//             question: {
//               select: {
//                 text: true
//               }
//             }
//           }
//         }
//       }
//     });

//     if (!application) {
//       return c.json({
//         success: false,
//         message: 'Application not found',
//       }, 404);
//     }

//     return c.json({
//       success: true,
//       data: {
//         id: application.id,
//         status: application.status,
//         cover_letter: application.cover_letter,
//         resume_url: application.resume_url,
//         applied_at: application.applied_at,
//         job: {
//           id: application.job_listing.id,
//           title: application.job_listing.job_title,
//           description: application.job_listing.job_description,
//           requirements: application.job_listing.job_requirements,
//           type: application.job_listing.job_type,
//           location: application.job_listing.job_location,
//           posted_date: application.job_listing.posted_date,
//           company: {
//             id: application.job_listing.employer.id,
//             name: application.job_listing.employer.name,
//             about: application.job_listing.employer.about,
//             website: application.job_listing.employer.website_url
//           }
//         },
//         answers: application.answers.map(answer => ({
//           question: answer.question.text,
//           answer: answer.answer
//         }))
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching application details:', error);
//     return c.json({
//       success: false,
//       message: 'Failed to fetch application details',
//     }, 500);
//   }
// };

// // Withdraw application
// export const withdrawApplicationController = async (c: Context): Promise<Response> => {
//   try {
//     const applicantId = c.get('applicantId');
//     const applicationId = parseInt(c.req.param('id'));

//     // Verify application belongs to applicant
//     const application = await prisma.jobApplication.findFirst({
//       where: {
//         id: applicationId,
//         applicant_id: applicantId,
//         status: {
//           in: ['pending', 'reviewed'] // Can only withdraw if not in final states
//         }
//       }
//     });

//     if (!application) {
//       return c.json({
//         success: false,
//         message: 'Application not found or cannot be withdrawn',
//       }, 404);
//     }

//     // Update status to withdrawn
//     await prisma.jobApplication.update({
//       where: { id: applicationId },
//       data: { status: 'withdrawn' }
//     });

//     return c.json({
//       success: true,
//       message: 'Application withdrawn successfully'
//     });
//   } catch (error) {
//     console.error('Error withdrawing application:', error);
//     return c.json({
//       success: false,
//       message: 'Failed to withdraw application',
//     }, 500);
//   }
// };