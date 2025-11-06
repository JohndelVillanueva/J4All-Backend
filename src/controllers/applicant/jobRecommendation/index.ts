import { type Context } from "hono";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface RecommendationParams {
  userId: number;
  limit?: number;
  matchThreshold?: number;
}

interface JobMatchScore {
  job: any;
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  skillMatchPercentage: number;
  locationMatch: boolean;
  salaryMatch: boolean;
  experienceMatch: boolean;
}

export const getJobRecommendationsController = async (
  c: Context
): Promise<Response> => {
  try {
    console.log("🔍 [CONTROLLER START] getJobRecommendationsController called");
    const user = c.get("user");
    console.log("👤 User from context:", user);
    
    if (!user?.id) {
      console.log("❌ [AUTH ERROR] No user ID found in context");
      return c.json(
        {
          success: false,
          message: "Authentication required",
          code: "UNAUTHENTICATED",
        },
        401
      );
    }

    console.log("📥 Parsing request body...");
    const { limit = 10, matchThreshold = 50 } = await c.req.json();
    console.log(`⚙️ Request params - limit: ${limit}, threshold: ${matchThreshold}`);
    
    console.log(`🚀 Calling generateJobRecommendations for user ${user.id}...`);
    const recommendations = await generateJobRecommendations({
      userId: user.id,
      limit,
      matchThreshold
    });

    console.log(`✅ [SUCCESS] Generated ${recommendations.length} recommendations`);
    console.log("📊 Recommendations sample:", recommendations.slice(0, 2));

    return c.json({
      success: true,
      data: recommendations,
      count: recommendations.length
    });

  } catch (error) {
    console.error("❌ [CONTROLLER ERROR] Recommendation error:", error);
    return c.json(
      {
        success: false,
        message: "Failed to generate recommendations",
        code: "RECOMMENDATION_ERROR",
      },
      500
    );
  }
};

export const generateJobRecommendations = async ({
  userId,
  limit = 10,
  matchThreshold = 50
}: RecommendationParams): Promise<JobMatchScore[]> => {
  try {
    console.log(`🔧 [GENERATE START] generateJobRecommendations for user ${userId}`);
    
    // 1. Get user profile and job seeker profile separately
    console.log(`👤 Fetching user profile for ID: ${userId}...`);
    const userProfile = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!userProfile) {
      console.log(`❌ User profile not found for ID: ${userId}`);
      throw new Error("User profile not found");
    }
    console.log("✅ User profile found:", { id: userProfile.id, email: userProfile.email });

    // 2. Get job seeker profile using user_id
    console.log(`📋 Fetching job seeker profile for user_id: ${userId}...`);
    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { user_id: userId },
      include: {
        skills: {
          include: {
            skill: true
          }
        }
      }
    });

    if (!jobSeeker) {
      console.log(`❌ No job seeker profile found for user: ${userId}`);
      return [];
    }
    console.log(`✅ Job seeker profile found with ${jobSeeker.skills.length} skills`);

    // 3. Get user's skills from job seeker profile
    const userSkills = jobSeeker.skills.map(js => ({
      id: js.skill.id,
      name: js.skill.name,
      proficiency: js.proficiency_level || 1,
      experience: js.years_of_experience || 0
    }));
    console.log(`🛠️ User skills:`, userSkills.map(s => s.name));

    // 4. Get active job listings with required skills
    console.log("📋 Fetching active job listings...");
    const activeJobs = await prisma.jobListing.findMany({
      where: {
        is_active: true,
        expiration_date: {
          gte: new Date()
        }
      },
      include: {
        employer: {
          include: {
            user: {
              select: {
                first_name: true,
                last_name: true,
                photo: true
              }
            }
          }
        },
        required_skills: {
          include: {
            skill: true
          }
        },
        _count: {
          select: {
            applications: true
          }
        }
      },
      orderBy: {
        posted_date: "desc"
      }
    });

    console.log(`📊 Found ${activeJobs.length} active jobs`);
    console.log("📝 Job titles:", activeJobs.map(j => j.job_title));

    // 5. Calculate match scores for each job
    console.log("🎯 Calculating match scores...");
    const jobMatches: JobMatchScore[] = activeJobs.map(job => {
      const match = calculateJobMatch(job, jobSeeker, userSkills);
      console.log(`📈 Job "${job.job_title}" score: ${match.score}`);
      return match;
    });

    // 6. Filter and sort by match score
    console.log(`🔍 Filtering jobs with threshold ${matchThreshold}...`);
    const filteredMatches = jobMatches
      .filter(match => match.score >= matchThreshold)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    console.log(`✅ Final filtered matches: ${filteredMatches.length} jobs`);
    console.log("🏆 Top matches:", filteredMatches.map(m => ({
      job: m.job.job_title,
      score: m.score,
      skills: m.matchedSkills.length
    })));

    return filteredMatches;

  } catch (error) {
    console.error("❌ [GENERATE ERROR] Error generating recommendations:", error);
    return [];
  }
};

