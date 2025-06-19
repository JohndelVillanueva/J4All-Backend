import { type Context } from "hono";
import { PrismaClient, Prisma } from "@prisma/client";

import { z } from 'zod';
import DOMPurify from 'isomorphic-dompurify';

// Schema for job posting validation
export const jobPostingSchema = z.object({
  job_title: z.string().min(3, "Title must be at least 3 characters"),
  job_description: z.string().min(10, "Description must be at least 10 characters"),
  job_requirements: z.string().min(10, "Requirements must be at least 10 characters"),
  job_location: z.string().min(2, "Location must be at least 2 characters"),
  job_type: z.enum(["Full-time", "Part-time", "Contract", "Internship"]),
  salary_range_min: z.number().min(0).optional(),
  salary_range_max: z.number().min(0).optional(),
  expiration_date: z.union([
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD format
  z.string().datetime().optional()          // Or full ISO string
]).optional().transform(val => val ? new Date(val).toISOString() : undefined),
  required_skills: z.array(
    z.object({
      skill_name: z.string().min(1, "Skill name is required"),
      is_required: z.boolean().default(true),
      importance_level: z.number().min(1).max(3),
      category: z.string().optional()
    })
  ).optional()
});

const prisma = new PrismaClient();

export const createJobPostingController = async (c: Context): Promise<Response> => {
  // Enhanced authentication check
  const user = c.get('user') || { id: c.get('userId'), userType: c.get('userType') };
  
  if (!user?.id) {
    return c.json({
      success: false,
      message: 'Authentication required',
      code: 'UNAUTHENTICATED'
    }, 401);
  }

  if (user.userType !== 'employer') {
    return c.json({
      success: false,
      message: 'Only employer accounts can create job postings',
      code: 'UNAUTHORIZED'
    }, 403);
  }

  // Get employerId from user - updated to match your actual schema
  const employer = await prisma.employer.findUnique({
    where: { user_id: user.id },
    select: {
      id: true,
      user_id: true,
      company_name: true,
      company_description: true,
      industry: true,
      company_size: true,
      website_url: true,
      logo_path: true,
      founded_year: true,
      contact_person: true,
      address: true
    }
  });

  if (!employer) {
    return c.json({
      success: false,
      message: 'Employer profile not found',
      code: 'PROFILE_INCOMPLETE'
    }, 403);
  }

  // Parse and validate input
  let inputData;
  try {
    inputData = await c.req.json();
    
    // Sanitize rich text fields if they exist
    if (inputData.job_description) {
      inputData.job_description = DOMPurify.sanitize(inputData.job_description);
    }
    if (inputData.job_requirements) {
      inputData.job_requirements = DOMPurify.sanitize(inputData.job_requirements);
    }
  } catch (e) {
    return c.json({
      success: false,
      message: 'Invalid JSON payload',
      code: 'INVALID_PAYLOAD'
    }, 400);
  }

  // Zod validation with detailed errors
  const validation = jobPostingSchema.safeParse(inputData);
if (!validation.success) {
  console.log('Validation errors:', validation.error.errors); // Add this line
  return c.json({
    success: false,
    message: 'Validation failed',
    errors: validation.error.errors.map(e => ({
      path: e.path.join('.'),
      message: e.message,
      code: e.code           // Add this
    })),
    code: 'VALIDATION_ERROR'
  }, 422);
}
  const data = validation.data;

  try {
    // Transaction with nested error handling
    const result = await prisma.$transaction(async (prisma) => {
      // Verify employer still exists within transaction
      const currentEmployer = await prisma.employer.findUnique({
        where: { id: employer.id }
      });

      if (!currentEmployer) {
        throw new Error('Employer account no longer exists');
      }

      // 1. JobListing creation with validation
      let jobListing;
      try {
        jobListing = await prisma.jobListing.create({
          data: {
            employer_id: employer.id,
            job_title: data.job_title,
            job_description: data.job_description,
            job_requirements: data.job_requirements,
            job_location: data.job_location,
            job_type: data.job_type,
            salary_range_min: data.salary_range_min,
            salary_range_max: data.salary_range_max,
            expiration_date: data.expiration_date ? new Date(data.expiration_date) : null,
            is_active: true,
          },
        });
      } catch (e) {
        throw new Error(`Failed to create job listing: ${e instanceof Error ? e.message : 'Unknown error'}`);
      }

      // 2. Process skills if they exist
      if (data.required_skills?.length) {
        const skillErrors: string[] = [];
        
        await Promise.all(data.required_skills.map(async (skillData) => {
          try {
            // Validate skill name
            if (!skillData.skill_name?.trim()) {
              throw new Error('Skill name is required');
            }

            // Sanitize skill name
            const cleanSkillName = DOMPurify.sanitize(skillData.skill_name);

            // Skill upsert with validation
            const skill = await prisma.skill.upsert({
              where: { name: cleanSkillName },
              create: { 
                name: cleanSkillName,
                category: skillData.category || "Technical"
              },
              update: {},
            });

            // Validate skill creation
            if (!skill?.id) {
              throw new Error('Failed to create skill');
            }

            // JobRequiredSkill creation
            await prisma.jobRequiredSkill.create({
              data: {
                job_id: jobListing.id,
                skill_id: skill.id,
                is_required: skillData.is_required !== false,
                importance_level: skillData.importance_level || 1,
              },
            });
          } catch (e) {
            skillErrors.push(`Skill "${skillData.skill_name}": ${e instanceof Error ? e.message : 'Failed to process'}`);
          }
        }));

        if (skillErrors.length > 0) {
          throw new Error(`Some skills failed to process: ${skillErrors.join('; ')}`);
        }
      }

      // Return complete job data
      return await prisma.jobListing.findUnique({
        where: { id: jobListing.id },
        include: {
          required_skills: {
            include: {
              skill: true
            }
          }
        }
      });
    });

    return c.json({
      success: true,
      data: result
    }, 201);

  } catch (error) {
    // Enhanced error classification
    let statusCode = 500; // Default to 500 if none of the checks match
    let errorMessage = 'Failed to create job posting';
    let errorCode = 'JOB_CREATION_FAILED';
    
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle known Prisma errors
      switch (error.code) {
        case 'P2002':
          statusCode = 409;
          errorMessage = 'Unique constraint violation';
          errorCode = `PRISMA_${error.code}`;
          break;
        case 'P2025':
          statusCode = 404;
          errorMessage = 'Related record not found';
          errorCode = `PRISMA_${error.code}`;
          break;
        default:
          // For other Prisma errors, keep default 500 but add more info
          errorMessage = 'Database operation failed';
          errorCode = `PRISMA_${error.code || 'UNKNOWN_ERROR'}`;
      }
    } else if (error instanceof Error) {
      if (error.message.includes('no longer exists')) {
        statusCode = 403;
        errorMessage = 'Employer account no longer exists';
        errorCode = 'INVALID_EMPLOYER_STATUS';
      }
      // Add more specific error checks if needed
    }

    console.error(`[${new Date().toISOString()}] Job Posting Error:`, error);
    
    // Ensure statusCode is always a valid HTTP status code
    const finalStatusCode = typeof statusCode === 'string' && statusCode >= 400 && statusCode < 600 
      ? statusCode 
      : 500; // Fallback to 500 if invalid

    return c.json({
      success: false,
      message: errorMessage,
      code: errorCode,
      details: error instanceof Error ? error.message : undefined,
      timestamp: new Date().toISOString()
    }, { status: finalStatusCode });
  }
};

