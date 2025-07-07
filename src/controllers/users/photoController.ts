import type { Context } from 'hono';
import { PhotoService } from '../../services/photoService.js';
import { throwError } from '../../middleware/errorHandler.js';

/**
 * Upload user profile photo
 */
export const uploadUserPhotoController = async (c: Context) => {
  try {
    const user = c.get('user') || {
      id: c.get('userId'),
      userType: c.get('userType'),
    };

    if (!user?.id) {
      return c.json(
        {
          success: false,
          message: 'Authentication required',
          code: 'UNAUTHENTICATED',
        },
        401
      );
    }

    // Get the uploaded file from the request
    const formData = await c.req.formData();
    const photoFile = formData.get('photo') as File;

    if (!photoFile) {
      return c.json(
        {
          success: false,
          message: 'Photo file is required',
          code: 'PHOTO_REQUIRED',
        },
        400
      );
    }

    // Upload the photo
    const result = await PhotoService.updateUserPhoto(
      Number(user.id),
      photoFile,
      photoFile.name
    );

    return c.json({
      success: true,
      message: 'Photo uploaded successfully',
      data: result,
    });
  } catch (error) {
    console.error('Error in uploadUserPhotoController:', error);
    throw error;
  }
};

/**
 * Delete user profile photo
 */
export const deleteUserPhotoController = async (c: Context) => {
  try {
    const user = c.get('user') || {
      id: c.get('userId'),
      userType: c.get('userType'),
    };

    if (!user?.id) {
      return c.json(
        {
          success: false,
          message: 'Authentication required',
          code: 'UNAUTHENTICATED',
        },
        401
      );
    }

    // Delete the photo
    await PhotoService.deleteUserPhoto(Number(user.id));

    return c.json({
      success: true,
      message: 'Photo deleted successfully',
    });
  } catch (error) {
    console.error('Error in deleteUserPhotoController:', error);
    throw error;
  }
};

/**
 * Get user profile photo
 */
export const getUserPhotoController = async (c: Context) => {
  try {
    const userId = c.req.param('userId');
    
    if (!userId) {
      return c.json(
        {
          success: false,
          message: 'User ID is required',
          code: 'USER_ID_REQUIRED',
        },
        400
      );
    }

    const { prisma } = await import('../../db.js');
    
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    }) as any;

    if (!user) {
      return c.json(
        {
          success: false,
          message: 'User not found',
          code: 'USER_NOT_FOUND',
        },
        404
      );
    }

    const photoUrl = PhotoService.getUserPhotoUrl(user.photo);
    const initials = `${user.first_name?.charAt(0) || ''}${user.last_name?.charAt(0) || ''}`;

    return c.json({
      success: true,
      data: {
        photo_url: photoUrl,
        has_photo: !!user.photo,
        initials: initials.toUpperCase(),
      },
    });
  } catch (error) {
    console.error('Error in getUserPhotoController:', error);
    throw error;
  }
};

/**
 * Update user profile photo (alternative endpoint for base64 uploads)
 */
export const updateUserPhotoBase64Controller = async (c: Context) => {
  try {
    const user = c.get('user') || {
      id: c.get('userId'),
      userType: c.get('userType'),
    };

    if (!user?.id) {
      return c.json(
        {
          success: false,
          message: 'Authentication required',
          code: 'UNAUTHENTICATED',
        },
        401
      );
    }

    const body = await c.req.json();
    const { photo_base64, filename = 'photo.jpg' } = body;

    if (!photo_base64) {
      return c.json(
        {
          success: false,
          message: 'Photo data is required',
          code: 'PHOTO_DATA_REQUIRED',
        },
        400
      );
    }

    // Convert base64 to buffer
    const buffer = Buffer.from(photo_base64, 'base64');

    // Upload the photo
    const result = await PhotoService.updateUserPhoto(
      Number(user.id),
      buffer,
      filename
    );

    return c.json({
      success: true,
      message: 'Photo updated successfully',
      data: result,
    });
  } catch (error) {
    console.error('Error in updateUserPhotoBase64Controller:', error);
    throw error;
  }
}; 