import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET = 'your_jwt_secret'; // Store this securely


interface UserPayload {
  id: string | number;
  email: string;
  userType: string;
}

export function generateToken(user: UserPayload) {
  return jwt.sign({ id: user.id, email: user.email, userType: user.userType }, SECRET, {
    expiresIn: '7d',
  });
}

export async function verifyPassword(input: string, hashed: string) {
  return bcrypt.compare(input, hashed);
}
