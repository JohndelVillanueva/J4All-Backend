import { z } from 'zod';
import type { Context } from 'hono';
import { prisma } from '../../db.js';

// Validation schemas
const createMessageSchema = z.object({
  receiver_id: z.number().int().positive(),
  content: z.string().min(1, 'Message content is required'),
});

const createConversationSchema = z.object({
  participant2_id: z.number().int().positive(),
});

// Get all conversations for a user
export const getConversationsController = async (
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
    
    const conversations = await prisma.conversation.findMany({
      where: {
        OR: [
          { participant1_id: user.id },
          { participant2_id: user.id },
        ],
      },
      include: {
        participant1: {
          select: {
            id: true,
            username: true,
            first_name: true,
            last_name: true,
            photo: true, // Ensure photo is always selected
          },
        },
        participant2: {
          select: {
            id: true,
            username: true,
            first_name: true,
            last_name: true,
            photo: true, // Ensure photo is always selected
          },
        },
        messages: {
          orderBy: {
            created_at: 'desc',
          },
          take: 1,
        },
      },
      orderBy: {
        updated_at: 'desc',
      },
    });

    // Transform conversations to include unread count and other user info
    const transformedConversations = await Promise.all(conversations.map(async (conv: any) => {
      const otherUser = conv.participant1_id === user.id 
        ? conv.participant2 
        : conv.participant1;
      
      const lastMessage = conv.messages[0];
      
      // Get unread count for this conversation
      const unreadCount = await prisma.message.count({
        where: {
          conversation_id: conv.id,
          receiver_id: user.id,
          is_read: false,
        },
      });
      
      return {
        id: conv.id,
        other_user: otherUser,
        last_message: lastMessage,
        updated_at: conv.updated_at,
        unread_count: unreadCount,
      };
    }));

    return c.json({
      success: true,
      data: transformedConversations,
    });
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return c.json(
      {
        success: false,
        message: 'Failed to fetch conversations',
        code: 'FETCH_ERROR',
      },
      500
    );
  }
};

// Get messages for a specific conversation
export const getMessagesController = async (
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

    const conversationId = parseInt(c.req.param('conversationId'));

    // Verify user is part of this conversation
    const conversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
        OR: [
          { participant1_id: user.id },
          { participant2_id: user.id },
        ],
      },
    });

    if (!conversation) {
      return c.json(
        {
          success: false,
          message: 'Conversation not found',
          code: 'NOT_FOUND',
        },
        404
      );
    }

    const messages = await prisma.message.findMany({
      where: {
        conversation_id: conversationId,
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            first_name: true,
            last_name: true,
          },
        },
        receiver: {
          select: {
            id: true,
            username: true,
            first_name: true,
            last_name: true,
          },
        },
      },
      orderBy: {
        created_at: 'asc',
      },
    });

    // Mark messages as read
    await prisma.message.updateMany({
      where: {
        conversation_id: conversationId,
        receiver_id: user.id,
        is_read: false,
      },
      data: {
        is_read: true,
      },
    });

    // Mark message notifications as read for this conversation
    try {
      await prisma.notification.updateMany({
        where: {
          user_id: user.id,
          type: 'message',
          is_read: false,
          message: {
            contains: `conversation ${conversationId}` // This is a simple approach - we could make it more sophisticated
          }
        },
        data: {
          is_read: true,
        },
      });
      console.log('[INFO] Message notifications marked as read for conversation:', conversationId);
    } catch (notificationError) {
      console.error('[ERROR] Failed to mark message notifications as read:', notificationError);
      // Don't fail the message fetch if notification update fails
    }

    return c.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return c.json(
      {
        success: false,
        message: 'Failed to fetch messages',
        code: 'FETCH_ERROR',
      },
      500
    );
  }
};