const calculateJobMatch = (
  job: any,
  jobSeeker: any,
  userSkills: any[]
): JobMatchScore => {
  console.log(`🎯 Calculating match for job: "${job.job_title}"`);
  
  let score = 0;
  const weightSkills = 0.6;
  const weightLocation = 0.2;
  const weightSalary = 0.15;
  const weightExperience = 0.05;

  // 1. Skill matching
  const jobSkills = job.required_skills.map((rs: any) => ({
    id: rs.skill.id,
    name: rs.skill.name,
    importance: rs.importance_level || 1,
    isRequired: rs.is_required
  }));

  console.log(`🛠️ Job requires ${jobSkills.length} skills:`, jobSkills.map(s => s.name));

  const { matchedSkills, missingSkills, skillMatchPercentage } = calculateSkillMatch(
    userSkills,
    jobSkills
  );

  console.log(`📊 Skill match: ${matchedSkills.length} matched, ${missingSkills.length} missing, ${skillMatchPercentage.toFixed(1)}%`);

  score += skillMatchPercentage * weightSkills;

  // 2. Location matching
  const locationMatch = checkLocationMatch(job.job_location, jobSeeker.location_preference);
  console.log(`📍 Location match: ${locationMatch} (job: ${job.job_location}, user: ${jobSeeker.location_preference})`);
  if (locationMatch) {
    score += 100 * weightLocation;
  }

  // 3. Salary matching
  const salaryMatch = checkSalaryMatch(
    job.salary_range_min,
    job.salary_range_max,
    jobSeeker.desired_salary
  );
  console.log(`💰 Salary match: ${salaryMatch} (job: ${job.salary_range_min}-${job.salary_range_max}, user: ${jobSeeker.desired_salary})`);
  if (salaryMatch) {
    score += 100 * weightSalary;
  }

  // 4. Experience matching
  const experienceMatch = checkExperienceMatch(
    jobSeeker.experience_years,
    job.job_requirements
  );
  console.log(`📅 Experience match: ${experienceMatch} (user: ${jobSeeker.experience_years}, job reqs: ${job.job_requirements?.substring(0, 50)}...)`);
  if (experienceMatch) {
    score += 100 * weightExperience;
  }

  // 5. Boost score for recent jobs
  const daysSincePosted = Math.floor(
    (new Date().getTime() - new Date(job.posted_date).getTime()) / (1000 * 60 * 60 * 24)
  );
  if (daysSincePosted <= 7) {
    console.log(`🚀 Recent job boost: +10 points (${daysSincePosted} days old)`);
    score += 10; // Boost for jobs posted in last 7 days
  }

  const finalScore = Math.min(Math.round(score), 100);
  console.log(`🎯 Final score for "${job.job_title}": ${finalScore}`);

  return {
    job: {
      ...job,
      company: job.employer ? {
        id: job.employer.id,
        name: job.employer.company_name,
        description: job.employer.company_description,
        logo: job.employer.logo_path
      } : null,
      hrFirstName: job.employer?.user?.first_name || '',
      hrLastName: job.employer?.user?.last_name || '',
      hrPhoto: job.employer?.user?.photo || null,
      applicants: job._count.applications,
      required_skills: job.required_skills.map((rs: any) => ({
        id: rs.skill.id,
        skill_name: rs.skill.name,
        category: rs.skill.category,
        is_required: rs.is_required,
        importance_level: rs.importance_level
      }))
    },
    score: finalScore,
    matchedSkills,
    missingSkills,
    skillMatchPercentage,
    locationMatch,
    salaryMatch,
    experienceMatch
  };
};

