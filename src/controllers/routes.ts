import usersRoutes from './users/routes.js';
import authRoutes from './auth/routes.js';
import jobPostingRoutes from './jobPosting/routes.js';
import skillRoutes from './skills/routes.js';



export const routes = [usersRoutes] as const;
export const auth = [authRoutes] as const;
export const jobPosting = [jobPostingRoutes] as const;
export const skill = [skillRoutes] as const;

export type AppRouter = (typeof routes)[number];

