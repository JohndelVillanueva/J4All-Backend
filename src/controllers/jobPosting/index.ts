import { type Context } from "hono";
import { PrismaClient, Prisma } from "@prisma/client";

import { z } from "zod";
import DOMPurify from "isomorphic-dompurify";

// Simple logger fallback if not using a logging library
const logger = {
  info: console.log,
  error: console.error,
};

const requiredSkillSchema = z
  .object({
    id: z.number().int().optional(),
    skill_name: z.string().min(1, "Skill name is required"),
    category: z.string().optional().default("Technical"),
    is_required: z.boolean().optional().default(true),
    importance_level: z.number().int().min(1).max(5).optional().default(1),
  })
  .strict();

const jobPostingSchema = z.object({
  job_title: z.string().min(1, "Job title is required"),
  job_description: z.string().min(1, "Job description is required"),
  job_requirements: z.string().min(1, "Job requirements are required"),
  job_location: z.string().min(1, "Job location is required"),
  job_type: z.string().min(1, "Job type is required"),
  work_mode: z
    .enum(["Onsite", "Remote", "Hybrid", "Unknown"])
    .optional()
    .default("Unknown"),
  salary_range_min: z.number().optional().nullable(),
  salary_range_max: z.number().optional().nullable(),
  expiration_date: z.string().datetime().optional().nullable(),
  required_skills: z.array(requiredSkillSchema).optional().default([]),
});

const prisma = new PrismaClient();

type AllowedStatusCodes = 400 | 401 | 403 | 404 | 409 | 422 | 500;

const STATUS_CODES = {
  BAD_REQUEST: 400 as const,
  UNAUTHORIZED: 401 as const,
  FORBIDDEN: 403 as const,
  NOT_FOUND: 404 as const,
  CONFLICT: 409 as const,
  UNPROCESSABLE_ENTITY: 422 as const,
  INTERNAL_SERVER_ERROR: 500 as const,
};

