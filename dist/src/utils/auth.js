import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET || 'your-secret-key';
export async function verifyPassword(input, hashed) {
    return bcrypt.compare(input, hashed);
}
export function generateToken(payload) {
    return jwt.sign(payload, SECRET, {
        expiresIn: '7d' // Token expires in 7 days
    });
}
export function verifyToken(token) {
    try {
        return jwt.verify(token, SECRET);
    }
    catch (error) {
        console.error('[AUTH ERROR] Token verification failed:', error);
        throw new Error('Invalid or expired token');
    }
}
export const authMiddleware = async (c, next) => {
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
        const decoded = verifyToken(token);
        console.log('[AUTH] Decoded token:', decoded);
        // Accept both userId and id for robustness
        const userId = decoded.userId || decoded.id;
        if (!userId) {
            console.error('[AUTH ERROR] Token missing user id:', decoded);
            return c.json({ error: "Invalid token payload" }, 401);
        }
        // Convert id to number if possible
        const user = {
            ...decoded,
            id: typeof userId === 'string' ? Number(userId) : userId
        };
        if (!user.id || isNaN(user.id)) {
            console.error('[AUTH ERROR] Invalid user id in token:', user.id);
            return c.json({ error: "Invalid user id in token" }, 401);
        }
        c.set('user', user);
        await next();
    }
    catch (error) {
        console.error('[AUTH ERROR] Token validation failed:', error);
        return c.json({ error: "Invalid or expired token" }, 401);
    }
};
