import { type Context } from "hono";
import { prisma } from "../../db.js";

// GET /api/jobseeker/:userId
export const getJobSeekerByUserId = async (c: Context) => {
  const userId = Number(c.req.param('userId'));
  if (!userId) {
    return c.json({ success: false, error: 'Missing userId' }, 400);
  }
  let jobSeeker = await prisma.jobSeeker.findUnique({
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
    // Create a new jobSeeker record if not found
    const createdJobSeeker = await prisma.jobSeeker.create({ data: { user_id: userId } });
    // Add empty skills array for new job seeker
    jobSeeker = { ...createdJobSeeker, skills: [] } as typeof createdJobSeeker & { skills: any[] };
  }
  // Transform skills to match frontend expectations
  const skills = (jobSeeker.skills || []).map(seekerSkill => ({
    id: seekerSkill.skill.id,
    name: seekerSkill.skill.name,
    category: seekerSkill.skill.category,
    proficiency_level: seekerSkill.proficiency_level,
    years_of_experience: seekerSkill.years_of_experience
  }));
  return c.json({ success: true, jobSeeker: { ...jobSeeker, skills } });
};

// PUT /api/jobseeker/:userId
export const updateJobSeekerByUserId = async (c: Context) => {
  const userId = Number(c.req.param('userId'));
  if (!userId) {
    return c.json({ success: false, error: 'Missing userId' }, 400);
  }
  const body = await c.req.json();
  try {
    // Ensure the record exists before updating
    let jobSeeker = await prisma.jobSeeker.findUnique({ where: { user_id: userId } });
    if (!jobSeeker) {
      jobSeeker = await prisma.jobSeeker.create({ data: { user_id: userId } });
    }
    const updated = await prisma.jobSeeker.update({
      where: { user_id: userId },
      data: {
        resume_text: body.resume_text,
        resume_file_path: body.resume_file_path,
        education: body.education,
        experience_years: body.experience_years !== undefined && body.experience_years !== null && body.experience_years !== ''
          ? Number(body.experience_years)
          : null,
        current_job_title: body.current_job_title,
        desired_job_title: body.desired_job_title,
        desired_salary: body.desired_salary !== undefined && body.desired_salary !== null && body.desired_salary !== ''
          ? Number(body.desired_salary)
          : null,
        location_preference: body.location_preference,
        disability: body.disability,
        pwd_number: body.pwd_number, // Added PWD number support
      },
    });

    // --- SKILLS LOGIC ---
    if (Array.isArray(body.skills)) {
      // Remove all existing skills for this job seeker
      await prisma.jobSeekerSkill.deleteMany({ where: { seeker_id: jobSeeker.id } });
      for (const skill of body.skills) {
        // Upsert the skill in the skills table
        const dbSkill = await prisma.skill.upsert({
          where: { name: skill.name },
          create: { name: skill.name, category: skill.category || null },
          update: {},
        });
        // Add the skill to the job_seeker_skills table
        await prisma.jobSeekerSkill.create({
          data: {
            seeker_id: jobSeeker.id,
            skill_id: dbSkill.id,
            proficiency_level: skill.proficiency_level || 1,
            years_of_experience: skill.years_of_experience || 0,
          },
        });
      }
    }
    return c.json({ success: true, jobSeeker: updated });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return c.json({ success: false, error: 'JobSeeker not found for this user' }, 404);
    }
    console.error('Update job seeker error:', error);
    return c.json({ success: false, error: 'Failed to update job seeker' }, 500);
  }
};