export const getJobPostingsController = async (c: Context): Promise<Response> => {
  try {
    const employerId = c.get('employerId');

    const jobListings = await prisma.jobListing.findMany({
      where: {
        employer_id: employerId,
      },
      include: {
        required_skills: true,
        _count: {
          select: {
            applications: true // This counts the number of applications
          }
        }
      },
      orderBy: {
        posted_date: 'desc',
      },
    });

    // Transform the data to match frontend expectations
    const transformedListings = jobListings.map(job => ({
      ...job,
      status: job.is_active ? 'active' : 'closed',
      applicants: job._count.applications, // Use the count we just fetched
      // Remove the _count field since we don't need it in the frontend
      _count: undefined
    }));

    return c.json({
      success: true,
      data: transformedListings,
    });
  } catch (error) {
    console.error('Error fetching job postings:', error);
    return c.json({
      success: false,
      message: 'Failed to fetch job postings',
    }, 500);
  }
};

export const getJobPostingController = async (c: Context): Promise<Response> => {
  try {
    const employerId = c.get('employerId');
    const id = parseInt(c.req.param('id'));

    const jobListing = await prisma.jobListing.findFirst({
      where: {
        id,
        employer_id: employerId,
      },
      include: {
        required_skills: true,
      },
    });

    if (!jobListing) {
      return c.json({
        success: false,
        message: 'Job posting not found',
      }, 404);
    }

    return c.json({
      success: true,
      data: jobListing,
    });
  } catch (error) {
    console.error('Error fetching job posting:', error);
    return c.json({
      success: false,
      message: 'Failed to fetch job posting',
    }, 500);
  }
};