// Create a new conversation
export const createConversationController = async (
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
    console.log('Creating conversation with data:', body);
    const validatedData = createConversationSchema.parse(body);
    console.log('Validated data:', validatedData);

    // Ensure both user IDs are numbers
    const currentUserId = Number(user.id);
    const participant2Id = Number(validatedData.participant2_id);

    console.log('User IDs - Current user:', currentUserId, 'Participant2:', participant2Id);

    // Verify both users exist in the database
    const [currentUser, participant2User] = await Promise.all([
      prisma.user.findUnique({ where: { id: currentUserId } }),
      prisma.user.findUnique({ where: { id: participant2Id } })
    ]);

    if (!currentUser) {
      console.error('Current user not found:', currentUserId);
      return c.json(
        {
          success: false,
          message: 'Current user not found',
          code: 'USER_NOT_FOUND',
        },
        404
      );
    }

    if (!participant2User) {
      console.error('Participant2 user not found:', participant2Id);
      return c.json(
        {
          success: false,
          message: 'Target user not found',
          code: 'USER_NOT_FOUND',
        },
        404
      );
    }

    // Prevent self-conversation
    if (currentUserId === participant2Id) {
      return c.json(
        {
          success: false,
          message: 'Cannot create conversation with yourself',
          code: 'INVALID_PARTICIPANTS',
        },
        400
      );
    }

    // Check if conversation already exists (check both directions)
    const existingConversation = await prisma.conversation.findFirst({
      where: {
        OR: [
          {
            participant1_id: currentUserId,
            participant2_id: participant2Id,
          },
          {
            participant1_id: participant2Id,
            participant2_id: currentUserId,
          },
        ],
      },
    });

    if (existingConversation) {
      console.log('Conversation already exists:', existingConversation.id);
      return c.json({
        success: true,
        data: existingConversation,
        message: 'Conversation already exists',
      });
    }

    console.log('Creating new conversation between users:', currentUserId, 'and', participant2Id);

    const conversation = await prisma.conversation.create({
      data: {
        participant1_id: currentUserId,
        participant2_id: participant2Id,
      },
    });

    console.log('Conversation created successfully:', conversation.id);

    return c.json({
      success: true,
      data: conversation,
    }, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
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
    
    // Log the full error for debugging
    console.error('Error creating conversation:', error);
    
    // Check for specific Prisma errors
    if (error && typeof error === 'object' && 'code' in error) {
      if (error.code === 'P2002') {
        return c.json(
          {
            success: false,
            message: 'Conversation already exists',
            code: 'DUPLICATE_CONVERSATION',
          },
          409
        );
      }
      
      if (error.code === 'P2003') {
        return c.json(
          {
            success: false,
            message: 'Invalid user ID provided',
            code: 'FOREIGN_KEY_CONSTRAINT',
          },
          400
        );
      }
    }

    return c.json(
      {
        success: false,
        message: 'Failed to create conversation',
        code: 'CREATE_ERROR',
      },
      500
    );
  }
};

// Send a new message
export const sendMessageController = async (
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

    const conversationId = parseInt(c.req.param('conversationId'));
    const body = await c.req.json();
    const validatedData = createMessageSchema.parse(body);
    
    // Verify user is part of this conversation
    const conversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
        OR: [
          { participant1_id: user.id },
          { participant2_id: user.id },
        ],
      },
    });

    if (!conversation) {
      return c.json(
        {
          success: false,
          message: 'Conversation not found or access denied',
          code: 'NOT_FOUND',
        },
        404
      );
    }

    const message = await prisma.message.create({
      data: {
        conversation_id: conversationId,
        sender_id: user.id,
        receiver_id: validatedData.receiver_id,
        content: validatedData.content,
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            first_name: true,
            last_name: true,
          },
        },
        receiver: {
          select: {
            id: true,
            username: true,
            first_name: true,
            last_name: true,
          },
        },
      },
    });

    // Send notification to receiver (stored in database but not shown in general notification bar)
    try {
      const senderName = message.sender.first_name && message.sender.last_name
        ? `${message.sender.first_name} ${message.sender.last_name}`
        : message.sender.username;
      await prisma.notification.create({
        data: {
          title: 'New Message',
          message: `${senderName} sent you a message: "${message.content.slice(0, 50)}"`,
          type: 'message', // Special type for message notifications
          user_id: message.receiver.id,
          is_read: false,
          conversation_id: conversationId,
        }
      });
      console.log('[INFO] Message notification stored in database');
    } catch (notificationError) {
      console.error('[ERROR] Failed to store message notification:', notificationError);
      // Don't fail the message if notification fails
    }

    // Update conversation's updated_at timestamp
    await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        updated_at: new Date(),
      },
    });

    return c.json({
      success: true,
      data: message,
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
    console.error('Error sending message:', error);
    return c.json(
      {
        success: false,
        message: 'Failed to send message',
        code: 'CREATE_ERROR',
      },
      500
    );
  }
};