export const createJobPostingController = async (
  c: Context
): Promise<Response> => {
  // Enhanced authentication check
  const user = c.get("user") || {
    id: c.get("userId"),
    userType: c.get("userType"),
  };

  if (!user?.id) {
    return c.json(
      {
        success: false,
        message: "Authentication required",
        code: "UNAUTHENTICATED",
      },
      STATUS_CODES.UNAUTHORIZED
    );
  }

  if (user.userType !== "employer") {
    return c.json(
      {
        success: false,
        message: "Only employer accounts can create job postings",
        code: "UNAUTHORIZED",
      },
      STATUS_CODES.FORBIDDEN
    );
  }

  // --- Rate limiting ---
  const rateLimitStore: Map<string, { count: number; startTime: number }> =
    (global as any).jobPostingRateLimitStore || new Map();
  (global as any).jobPostingRateLimitStore = rateLimitStore;

  const key = `job-post:${user.id}`;
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; 
  const maxRequests = 10; 

  const rateData = rateLimitStore.get(key) || { count: 0, startTime: now };

  if (now - rateData.startTime > windowMs) {
    rateLimitStore.set(key, { count: 1, startTime: now });
  } else {
    if (rateData.count >= maxRequests) {
      return c.json(
        {
          success: false,
          message: "Rate limit exceeded. Please try again later.",
          code: "RATE_LIMIT_EXCEEDED",
        },
        429
      );
    } else {
      rateData.count += 1;
      rateLimitStore.set(key, rateData);
    }
  }

  // --- Idempotency Check ---
  // The idempotencyKey check is skipped because the field does not exist in the JobListing model.

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
      address: true,
    },
  });

  if (!employer) {
    return c.json(
      {
        success: false,
        message: "Employer profile not found",
        code: "PROFILE_INCOMPLETE",
      },
      STATUS_CODES.FORBIDDEN
    );
  }

  let inputData: unknown;
  try {
    inputData = await c.req.json();
    console.log("[DEBUG] Received payload:", inputData);

    if (inputData && typeof inputData === "object") {
      const data = inputData as Record<string, any>;
      if (data.job_description) {
        data.job_description = DOMPurify.sanitize(data.job_description);
      }
      if (data.job_requirements) {
        data.job_requirements = DOMPurify.sanitize(data.job_requirements);
      }
    }
  } catch (e) {
    return c.json(
      {
        success: false,
        message: "Invalid JSON payload",
        code: "INVALID_PAYLOAD",
      },
      STATUS_CODES.BAD_REQUEST
    );
  }

  if (inputData && typeof inputData === "object") {
    const data = inputData as Record<string, any>;
    if (
      data.work_mode &&
      !["Onsite", "Remote", "Hybrid", "Unknown"].includes(data.work_mode)
    ) {
      return c.json(
        {
          success: false,
          message: "Invalid work mode specified",
          code: "INVALID_WORK_MODE",
        },
        STATUS_CODES.BAD_REQUEST
      );
    }
  }

  const validation = jobPostingSchema.safeParse(inputData);
  if (!validation.success) {
    console.log("[DEBUG] Validation errors:", validation.error.errors);
    return c.json(
      {
        success: false,
        message: "Validation failed",
        errors: validation.error.issues.map((e) => ({
          path: e.path.join("."),
          message: e.message,
          code: e.code || "INVALID_FIELD",
        })),
        code: "VALIDATION_ERROR",
      },
      STATUS_CODES.UNPROCESSABLE_ENTITY
    );
  }

  const data = {
    ...validation.data,
    required_skills: validation.data.required_skills || [],
  };

  if (
    data.salary_range_min !== null &&
    data.salary_range_min !== undefined &&
    data.salary_range_max !== null &&
    data.salary_range_max !== undefined &&
    data.salary_range_min > data.salary_range_max
  ) {
    return c.json(
      {
        success: false,
        message: "Minimum salary cannot be greater than maximum salary",
        code: "INVALID_SALARY_RANGE",
      },
      STATUS_CODES.UNPROCESSABLE_ENTITY
    );
  }

  if (data.expiration_date && new Date(data.expiration_date) <= new Date()) {
    return c.json(
      {
        success: false,
        message: "Expiration date must be in the future",
        code: "INVALID_EXPIRATION_DATE",
      },
      STATUS_CODES.UNPROCESSABLE_ENTITY
    );
  }

  if (data.required_skills.length > 20) {
    return c.json(
      {
        success: false,
        message: "Maximum 20 skills allowed",
        code: "TOO_MANY_SKILLS",
      },
      STATUS_CODES.BAD_REQUEST
    );
  }

  // --- Content-based Duplicate Check ---
  const duplicateContentCheck = await prisma.jobListing.findFirst({
    where: {
      employer_id: employer.id,
      job_title: data.job_title,
      job_location: data.job_location,
      job_type: data.job_type,
    },
    select: { id: true }
  });

  if (duplicateContentCheck) {
    return c.json(
      {
        success: false,
        message: "A similar job posting already exists",
        code: "DUPLICATE_JOB_POSTING",
        existingJobId: duplicateContentCheck.id
      },
      STATUS_CODES.CONFLICT
    );
  }

  try {
    const result = await prisma.$transaction(
      async (prisma) => {
        console.log("[DEBUG] Starting transaction for job creation");

        const currentEmployer = await prisma.employer.findUnique({
          where: { id: employer.id },
        });

        if (!currentEmployer) {
          throw new Error("Employer account no longer exists");
        }

        let jobListing;
        try {
          console.log("[DEBUG] Creating job listing...");
          jobListing = await prisma.jobListing.create({
            data: {
              employer_id: employer.id,
              job_title: data.job_title,
              job_description: data.job_description,
              job_requirements: data.job_requirements,
              job_location: data.job_location,
              job_type: data.job_type,
              work_mode: data.work_mode || "Unknown",
              salary_range_min: data.salary_range_min,
              salary_range_max: data.salary_range_max,
              expiration_date: data.expiration_date
                ? new Date(data.expiration_date)
                : null,
              is_active: true,
              // idempotencyKey: idempotencyKey || null, // Removed because not in Prisma schema
            },
          });
          console.log("[DEBUG] Job listing created with ID:", jobListing.id);
        } catch (e) {
          throw new Error(
            `Failed to create job listing: ${
              e instanceof Error ? e.message : "Unknown error"
            }`
          );
        }

        if (data.required_skills.length) {
          console.log("[DEBUG] Processing required skills...");
          const skillErrors: string[] = [];

          await Promise.all(
            data.required_skills.map(async (skillData) => {
              try {
                if (!skillData.skill_name?.trim()) {
                  throw new Error("Skill name is required");
                }

                const cleanSkillName = DOMPurify.sanitize(skillData.skill_name);

                const skill = await prisma.skill.upsert({
                  where: { name: cleanSkillName },
                  create: {
                    name: cleanSkillName,
                    category: skillData.category || "Technical",
                  },
                  update: {},
                });

                if (!skill?.id) {
                  throw new Error("Failed to create skill");
                }

                await prisma.jobRequiredSkill.create({
                  data: {
                    job_id: jobListing.id,
                    skill_id: skill.id,
                    is_required: skillData.is_required !== false,
                    importance_level: skillData.importance_level || 1,
                  },
                });
              } catch (e) {
                skillErrors.push(
                  `Skill "${skillData.skill_name}": ${
                    e instanceof Error ? e.message : "Failed to process"
                  }`
                );
              }
            })
          );

          if (skillErrors.length > 0) {
            throw new Error(
              `Some skills failed to process: ${skillErrors.join("; ")}`
            );
          }
        }

        const jobWithSkills = await prisma.jobListing.findUnique({
          where: { id: jobListing.id },
          include: {
            required_skills: {
              include: {
                skill: {
                  select: {
                    id: true,
                    name: true,
                    category: true,
                  },
                },
              },
            },
          },
        });

        if (jobWithSkills) {
          return {
            ...jobWithSkills,
            required_skills: jobWithSkills.required_skills.map((rs) => ({
              id: rs.skill.id,
              skill_name: rs.skill.name,
              category: rs.skill.category,
              is_required: rs.is_required,
              importance_level: rs.importance_level,
            })),
          };
        }

        return null;
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        maxWait: 5000,
        timeout: 10000,
      }
    );

    if (!result) {
      return c.json(
        {
          success: false,
          message: "Job creation failed: result is null",
          code: "JOB_CREATION_NULL_RESULT",
        },
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }

    return c.json(
      {
        success: true,
        data: result,
      },
      201
    );
  } catch (error) {
    let statusCode: AllowedStatusCodes = STATUS_CODES.INTERNAL_SERVER_ERROR;
    let errorMessage = "Failed to create job posting";
    let errorCode = "JOB_CREATION_FAILED";

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const target = error.meta?.target;
        if (Array.isArray(target) ? target.includes('idempotency_key') : typeof target === 'string' && target.includes('idempotency_key')) {
          errorMessage = "Duplicate request detected";
          errorCode = "DUPLICATE_REQUEST";
        }
        statusCode = STATUS_CODES.CONFLICT;
      }
    }

    return c.json(
      {
        success: false,
        message: errorMessage,
        code: errorCode,
        details: error instanceof Error ? error.message : undefined,
      },
      statusCode
    );
  }
};