export const updateJobPostingController = async (c: Context): Promise<Response> => {
  try {
    const employerId = c.get('employerId');
    const id = parseInt(c.req.param('id'));
    const data = await c.req.json();

    // Validate input
    const validation = jobPostingSchema.partial().safeParse(data);
    if (!validation.success) {
      return c.json({
        success: false,
        error: validation.error.errors,
      }, 400);
    }

    // First verify the job listing belongs to this employer
    const existingListing = await prisma.jobListing.findFirst({
      where: {
        id,
        employer_id: employerId,
      },
    });

    if (!existingListing) {
      return c.json({
        success: false,
        message: 'Job posting not found',
      }, 404);
    }

    // Update the job listing
    const updatedListing = await prisma.jobListing.update({
      where: { id },
      data: {
        job_title: data.job_title,
        job_description: data.job_description,
        job_requirements: data.job_requirements,
        job_location: data.job_location,
        job_type: data.job_type,
        salary_range_min: data.salary_range_min,
        salary_range_max: data.salary_range_max,
        expiration_date: data.expiration_date ? new Date(data.expiration_date) : undefined,
      },
    });

    // Update skills if provided
    if (data.required_skills) {
      // Delete existing skills
      await prisma.jobRequiredSkill.deleteMany({
        where: {
          job_id: id,
        },
      });

      // Add new skills
      if (data.required_skills.length > 0) {
        for (const skillData of data.required_skills) {
          // Upsert skill
          const skill = await prisma.skill.upsert({
            where: { name: skillData.skill_name },
            create: { 
              name: skillData.skill_name,
              category: skillData.category || "Technical"
            },
            update: {},
          });

          await prisma.jobRequiredSkill.create({
            data: {
              job_id: id,
              skill_id: skill.id,
              is_required: skillData.is_required !== false,
              importance_level: skillData.importance_level || 1,
            },
          });
        }
      }
    }

    return c.json({
      success: true,
      data: updatedListing,
    });
  } catch (error) {
    console.error('Error updating job posting:', error);
    return c.json({
      success: false,
      message: 'Failed to update job posting',
    }, 500);
  }
};

export const deleteJobPostingController = async (c: Context): Promise<Response> => {
  try {
    const employerId = c.get('employerId');
    const id = parseInt(c.req.param('id'));

    // First verify the job listing belongs to this employer
    const existingListing = await prisma.jobListing.findFirst({
      where: {
        id,
        employer_id: employerId,
      },
    });

    if (!existingListing) {
      return c.json({
        success: false,
        message: 'Job posting not found',
      }, 404);
    }

    // Soft delete by setting is_active to false
    await prisma.jobListing.update({
      where: { id },
      data: {
        is_active: false,
      },
    });

    return c.json({
      success: true,
      message: 'Job posting deleted',
    });
  } catch (error) {
    console.error('Error deleting job posting:', error);
    return c.json({
      success: false,
      message: 'Failed to delete job posting',
    }, 500);
  }
};