import { promises as fs } from 'fs';
import path from 'path';
import { throwError } from '../middleware/errorHandler.js';
export class PhotoService {
    static UPLOAD_DIR = './public/uploads/photos';
    static MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    static ALLOWED_MIME_TYPES = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp',
    ];
    /**
     * Generate unique filename
     */
    static generateUniqueFilename(originalName) {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 15);
        const extension = this.getFileExtension(originalName);
        return `user_${timestamp}_${random}.${extension}`;
    }
    /**
     * Upload and process user profile photo
     */
    static async uploadUserPhoto(file, originalName) {
        try {
            // Ensure upload directory exists
            await this.ensureUploadDirectory();
            // Validate file
            const validation = await this.validatePhotoFile(file, originalName);
            if (!validation.isValid) {
                throw throwError(validation.errors.join(', '), 400, 'INVALID_PHOTO');
            }
            // Generate unique filename
            const filename = this.generateUniqueFilename(originalName || 'photo.jpg');
            const filePath = path.join(this.UPLOAD_DIR, filename);
            // Save file
            const buffer = file instanceof File ? Buffer.from(await file.arrayBuffer()) : file;
            console.log('[PhotoService] Saving file:', { filename, filePath, size: buffer.length });
            await fs.writeFile(filePath, buffer);
            // Get file stats
            const stats = await fs.stat(filePath);
            const photoUrl = `/uploads/photos/${filename}`;
            return {
                photo_url: photoUrl,
                filename,
                size: stats.size,
                mimetype: validation.mimetype || 'image/jpeg',
            };
        }
        catch (error) {
            console.error('Error uploading photo:', error);
            if (error instanceof Error && 'statusCode' in error) {
                throw error;
            }
            throw throwError('Failed to upload photo', 500, 'PHOTO_UPLOAD_FAILED');
        }
    }
    /**
     * Update user profile photo
     */
    static async updateUserPhoto(userId, file, originalName) {
        try {
            console.log('[PhotoService] updateUserPhoto called:', { userId, originalName, fileType: typeof file, file });
            const { prisma } = await import('../db.js');
            // Get current user photo
            const user = await prisma.user.findUnique({
                where: { id: userId },
            });
            if (!user) {
                throw throwError('User not found', 404, 'USER_NOT_FOUND');
            }
            // Upload new photo
            const uploadResult = await this.uploadUserPhoto(file, originalName);
            // Update user record
            await prisma.user.update({
                where: { id: userId },
                data: { photo: uploadResult.photo_url },
            });
            // Delete old photo if exists
            if (user.photo) {
                await this.deletePhotoFile(user.photo);
            }
            return uploadResult;
        }
        catch (error) {
            console.error('Error updating user photo:', error);
            if (error instanceof Error && 'statusCode' in error) {
                throw error;
            }
            throw throwError('Failed to update user photo', 500, 'PHOTO_UPDATE_FAILED');
        }
    }
    /**
     * Delete user profile photo
     */
    static async deleteUserPhoto(userId) {
        try {
            const { prisma } = await import('../db.js');
            // Get current user photo
            const user = await prisma.user.findUnique({
                where: { id: userId },
            });
            if (!user) {
                throw throwError('User not found', 404, 'USER_NOT_FOUND');
            }
            if (!user.photo) {
                throw throwError('No photo to delete', 400, 'NO_PHOTO_TO_DELETE');
            }
            // Delete file from storage
            await this.deletePhotoFile(user.photo);
            // Update user record
            await prisma.user.update({
                where: { id: userId },
                data: { photo: null },
            });
        }
        catch (error) {
            console.error('Error deleting user photo:', error);
            if (error instanceof Error && 'statusCode' in error) {
                throw error;
            }
            throw throwError('Failed to delete user photo', 500, 'PHOTO_DELETE_FAILED');
        }
    }
    /**
     * Validate photo file
     */
    static async validatePhotoFile(file, originalName) {
        const errors = [];
        // Check file size
        const fileSize = file instanceof File ? file.size : file.length;
        if (fileSize > this.MAX_FILE_SIZE) {
            errors.push(`File size must be less than ${this.MAX_FILE_SIZE / 1024 / 1024}MB`);
        }
        // Check file type
        let mimetype;
        if (file instanceof File) {
            mimetype = file.type;
        }
        else {
            // For Buffer, try to determine type from filename
            mimetype = this.getMimeTypeFromFilename(originalName || '');
        }
        if (!mimetype || !this.ALLOWED_MIME_TYPES.includes(mimetype)) {
            errors.push(`File type must be one of: ${this.ALLOWED_MIME_TYPES.join(', ')}`);
        }
        // Check filename extension
        if (originalName) {
            const extension = this.getFileExtension(originalName).toLowerCase();
            const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
            if (!allowedExtensions.includes(extension)) {
                errors.push(`File extension must be one of: ${allowedExtensions.join(', ')}`);
            }
        }
        return {
            isValid: errors.length === 0,
            errors,
            mimetype,
        };
    }
    /**
     * Ensure upload directory exists
     */
    static async ensureUploadDirectory() {
        try {
            await fs.access(this.UPLOAD_DIR);
        }
        catch {
            await fs.mkdir(this.UPLOAD_DIR, { recursive: true });
        }
    }
    /**
     * Get file extension from filename
     */
    static getFileExtension(filename) {
        return path.extname(filename).slice(1);
    }
    /**
     * Get MIME type from filename
     */
    static getMimeTypeFromFilename(filename) {
        const extension = this.getFileExtension(filename).toLowerCase();
        const mimeTypes = {
            jpg: 'image/jpeg',
            jpeg: 'image/jpeg',
            png: 'image/png',
            webp: 'image/webp',
        };
        return mimeTypes[extension] || '';
    }
    /**
     * Delete photo file from storage
     */
    static async deletePhotoFile(photoUrl) {
        try {
            const filename = path.basename(photoUrl);
            const filePath = path.join(this.UPLOAD_DIR, filename);
            await fs.unlink(filePath);
        }
        catch (error) {
            console.warn('Failed to delete photo file:', error);
            // Don't throw error for file deletion failures
        }
    }
    /**
     * Get user photo URL
     */
    static getUserPhotoUrl(photoPath) {
        if (!photoPath) {
            return '/default-avatar.svg'; // Default avatar image
        }
        return photoPath.startsWith('http') ? photoPath : photoPath;
    }
    /**
     * Resize and optimize photo (placeholder for future implementation)
     */
    static async optimizePhoto(buffer) {
        // TODO: Implement photo optimization using sharp or similar library
        // For now, return the original buffer
        return buffer;
    }
}
