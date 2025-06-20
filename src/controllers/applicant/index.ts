// import { Context } from 'hono';
// import { PrismaClient } from '@prisma/client';
// import { applicationSchema } from '../schemas/applicant';

// const prisma = new PrismaClient();

// // Apply for a job
// export const applyForJobController = async (c: Context): Promise<Response> => {
//   try {
//     const applicantId = c.get('applicantId'); // From JWT middleware
//     const data = await c.req.json();

//     // Validate input
//     const validation = applicationSchema.safeParse({
//       ...data,
//       applicant_id: applicantId
//     });

//     if (!validation.success) {
//       return c.json({
//         success: false,
//         error: validation.error.errors,
//       }, 400);
//     }

//     // Check if job listing exists and is active
//     const jobListing = await prisma.jobListing.findFirst({
//       where: {
//         id: data.job_listing_id,
//         is_active: true,
//         expiration_date: {
//           gt: new Date() // Not expired
//         }
//       }
//     });

//     if (!jobListing) {
//       return c.json({
//         success: false,
//         message: 'Job listing not available for application',
//       }, 404);
//     }

//     // Check if already applied
//     const existingApplication = await prisma.jobApplication.findFirst({
//       where: {
//         job_listing_id: data.job_listing_id,
//         applicant_id: applicantId
//       }
//     });

//     if (existingApplication) {
//       return c.json({
//         success: false,
//         message: 'You have already applied for this position',
//       }, 400);
//     }

//     // Create application
//     const application = await prisma.jobApplication.create({
//       data: {
//         job_listing_id: data.job_listing_id,
//         applicantId: applicantId,
//         cover_letter: data.cover_letter,
//         resume_url: data.resume_url,
//         status: 'pending',
//         applied_at: new Date(),
//         ...(data.answers && {
//           answers: {
//             createMany: {
//               data: data.answers.map((answer: { question_id: number; answer: string }) => ({
//                 question_id: answer.question_id,
//                 answer: answer.answer
//               }))
//             }
//           }
//         })
//       },
//       include: {
//         applied_at: true,
//         status: true,
//         job_listing: {
//           select: {
//             job_title: true,
//             employer: true
//           }
//         }
//       }
//     });

//     return c.json({
//       success: true,
//       data: {
//         application_id: application.id,
//         job_title: application.job_listing.job_title,
//         company: application.job_listing.employer.company_name,
//         status: application.status,
//         applied_at: application.applied_at
//       }
//     }, 201);
//   } catch (error) {
//     console.error('Error applying for job:', error);
//     return c.json({
//       success: false,
//       message: 'Failed to submit application',
//     }, 500);
//   }
// };

// // Get applicant's applications
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