// const calculateJobMatch = (
//   job: any,
//   jobSeeker: any,
//   userSkills: any[]
// ): JobMatchScore => {
//   let score = 0;
//   const weightSkills = 0.6;
//   const weightLocation = 0.2;
//   const weightSalary = 0.15;
//   const weightExperience = 0.05;

//   // 1. Skill matching
//   const jobSkills = job.required_skills.map((rs: any) => ({
//     id: rs.skill.id,
//     name: rs.skill.name,
//     importance: rs.importance_level || 1,
//     isRequired: rs.is_required
//   }));

//   const { matchedSkills, missingSkills, skillMatchPercentage } = calculateSkillMatch(
//     userSkills,
//     jobSkills
//   );

//   score += skillMatchPercentage * weightSkills;

//   // 2. Location matching
//   const locationMatch = checkLocationMatch(job.job_location, jobSeeker.location_preference);
//   if (locationMatch) {
//     score += 100 * weightLocation;
//   }

//   // 3. Salary matching
//   const salaryMatch = checkSalaryMatch(
//     job.salary_range_min,
//     job.salary_range_max,
//     jobSeeker.desired_salary
//   );
//   if (salaryMatch) {
//     score += 100 * weightSalary;
//   }

//   // 4. Experience matching
//   const experienceMatch = checkExperienceMatch(
//     jobSeeker.experience_years,
//     job.job_requirements
//   );
//   if (experienceMatch) {
//     score += 100 * weightExperience;
//   }

//   // 5. Boost score for recent jobs
//   const daysSincePosted = Math.floor(
//     (new Date().getTime() - new Date(job.posted_date).getTime()) / (1000 * 60 * 60 * 24)
//   );
//   if (daysSincePosted <= 7) {
//     score += 10; // Boost for jobs posted in last 7 days
//   }

//   return {
//     job: {
//       ...job,
//       company: job.employer ? {
//         id: job.employer.id,
//         name: job.employer.company_name,
//         description: job.employer.company_description,
//         logo: job.employer.logo_path
//       } : null,
//       hrFirstName: job.employer?.user?.first_name || '',
//       hrLastName: job.employer?.user?.last_name || '',
//       hrPhoto: job.employer?.user?.photo || null,
//       applicants: job._count.applications,
//       required_skills: job.required_skills.map((rs: any) => ({
//         id: rs.skill.id,
//         skill_name: rs.skill.name,
//         category: rs.skill.category,
//         is_required: rs.is_required,
//         importance_level: rs.importance_level
//       }))
//     },
//     score: Math.min(Math.round(score), 100),
//     matchedSkills,
//     missingSkills,
//     skillMatchPercentage,
//     locationMatch,
//     salaryMatch,
//     experienceMatch
//   };
// };

const calculateSkillMatch = (userSkills: any[], jobSkills: any[]) => {
  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];
  
  let totalImportance = 0;
  let matchedImportance = 0;

  jobSkills.forEach(jobSkill => {
    totalImportance += jobSkill.importance;
    
    const userSkill = userSkills.find(us => 
      us.name.toLowerCase() === jobSkill.name.toLowerCase()
    );

    if (userSkill) {
      matchedSkills.push(jobSkill.name);
      matchedImportance += jobSkill.importance;
      
      // Boost match for higher proficiency
      if (userSkill.proficiency >= 4) {
        matchedImportance += jobSkill.importance * 0.2;
      }
    } else if (jobSkill.isRequired) {
      missingSkills.push(jobSkill.name);
    }
  });

  const skillMatchPercentage = totalImportance > 0 
    ? (matchedImportance / totalImportance) * 100 
    : 0;

  return { matchedSkills, missingSkills, skillMatchPercentage };
};

