import { Hono } from 'hono';
import { scheduleInterviewController } from './index.js';
const interview = new Hono()
    // POST /api/interview/schedule
    .post('/schedule', scheduleInterviewController);
export default interview;
