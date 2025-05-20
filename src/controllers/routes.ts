import usersRoutes from './users/routes.js';
import authRoutes from './auth/routes.js';

export const routes = [usersRoutes] as const;
export const auth = [authRoutes] as const;

export type AppRouter = (typeof routes)[number];

