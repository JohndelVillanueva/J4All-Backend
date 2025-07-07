import { Hono } from 'hono';
import { uploadUserPhotoController, deleteUserPhotoController, getUserPhotoController, updateUserPhotoBase64Controller } from './photoController.js';
import { authMiddleware } from '../../utils/auth.js';

const photoRoutes = new Hono();

// Protect upload, update, and delete routes individually
photoRoutes.post('/upload', authMiddleware, uploadUserPhotoController);
photoRoutes.post('/update', authMiddleware, updateUserPhotoBase64Controller);
photoRoutes.delete('/delete', authMiddleware, deleteUserPhotoController);

// Get user profile photo (public endpoint - no auth required)
photoRoutes.get('/:userId', getUserPhotoController);

export default photoRoutes; 