const checkLocationMatch = (jobLocation: string, userPreference: string): boolean => {
  if (!jobLocation || !userPreference) return true;
  
  const jobLoc = jobLocation.toLowerCase();
  const userLoc = userPreference.toLowerCase();
  
  // Simple location matching - can be enhanced with geolocation
  return jobLoc.includes(userLoc) || userLoc.includes(jobLoc);
};

const checkSalaryMatch = (
  minSalary: number,
  maxSalary: number,
  desiredSalary: number
): boolean => {
  if (!desiredSalary) return true;
  if (!minSalary && !maxSalary) return true;
  
  const jobAvg = minSalary && maxSalary ? (minSalary + maxSalary) / 2 : minSalary || maxSalary;
  
  // Consider it a match if job salary is within 20% of desired salary
  return jobAvg >= desiredSalary * 0.8;
};

const checkExperienceMatch = (userExperience: number, jobRequirements: string): boolean => {
  if (!userExperience || !jobRequirements) return true;
  
  // Simple keyword matching for experience requirements
  const requirements = jobRequirements.toLowerCase();
  
  if (requirements.includes("senior") && userExperience < 5) return false;
  if (requirements.includes("mid-level") && userExperience < 2) return false;
  if (requirements.includes("entry level") && userExperience > 3) return false;
  
  return true;
};

export const getRecommendedSkillsController = async (
  c: Context
): Promise<Response> => {
  try {
    const user = c.get("user");
    
    if (!user?.id) {
      return c.json(
        {
          success: false,
          message: "Authentication required",
        },
        401
      );
    }

    // Get popular skills from high-demand jobs
    const popularSkills = await prisma.skill.findMany({
      include: {
        job_required_skills: {
          include: {
            job_listing: {
              where: {
                is_active: true,
                expiration_date: {
                  gte: new Date()
                }
              }
            }
          }
        }
      },
      orderBy: {
        job_required_skills: {
          _count: 'desc'
        }
      },
      take: 10
    });

    const recommendedSkills = popularSkills.map(skill => ({
      id: skill.id,
      name: skill.name,
      category: skill.category,
      demand: skill.job_required_skills.length,
      jobsCount: skill.job_required_skills.filter(jrs => jrs.job_listing).length
    }));

    return c.json({
      success: true,
      data: recommendedSkills
    });

  } catch (error) {
    console.error("Recommended skills error:", error);
    return c.json(
      {
        success: false,
        message: "Failed to get recommended skills",
      },
      500
    );
  }
};

export const getSimilarJobsController = async (
  c: Context
): Promise<Response> => {
  try {
    const { jobId } = await c.req.json();
    
    if (!jobId) {
      return c.json(
        {
          success: false,
          message: "Job ID is required",
        },
        400
      );
    }

    const targetJob = await prisma.jobListing.findUnique({
      where: { id: parseInt(jobId) },
      include: {
        required_skills: {
          include: {
            skill: true
          }
        }
      }
    });

    if (!targetJob) {
      return c.json(
        {
          success: false,
          message: "Job not found",
        },
        404
      );
    }

    const targetSkills = targetJob.required_skills.map(rs => rs.skill.name);

    // Find jobs with similar skills
    const similarJobs = await prisma.jobListing.findMany({
      where: {
        is_active: true,
        expiration_date: {
          gte: new Date()
        },
        id: {
          not: parseInt(jobId)
        },
        OR: [
          {
            job_title: {
              contains: targetJob.job_title.split(' ')[0],
              mode: 'insensitive'
            }
          },
          {
            required_skills: {
              some: {
                skill: {
                  name: {
                    in: targetSkills
                  }
                }
              }
            }
          }
        ]
      },
      include: {
        employer: {
          include: {
            user: {
              select: {
                first_name: true,
                last_name: true,
                photo: true
              }
            }
          }
        },
        required_skills: {
          include: {
            skill: true
          }
        },
        _count: {
          select: {
            applications: true
          }
        }
      },
      take: 5
    });

    const formattedJobs = similarJobs.map(job => ({
      id: job.id,
      job_title: job.job_title,
      job_description: job.job_description,
      job_location: job.job_location,
      job_type: job.job_type,
      work_mode: job.work_mode,
      salary_range_min: job.salary_range_min,
      salary_range_max: job.salary_range_max,
      posted_date: job.posted_date,
      company: job.employer ? {
        id: job.employer.id,
        name: job.employer.company_name,
        logo: job.employer.logo_path
      } : null,
      applicants: job._count.applications,
      required_skills: job.required_skills.map(rs => ({
        id: rs.skill.id,
        skill_name: rs.skill.name,
        category: rs.skill.category
      })),
      similarity: calculateJobSimilarity(targetJob, job)
    }));

    return c.json({
      success: true,
      data: formattedJobs
    });

  } catch (error) {
    console.error("Similar jobs error:", error);
    return c.json(
      {
        success: false,
        message: "Failed to get similar jobs",
      },
      500
    );
  }
};

