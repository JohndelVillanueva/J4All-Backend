import { Hono } from "hono";
import { authMiddleware } from "../../utils/auth.js";
import {
  getConversationsController,
  getMessagesController,
  createConversationController,
  sendMessageController,
  getUnreadMessageCountController,
  getConversationDetailsController,
} from "./index.js";

const messages = new Hono()
  .get('/conversations', authMiddleware, getConversationsController)
  .get('/conversations/:conversationId/info', authMiddleware, getConversationDetailsController)
  .get('/conversations/:conversationId', authMiddleware, getMessagesController)
  .post('/conversations', authMiddleware, createConversationController)
  .post('/conversations/:conversationId/messages', authMiddleware, sendMessageController)
  .get('/unread-count', authMiddleware, getUnreadMessageCountController);

export default messages; 