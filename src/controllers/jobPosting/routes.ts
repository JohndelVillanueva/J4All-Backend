import { Hono } from 'hono';
import {
  createJobPostingController,
  getJobPostingController,
  updateJobPostingController,
  deleteJobPostingController,
  getJobListingController,
  getAllJobListingController,
  deactivateExpiredJobsController
} from './index.js';
import { authMiddleware } from '../../utils/auth.js';

const jobPosting = new Hono()

.post('/createJob', authMiddleware, createJobPostingController)
.get('/getJoblisting', authMiddleware, getJobListingController)
.get('/getAllJobs', authMiddleware, getAllJobListingController)
.put('/jobs/:id', updateJobPostingController)
.get('/jobs/:id', getJobPostingController)
.delete('/jobs/:id', deleteJobPostingController)
.post('/jobs/deactivate-expired', authMiddleware, deactivateExpiredJobsController)

export default jobPosting;