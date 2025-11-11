import usersRoutes from './users/routes.js';
import authRoutes from './auth/routes.js';
import jobPostingRoutes from './jobPosting/routes.js';
import skillRoutes from './skills/routes.js';
import applicationRoute from './applicant/routes.js';
import notificationRoutes from './notifications/routes.js';
import messageRoutes from './messages/routes.js';
import photoRoutes from './users/photoRoutes.js';
import interviewRoutes from './interview/routes.js';
import adminRoutes from './admin/routes.js';
// Import the new recommendation routes
import recommendationRoutes from './applicant/jobRecommendation/routes.js';
export const routes = [usersRoutes];
export const auth = [authRoutes];
export const jobPosting = [jobPostingRoutes];
export const skill = [skillRoutes];
export const applicant = [applicationRoute];
export const notifications = [notificationRoutes];
export const messages = [messageRoutes];
export const photos = [photoRoutes];
export const interview = [interviewRoutes];
export const admin = [adminRoutes];
// Export the new recommendation routes
export const recommendations = [recommendationRoutes];
