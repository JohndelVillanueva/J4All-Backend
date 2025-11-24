import { Hono } from 'hono';
import { authMiddleware } from '../../utils/auth.js';
import { getAdminStatsController, getAdminUsersListController, getAdminEmployersListController, getAdminAnalyticsController, getAdminActivitiesController } from './index.js';
import { approvePWDUserController, getPendingPWDUsersController } from '../users/index.js';
const admin = new Hono()
    .get('/stats', authMiddleware, getAdminStatsController)
    .get('/users', authMiddleware, getAdminUsersListController)
    .get('/employers', authMiddleware, getAdminEmployersListController)
    .get('/analytics', authMiddleware, getAdminAnalyticsController)
    .get('/activities', authMiddleware, getAdminActivitiesController)
    .get('/pending-pwds', authMiddleware, getPendingPWDUsersController)
    .post('/approve-pwd', authMiddleware, approvePWDUserController);
export default admin;