export const getJobListingController = async (
  c: Context
): Promise<Response> => {
  try {
    const user = c.get("user") || {
      id: c.get("userId"),
      userType: c.get("userType"),
    };

    if (!user?.id) {
      return c.json(
        {
          success: false,
          message: "Authentication required",
          code: "UNAUTHENTICATED",
        },
        401
      );
    }

    if (user.userType !== "employer") {
      return c.json(
        {
          success: false,
          message: "Only employer accounts can view job listings",
          code: "UNAUTHORIZED",
        },
        403
      );
    }

    const employer = await prisma.employer.findUnique({
      where: { user_id: user.id },
      select: { id: true },
    });

    if (!employer) {
      return c.json(
        {
          success: false,
          message: "Employer profile not found",
          code: "PROFILE_INCOMPLETE",
        },
        403
      );
    }

    const jobListings = await prisma.jobListing.findMany({
      where: { employer_id: employer.id },
      include: {
        required_skills: {
          include: {
            skill: true,
          },
        },
      },
      orderBy: {
        posted_date: "desc",
      },
    });

    // Format the response to match your frontend expectations
    const formattedJobs = jobListings.map((job) => ({
      id: job.id,
      job_title: job.job_title,
      job_description: job.job_description,
      job_requirements: job.job_requirements,
      job_location: job.job_location,
      job_type: job.job_type,
      work_mode: job.work_mode,
      salary_range_min: job.salary_range_min,
      salary_range_max: job.salary_range_max,
      expiration_date: job.expiration_date?.toISOString() || null,
      posted_date: job.posted_date.toISOString(),
      status: job.is_active ? "active" : "closed",
      applicants: 0, // You might want to add actual applicant count
      required_skills: job.required_skills.map((rs) => ({
        skill_name: rs.skill.name,
        is_required: rs.is_required,
        importance_level: rs.importance_level,
        category: rs.skill.category,
      })),
    }));

    return c.json({
      success: true,
      data: formattedJobs,
    });
  } catch (error) {
    console.error("Error fetching job listings:", error);
    return c.json(
      {
        success: false,
        message: "Failed to fetch job listings",
        code: "FETCH_ERROR",
      },
      500
    );
  }
};

