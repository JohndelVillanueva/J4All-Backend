import { prisma } from '../db.js';
import { throwError } from '../middleware/errorHandler.js';

export class JobService {
  /**
   * Create a new job posting
   */
  static async createJob(data: any, employerId: number) {
    try {
      const job = await prisma.jobListing.create({
        data: {
          job_title: data.job_title,
          job_description: data.job_description,
          job_requirements: data.job_requirements,
          job_location: data.job_location,
          job_type: data.job_type,
          work_mode: data.work_mode,
          salary_range_min: data.salary_range_min,
          salary_range_max: data.salary_range_max,
          expiration_date: new Date(data.expiration_date),
          employer_id: employerId,
          posted_date: new Date(),
        },
        include: {
          required_skills: {
            include: {
              skill: true,
            },
          },
        },
      });

      return job;
    } catch (error) {
      console.error('Error creating job:', error);
      throw throwError('Failed to create job posting', 500, 'JOB_CREATION_FAILED');
    }
  }

  /**
   * Get all job listings with optional filtering and pagination
   */
  static async getAllJobs(params: any = {}) {
    try {
      const {
        page = 1,
        limit = 10,
        keyword,
        location,
        job_type,
        work_mode,
        min_salary,
        max_salary,
        sortBy = 'posted_date',
        sortOrder = 'desc',
      } = params;

      const skip = (page - 1) * limit;

      // Build where clause
      const where: any = {
        expiration_date: {
          gte: new Date(),
        },
      };

      if (keyword) {
        where.OR = [
          { job_title: { contains: keyword, mode: 'insensitive' } },
          { job_description: { contains: keyword, mode: 'insensitive' } },
          { job_requirements: { contains: keyword, mode: 'insensitive' } },
        ];
      }

      if (location) {
        where.job_location = { contains: location, mode: 'insensitive' };
      }

      if (job_type) {
        where.job_type = job_type;
      }

      if (work_mode) {
        where.work_mode = work_mode;
      }

      if (min_salary || max_salary) {
        where.AND = [];
        if (min_salary) {
          where.AND.push({ salary_range_max: { gte: min_salary } });
        }
        if (max_salary) {
          where.AND.push({ salary_range_min: { lte: max_salary } });
        }
      }

      // Get total count
      const total = await prisma.jobListing.count({ where });

      // Get jobs with pagination
      const jobs = await prisma.jobListing.findMany({
        where,
        include: {
          required_skills: {
            include: {
              skill: true,
            },
          },
          _count: {
            select: {
              applications: true,
            },
          },
        },
        orderBy: {
          [sortBy]: sortOrder,
        },
        skip,
        take: limit,
      });

      // Transform the response
      const transformedJobs = jobs.map((job: any) => ({
        ...job,
        applicants: job._count.applications,
      }));

      return {
        data: transformedJobs,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNext: page * limit < total,
          hasPrev: page > 1,
        },
      };
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw throwError('Failed to fetch job listings', 500, 'JOBS_FETCH_FAILED');
    }
  }

  /**
   * Get job listings for a specific employer
   */
  static async getEmployerJobs(employerId: number) {
    try {
      const jobs = await prisma.jobListing.findMany({
        where: { employer_id: employerId },
        include: {
          required_skills: {
            include: {
              skill: true,
            },
          },
          _count: {
            select: {
              applications: true,
            },
          },
        },
        orderBy: {
          posted_date: 'desc',
        },
      });

      return jobs.map((job: any) => ({
        ...job,
        applicants: job._count.applications,
      }));
    } catch (error) {
      console.error('Error fetching employer jobs:', error);
      throw throwError('Failed to fetch employer job listings', 500, 'EMPLOYER_JOBS_FETCH_FAILED');
    }
  }

  /**
   * Get a single job by ID
   */
  static async getJobById(jobId: number) {
    try {
      const job = await prisma.jobListing.findUnique({
        where: { id: jobId },
        include: {
          required_skills: {
            include: {
              skill: true,
            },
          },
          _count: {
            select: {
              applications: true,
            },
          },
        },
      });

      if (!job) {
        throw throwError('Job not found', 404, 'JOB_NOT_FOUND');
      }

      return {
        ...job,
        applicants: (job as any)._count.applications,
      };
    } catch (error) {
      if (error instanceof Error && 'statusCode' in error) {
        throw error;
      }
      console.error('Error fetching job:', error);
      throw throwError('Failed to fetch job details', 500, 'JOB_FETCH_FAILED');
    }
  }

  /**
   * Update a job posting
   */
  static async updateJob(jobId: number, data: any, employerId: number) {
    try {
      // Verify job ownership
      const existingJob = await prisma.jobListing.findFirst({
        where: { id: jobId, employer_id: employerId },
      });

      if (!existingJob) {
        throw throwError('Job not found or access denied', 404, 'JOB_NOT_FOUND');
      }

      const updateData: any = {};
      
      // Only update provided fields
      if (data.job_title) updateData.job_title = data.job_title;
      if (data.job_description) updateData.job_description = data.job_description;
      if (data.job_requirements) updateData.job_requirements = data.job_requirements;
      if (data.job_location) updateData.job_location = data.job_location;
      if (data.job_type) updateData.job_type = data.job_type;
      if (data.work_mode) updateData.work_mode = data.work_mode;
      if (data.salary_range_min) updateData.salary_range_min = data.salary_range_min;
      if (data.salary_range_max) updateData.salary_range_max = data.salary_range_max;
      if (data.expiration_date) updateData.expiration_date = new Date(data.expiration_date);

      const job = await prisma.jobListing.update({
        where: { id: jobId },
        data: updateData,
        include: {
          required_skills: {
            include: {
              skill: true,
            },
          },
        },
      });

      return job;
    } catch (error) {
      if (error instanceof Error && 'statusCode' in error) {
        throw error;
      }
      console.error('Error updating job:', error);
      throw throwError('Failed to update job posting', 500, 'JOB_UPDATE_FAILED');
    }
  }

  /**
   * Delete a job posting
   */
  static async deleteJob(jobId: number, employerId: number) {
    try {
      // Verify job ownership
      const existingJob = await prisma.jobListing.findFirst({
        where: { id: jobId, employer_id: employerId },
      });

      if (!existingJob) {
        throw throwError('Job not found or access denied', 404, 'JOB_NOT_FOUND');
      }

      await prisma.jobListing.delete({
        where: { id: jobId },
      });
    } catch (error) {
      if (error instanceof Error && 'statusCode' in error) {
        throw error;
      }
      console.error('Error deleting job:', error);
      throw throwError('Failed to delete job posting', 500, 'JOB_DELETE_FAILED');
    }
  }

  /**
   * Get job statistics for dashboard
   */
  static async getJobStats(employerId: number) {
    try {
      const [totalJobs, activeJobs, totalApplications, hiredCandidates] = await Promise.all([
        prisma.jobListing.count({ where: { employer_id: employerId } }),
        prisma.jobListing.count({ 
          where: { 
            employer_id: employerId,
            expiration_date: { gte: new Date() }
          } 
        }),
        prisma.jobApplication.count({ where: { employer_id: employerId } }),
        prisma.jobApplication.count({ 
          where: { 
            employer_id: employerId,
            status: 'hired'
          } 
        }),
      ]);

      return {
        totalJobs,
        activeJobs,
        totalApplications,
        hiredCandidates,
      };
    } catch (error) {
      console.error('Error fetching job stats:', error);
      throw throwError('Failed to fetch job statistics', 500, 'JOB_STATS_FETCH_FAILED');
    }
  }
} 