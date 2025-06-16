import bcrypt from 'bcryptjs';
import type { Context } from 'hono';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'your-secret-key';


interface UserPayload {
  id: string | number;
  email: string;
  userType: string;
}


export async function verifyPassword(input: string, hashed: string) {
  return bcrypt.compare(input, hashed);
}

export function generateToken(payload: object): string {
  return jwt.sign(payload, SECRET, {
    expiresIn: '7d' // Token expires in 7 days
  });
}

// Verify token
export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

// Middleware to protect routes
export const authMiddleware = async (c: Context, next: Function) => {
  const authHeader = c.req.header('Authorization');
  
  // 1. Check if header exists
  if (!authHeader) {
    return c.json({ error: "Authorization header missing" }, 401);
  }

  // 2. Check Bearer format
  if (!authHeader.startsWith('Bearer ')) {
    return c.json({ error: "Invalid token format. Use: 'Bearer <token>'" }, 401);
  }

  const token = authHeader.split(' ')[1];

  // 3. Verify token
  try {
    const decoded = jwt.verify(token, SECRET);
    c.set('user', decoded); // Store decoded token in context
    await next();
  } catch (error) {
    return c.json({ error: "Invalid or expired token" }, 401);
  }
};