const calculateJobSimilarity = (job1: any, job2: any): number => {
  const skills1 = new Set(job1.required_skills.map((rs: any) => rs.skill.name));
  const skills2 = new Set(job2.required_skills.map((rs: any) => rs.skill.name));
  
  const intersection = new Set([...skills1].filter(skill => skills2.has(skill)));
  const union = new Set([...skills1, ...skills2]);
  
  return union.size > 0 ? (intersection.size / union.size) * 100 : 0;
};

export const getRecommendationStatsController = async (
  c: Context
): Promise<Response> => {
  try {
    const user = c.get("user");
    
    if (!user?.id) {
      return c.json(
        {
          success: false,
          message: "Authentication required",
        },
        401
      );
    }

    // Get user's job seeker profile
    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { user_id: user.id },
      include: {
        skills: {
          include: {
            skill: true
          }
        }
      }
    });

    if (!jobSeeker) {
      return c.json({
        success: true,
        data: {
          profileCompletion: 0,
          skillCount: 0,
          recommendedSkills: [],
          insights: ["Complete your profile to get personalized recommendations"]
        }
      });
    }

    // Calculate profile completion
    const profileFields = [
      jobSeeker.desired_job_title,
      jobSeeker.desired_salary,
      jobSeeker.location_preference,
      jobSeeker.experience_years,
      jobSeeker.resume_text || jobSeeker.resume_file_path
    ];
    
    const completedFields = profileFields.filter(field => field !== null && field !== undefined && field !== '').length;
    const profileCompletion = Math.round((completedFields / profileFields.length) * 100);

    // Get skill insights
    const userSkillNames = jobSeeker.skills.map(js => js.skill.name);
    
    // Find high-demand skills user doesn't have
    const highDemandSkills = await prisma.skill.findMany({
      include: {
        job_required_skills: {
          include: {
            job_listing: {
              where: {
                is_active: true,
                expiration_date: {
                  gte: new Date()
                }
              }
            }
          }
        }
      },
      where: {
        name: {
          notIn: userSkillNames
        }
      },
      orderBy: {
        job_required_skills: {
          _count: 'desc'
        }
      },
      take: 5
    });

    const recommendedSkills = highDemandSkills.map(skill => ({
      id: skill.id,
      name: skill.name,
      category: skill.category,
      demand: skill.job_required_skills.length,
      reason: "High demand in current job market"
    }));

    // Generate insights
    const insights: string[] = [];
    
    if (jobSeeker.skills.length < 3) {
      insights.push("Add more skills to your profile to get better job matches");
    }
    
    if (!jobSeeker.desired_job_title) {
      insights.push("Set your desired job title for more targeted recommendations");
    }
    
    if (profileCompletion < 70) {
      insights.push("Complete your profile to improve recommendation accuracy");
    }

    return c.json({
      success: true,
      data: {
        profileCompletion,
        skillCount: jobSeeker.skills.length,
        recommendedSkills,
        insights: insights.length > 0 ? insights : ["Your profile is well-optimized for job matching"]
      }
    });

  } catch (error) {
    console.error("Recommendation stats error:", error);
    return c.json(
      {
        success: false,
        message: "Failed to get recommendation stats",
      },
      500
    );
  }
};