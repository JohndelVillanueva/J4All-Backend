import { Hono } from "hono";
import { authMiddleware } from "../../utils/auth.js";
import { getNotificationsController, getUnreadNotificationCountController, createNotificationController, markNotificationAsReadController, markAllNotificationsAsReadController, deleteNotificationController, } from "./index.js";
const notifications = new Hono()
    .get('/', authMiddleware, getNotificationsController)
    .get('/unread-count', authMiddleware, getUnreadNotificationCountController)
    .post('/', authMiddleware, createNotificationController)
    .patch('/:id/read', authMiddleware, markNotificationAsReadController)
    .patch('/mark-all-read', authMiddleware, markAllNotificationsAsReadController)
    .delete('/:id', authMiddleware, deleteNotificationController);
export default notifications;
