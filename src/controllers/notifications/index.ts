import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import type { Context } from 'hono';

const prisma = new PrismaClient();

// Validation schemas
const createNotificationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  message: z.string().min(1, 'Message is required'),
  type: z.enum(['info', 'success', 'warning', 'error', 'message']).default('info'),
  user_id: z.number().int().positive(),
});

// Get all notifications for a user
export const getNotificationsController = async (
  c: Context
): Promise<Response> => {
  try {
    const user = c.get("user") || {
      id: c.get("userId"),
      userType: c.get("userType"),
    };

    if (!user?.id) {
      return c.json(
        {
          success: false,
          message: "Authentication required",
          code: "UNAUTHENTICATED",
        },
        401
      );
    }

    const userNotifications = await prisma.notification.findMany({
      where: {
        user_id: user.id,
        type: {
          not: 'message' // Exclude message notifications from general notification bar
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return c.json({
      success: true,
      data: userNotifications,
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return c.json(
      {
        success: false,
        message: 'Failed to fetch notifications',
        code: 'FETCH_ERROR',
      },
      500
    );
  }
};

// Get unread notifications count
export const getUnreadNotificationCountController = async (
  c: Context
): Promise<Response> => {
  try {
    const user = c.get("user") || {
      id: c.get("userId"),
      userType: c.get("userType"),
    };

    if (!user?.id) {
      return c.json(
        {
          success: false,
          message: "Authentication required",
          code: "UNAUTHENTICATED",
        },
        401
      );
    }
    
    const unreadCount = await prisma.notification.count({
      where: {
        user_id: user.id,
        is_read: false,
        type: {
          not: 'message' // Exclude message notifications from general notification count
        },
      },
    });

    return c.json({
      success: true,
      count: unreadCount,
    });
  } catch (error) {
    console.error('Error fetching unread count:', error);
    return c.json(
      {
        success: false,
        message: 'Failed to fetch unread count',
        code: 'FETCH_ERROR',
      },
      500
    );
  }
};

// Create a new notification
export const createNotificationController = async (
  c: Context
): Promise<Response> => {
  try {
    const user = c.get("user") || {
      id: c.get("userId"),
      userType: c.get("userType"),
    };

    if (!user?.id) {
      return c.json(
        {
          success: false,
          message: "Authentication required",
          code: "UNAUTHENTICATED",
        },
        401
      );
    }

    const body = await c.req.json();
    const validatedData = createNotificationSchema.parse(body);
    
    const notification = await prisma.notification.create({
      data: validatedData,
    });

    return c.json({
      success: true,
      data: notification,
    }, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json(
        {
          success: false,
          message: 'Validation error',
          errors: error.errors,
          code: 'VALIDATION_ERROR',
        },
        400
      );
    }
    console.error('Error creating notification:', error);
    return c.json(
      {
        success: false,
        message: 'Failed to create notification',
        code: 'CREATE_ERROR',
      },
      500
    );
  }
};

// Mark notification as read
export const markNotificationAsReadController = async (
  c: Context
): Promise<Response> => {
  try {
    const user = c.get("user") || {
      id: c.get("userId"),
      userType: c.get("userType"),
    };

    if (!user?.id) {
      return c.json(
        {
          success: false,
          message: "Authentication required",
          code: "UNAUTHENTICATED",
        },
        401
      );
    }

    const notificationId = parseInt(c.req.param('id'));

    const notification = await prisma.notification.update({
      where: {
        id: notificationId,
        user_id: user.id, // Ensure user can only update their own notifications
      },
      data: {
        is_read: true,
      },
    });

    return c.json({
      success: true,
      data: notification,
    });
  } catch (error) {
    console.error('Error updating notification:', error);
    return c.json(
      {
        success: false,
        message: 'Failed to update notification',
        code: 'UPDATE_ERROR',
      },
      500
    );
  }
};

// Mark all notifications as read
export const markAllNotificationsAsReadController = async (
  c: Context
): Promise<Response> => {
  try {
    const user = c.get("user") || {
      id: c.get("userId"),
      userType: c.get("userType"),
    };

    if (!user?.id) {
      return c.json(
        {
          success: false,
          message: "Authentication required",
          code: "UNAUTHENTICATED",
        },
        401
      );
    }

    await prisma.notification.updateMany({
      where: {
        user_id: user.id,
        is_read: false,
      },
      data: {
        is_read: true,
      },
    });

    return c.json({
      success: true,
      message: 'All notifications marked as read',
    });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    return c.json(
      {
        success: false,
        message: 'Failed to mark notifications as read',
        code: 'UPDATE_ERROR',
      },
      500
    );
  }
};

// Delete a notification
export const deleteNotificationController = async (
  c: Context
): Promise<Response> => {
  try {
    const user = c.get("user") || {
      id: c.get("userId"),
      userType: c.get("userType"),
    };

    if (!user?.id) {
      return c.json(
        {
          success: false,
          message: "Authentication required",
          code: "UNAUTHENTICATED",
        },
        401
      );
    }

    const notificationId = parseInt(c.req.param('id'));

    await prisma.notification.delete({
      where: {
        id: notificationId,
        user_id: user.id, // Ensure user can only delete their own notifications
      },
    });

    return c.json({
      success: true,
      message: 'Notification deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting notification:', error);
    return c.json(
      {
        success: false,
        message: 'Failed to delete notification',
        code: 'DELETE_ERROR',
      },
      500
    );
  }
}; 