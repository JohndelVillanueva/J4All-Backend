import { Hono } from 'hono';
import {
  createJobPostingController,
  getJobPostingsController,
  getJobPostingController,
  updateJobPostingController,
  deleteJobPostingController
} from './index.js';
import { authMiddleware } from '../../utils/auth.js';

const jobPosting = new Hono()

.post('/createJob', authMiddleware, createJobPostingController)
.get('/jobs', getJobPostingsController)
.put('/jobs/:id', updateJobPostingController)
.get('/jobs/:id', getJobPostingController)
.delete('/jobs/:id', deleteJobPostingController)

export default jobPosting;