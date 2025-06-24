import { Hono } from 'hono';
import {
  createJobPostingController,
  getJobPostingController,
  updateJobPostingController,
  deleteJobPostingController,
  getJobListingController,
  getAllJobListingController
} from './index.js';
import { authMiddleware } from '../../utils/auth.js';

const jobPosting = new Hono()

.post('/createJob', authMiddleware, createJobPostingController)
.get('/getJoblisting', authMiddleware, getJobListingController)
.get('/getAllJobs', authMiddleware, getAllJobListingController)
.put('/jobs/:id', updateJobPostingController)
.get('/jobs/:id', getJobPostingController)
.delete('/jobs/:id', deleteJobPostingController)

export default jobPosting;