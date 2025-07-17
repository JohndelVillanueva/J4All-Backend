import usersRoutes from './users/routes.js';
import authRoutes from './auth/routes.js';
import jobPostingRoutes from './jobPosting/routes.js';
import skillRoutes from './skills/routes.js';
import applicationRoute from './applicant/routes.js';
import notificationRoutes from './notifications/routes.js';
import messageRoutes from './messages/routes.js';
import photoRoutes from './users/photoRoutes.js';
import interviewRoutes from './interview/routes.js';

export const routes = [usersRoutes] as const;
export const auth = [authRoutes] as const;
export const jobPosting = [jobPostingRoutes] as const;
export const skill = [skillRoutes] as const;
export const applicant = [applicationRoute] as const;
export const notifications = [notificationRoutes] as const;
export const messages = [messageRoutes] as const;
export const photos = [photoRoutes] as const;
export const interview = [interviewRoutes] as const;

export type AppRouter = (typeof routes)[number];

