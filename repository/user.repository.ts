// user.repository.ts
import { prisma } from '../src/db.js';
import bcrypt from 'bcryptjs';

export const UserRepository = {
  async create(userData: {
    username: string;
    email: string;
    password: string;
    user_type?: string;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
  }) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return prisma.user.create({
      data: {
        ...userData,
        password_hash: hashedPassword,
        last_login: new Date(),
      },
      select: { id: true, username: true, email: true, user_type: true }
    });
  },

  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }
};