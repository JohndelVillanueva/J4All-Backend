import bcrypt from 'bcryptjs';
import type { Context } from 'hono';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface UserPayload {
  id: string | number;
  email: string;
  userType: string;
  userId: number; // Changed to lowercase 'number'
}

export async function verifyPassword(input: string, hashed: string) {
  return bcrypt.compare(input, hashed);
}

export function generateToken(payload: object): string {
  return jwt.sign(payload, SECRET, {
    expiresIn: '7d' // Token expires in 7 days
  });
}

// ✅ FIX: Remove async - jwt.verify is synchronous
export function verifyToken(token: string): { 
  userId: number; 
  userType: string;  // ✅ Add this
  email?: string;
} {
  try {
    console.log('[AUTH] Verifying token:', token.slice(0, 10) + '...');
    
    const decoded = jwt.verify(token, SECRET) as any;
    console.log('[AUTH] Decoded token payload:', decoded);
    
    // Extract userId from different possible fields
    const userId = 
      decoded.userId || 
      decoded.id || 
      decoded.sub || 
      decoded.user_id;
    
    if (!userId) {
      console.error('[AUTH ERROR] No user ID found in token payload');
      throw new Error("No user ID in token");
    }
    
    // Convert to number
    const userIdNum = parseInt(userId.toString(), 10);
    
    if (isNaN(userIdNum)) {
      console.error('[AUTH ERROR] Invalid user ID format:', userId);
      throw new Error("Invalid user ID format");
    }

    // ✅ CRITICAL FIX: Extract userType from token
    const userType = decoded.userType || decoded.user_type;
    
    if (!userType) {
      console.error('[AUTH ERROR] No userType found in token payload');
      throw new Error("No userType in token");
    }
    
    console.log('[AUTH] Successfully verified token for user ID:', userIdNum, 'Type:', userType);
    
    // ✅ RETURN FULL PAYLOAD including userType
    return {
      userId: userIdNum,
      userType: userType, // This is now included
      email: decoded.email
    };
  } catch (error) {
    console.error('[AUTH ERROR] Token verification failed:', error);
    throw new Error("Invalid token");
  }
}

export const authMiddleware = async (c: Context, next: Function) => {
  console.log('[AUTH] Starting authentication check');
  const authHeader = c.req.header('Authorization');
  
  if (!authHeader) {
    console.error('[AUTH ERROR] No authorization header found');
    return c.json({ error: "Authorization header missing" }, 401);
  }

  if (!authHeader.startsWith('Bearer ')) {
    console.error('[AUTH ERROR] Invalid token format:', authHeader);
    return c.json({ error: "Invalid token format. Use: 'Bearer <token>'" }, 401);
  }

  const token = authHeader.split(' ')[1];
  console.log('[AUTH] Token received:', token.slice(0, 10) + '...');

  try {
    // ✅ FIX: Remove await since verifyToken is now synchronous
    const decoded = verifyToken(token);
    console.log('[AUTH] Decoded token:', decoded);
    
    const userId = decoded.userId;
    if (!userId) {
      console.error('[AUTH ERROR] Token missing user id:', decoded);
      return c.json({ error: "Invalid token payload" }, 401);
    }
    
    // ✅ FIX: Remove duplicate userId property
    // Set user data in context - merge decoded with our userId
    const user = {
      ...decoded, // This includes userId, userType, email
      id: userId, // Set id separately for compatibility
      // Remove the duplicate userId: userId line
    };
    
    console.log('[AUTH] Setting user in context:', user);
    c.set('user', user);
    await next();
  } catch (error) {
    console.error('[AUTH ERROR] Token validation failed:', error);
    return c.json({ error: "Invalid or expired token" }, 401);
  }
};