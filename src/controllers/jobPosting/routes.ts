import { Hono } from 'hono';
import {
  createJobPostingController,
  getJobPostingController,
  updateJobPostingController,
  deleteJobPostingController,
  getJobListingController
} from './index.js';
import { authMiddleware } from '../../utils/auth.js';

const jobPosting = new Hono()

.post('/createJob', authMiddleware, createJobPostingController)
.get('/getJoblisting', authMiddleware, getJobListingController)
.put('/jobs/:id', updateJobPostingController)
.get('/jobs/:id', getJobPostingController)
.delete('/jobs/:id', deleteJobPostingController)

export default jobPosting;