// Get unread messages count
export const getUnreadMessageCountController = async (
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
    
    const unreadCount = await prisma.message.count({
      where: {
        conversation: {
          OR: [
            { participant1_id: user.id },
            { participant2_id: user.id },
          ],
        },
        receiver_id: user.id,
        is_read: false,
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

// Get details for a specific conversation (not messages)
export const getConversationDetailsController = async (
  c: Context
): Promise<Response> => {
  try {
    const user = c.get("user") || {
      id: c.get("userId"),
      userType: c.get("userType"),
    };
    console.log('[getConversationDetailsController] user:', user);

    if (!user?.id) {
      console.log('[getConversationDetailsController] No user id, returning 401');
      return c.json(
        {
          success: false,
          message: "Authentication required",
          code: "UNAUTHENTICATED",
        },
        401
      );
    }

    const conversationId = parseInt(c.req.param('conversationId'));
    console.log('[getConversationDetailsController] conversationId:', conversationId);

    // Find the conversation and include both participants and the latest message
    const conversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
        OR: [
          { participant1_id: user.id },
          { participant2_id: user.id },
        ],
      },
      include: {
        participant1: {
          select: {
            id: true,
            username: true,
            first_name: true,
            last_name: true,
            photo: true, // Ensure photo is selected
          },
        },
        participant2: {
          select: {
            id: true,
            username: true,
            first_name: true,
            last_name: true,
            photo: true, // Ensure photo is selected
          },
        },
        messages: {
          orderBy: {
            created_at: 'desc',
          },
          take: 1,
          include: {
            sender: {
              select: {
                id: true,
                username: true,
                first_name: true,
                last_name: true,
              },
            },
            receiver: {
              select: {
                id: true,
                username: true,
                first_name: true,
                last_name: true,
              },
            },
          },
        },
      },
    });
    console.log('[getConversationDetailsController] conversation:', conversation);

    if (!conversation) {
      console.log('[getConversationDetailsController] Conversation not found');
      return c.json(
        {
          success: false,
          message: 'Conversation not found',
          code: 'NOT_FOUND',
        },
        404
      );
    }

    const otherUser = conversation.participant1_id === user.id
      ? conversation.participant2
      : conversation.participant1;
    const lastMessage = conversation.messages[0] || null;

    // Get unread count for this conversation
    const unreadCount = await prisma.message.count({
      where: {
        conversation_id: conversation.id,
        receiver_id: user.id,
        is_read: false,
      },
    });

    const result = {
      id: conversation.id,
      other_user: otherUser,
      last_message: lastMessage,
      updated_at: conversation.updated_at,
      unread_count: unreadCount,
    };
    console.log('[getConversationDetailsController] Returning result:', result);

    return c.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('[getConversationDetailsController] Error:', error);
    return c.json(
      {
        success: false,
        message: 'Failed to fetch conversation details',
        code: 'FETCH_ERROR',
      },
      500
    );
  }
}; 