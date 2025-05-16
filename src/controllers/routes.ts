import usersRoutes from './users/routes.js';

export const routes = [usersRoutes] as const;
export type AppRouter = (typeof routes)[number];

