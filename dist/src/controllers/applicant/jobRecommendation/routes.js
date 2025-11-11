import { Hono } from 'hono';
import { authMiddleware } from '../../../utils/auth.js';
import { getJobRecommendationsController, getRecommendedSkillsController, getSimilarJobsController, getRecommendationStatsController } from './index.js';
const recommendationRoutes = new Hono();
// Apply auth middleware to all recommendation routes
recommendationRoutes.use('*', authMiddleware);
// Get personalized job recommendations
recommendationRoutes.post('/jobs', getJobRecommendationsController);
// Get recommended skills to learn
recommendationRoutes.get('/skills', getRecommendedSkillsController);
// Get similar jobs based on a specific job
recommendationRoutes.post('/similar-jobs', getSimilarJobsController);
// Get recommendation statistics and insights
recommendationRoutes.get('/stats', getRecommendationStatsController);
export default recommendationRoutes;