export const getAllJobListingController = async (
  c: Context
): Promise<Response> => {
  try {
    const jobListings = await prisma.jobListing.findMany({
      where: { 
        is_active: true,
        expiration_date: {
          gte: new Date()
        }
      },
      include: {
        required_skills: {
          include: {
            skill: true,
          },
        },
        employer: {
          select: {
            id: true,
            company_name: true,
            company_description: true,
            logo_path: true,
            user_id: true
          }
        },
        _count: {
          select: {
            applications: true
          }
        }
      },
      orderBy: {
        posted_date: "desc",
      },
    });
    

    // Manual user lookup for employer
    const employerUserIds = Array.from(new Set(jobListings.map(j => j.employer?.user_id).filter(Boolean)));
    const employerUsers = await prisma.user.findMany({
      where: { id: { in: employerUserIds } },
      select: { id: true, first_name: true, last_name: true }
    });
    const employerUserMap = new Map(employerUsers.map(u => [u.id, u]));
    

    // Format the response with normalized company data
    const formattedJobs = jobListings.map((job) => {
      
      // Ensure employer data exists and is properly structured
      const companyData = job.employer ? {
        id: job.employer.id,
        name: job.employer.company_name,
        description: job.employer.company_description,
        logo: job.employer.logo_path
      } : {
        id: 0, // Fallback ID
        name: "Unknown Employer",
        description: null,
        logo: null
      };
      
      const employerUser = job.employer?.user_id ? employerUserMap.get(job.employer.user_id) : null;
      return {
        id: job.id,
        job_title: job.job_title,
        job_description: job.job_description,
        job_requirements: job.job_requirements,
        job_location: job.job_location,
        job_type: job.job_type,
        work_mode: job.work_mode,
        salary_range_min: job.salary_range_min,
        salary_range_max: job.salary_range_max,
        expiration_date: job.expiration_date?.toISOString() || null,
        posted_date: job.posted_date.toISOString(),
        status: job.is_active ? "active" : "closed",
        applicants: job._count.applications,
        employer_id: job.employer?.id || 0, // Fallback to 0 if missing
        company: companyData,
        required_skills: job.required_skills.map(skill => ({
          id: skill.id,
          is_required: skill.is_required,
          importance_level: skill.importance_level,
          skill: {
            id: skill.skill.id,
            name: skill.skill.name,
            category: skill.skill.category
          }
        })),
        hrFirstName: employerUser?.first_name || '',
        hrLastName: employerUser?.last_name || '',
        
      };
      
    })
    
    // Filter out jobs with employer_id 0 (no valid employer)
    .filter(job => Number(job.employer_id) !== 0);
    console.log('Formatted jobs sample:', formattedJobs[0]);

    // Debug log to verify data structure
    console.log('Job listings formatted:', {
      count: formattedJobs.length,
      sample: formattedJobs[0] // Log first job for verification
    });

    return c.json({
      success: true,
      data: formattedJobs,
    });
  } catch (error) {
    console.error("Error fetching job listings:", error);
    return c.json(
      {
        success: false,
        message: "Failed to fetch job listings",
        code: "FETCH_ERROR",
      },
      500
    );
  }
};

export const getJobPostingController = async (
  c: Context
): Promise<Response> => {
  try {
    const employerId = c.get("employerId");
    const id = parseInt(c.req.param("id"));

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
      return c.json(
        {
          success: false,
          message: "Job posting not found",
        },
        404
      );
    }

    return c.json({
      success: true,
      data: jobListing,
    });
  } catch (error) {
    console.error("Error fetching job posting:", error);
    return c.json(
      {
        success: false,
        message: "Failed to fetch job posting",
      },
      500
    );
  }
};

export const updateJobPostingController = async (
  c: Context
): Promise<Response> => {
  try {
    const employerId = c.get("employerId");
    const id = parseInt(c.req.param("id"));
    const data = await c.req.json();

    // Validate input
    const validation = jobPostingSchema.partial().safeParse(data);
    if (!validation.success) {
      return c.json(
        {
          success: false,
          error: validation.error.errors,
        },
        400
      );
    }

    // First verify the job listing belongs to this employer
    const existingListing = await prisma.jobListing.findFirst({
      where: {
        id,
        employer_id: employerId,
      },
    });

    if (!existingListing) {
      return c.json(
        {
          success: false,
          message: "Job posting not found",
        },
        404
      );
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
        expiration_date: data.expiration_date
          ? new Date(data.expiration_date)
          : undefined,
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
              category: skillData.category || "Technical",
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
    console.error("Error updating job posting:", error);
    return c.json(
      {
        success: false,
        message: "Failed to update job posting",
      },
      500
    );
  }
};

export const deleteJobPostingController = async (
  c: Context
): Promise<Response> => {
  try {
    const employerId = c.get("employerId");
    const id = parseInt(c.req.param("id"));

    // First verify the job listing belongs to this employer
    const existingListing = await prisma.jobListing.findFirst({
      where: {
        id,
        employer_id: employerId,
      },
    });

    if (!existingListing) {
      return c.json(
        {
          success: false,
          message: "Job posting not found",
        },
        404
      );
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
      message: "Job posting deleted",
    });
  } catch (error) {
    console.error("Error deleting job posting:", error);
    return c.json(
      {
        success: false,
        message: "Failed to delete job posting",
      },
      500
    );
  }
};
