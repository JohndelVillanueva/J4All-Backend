import { type Context } from 'hono';
import bcrypt from 'bcryptjs';
import { z } from 'zod'; // For validation
import { PrismaClient } from '@prisma/client';  

// User creation schema
const CreateUserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  user_type: z.enum(["employer", "seeker"]).default("seeker"),
  first_name: z.string().min(2).optional(),
  last_name: z.string().min(2).optional(),
  phone_number: z.string().regex(/^\+?[0-9\s-]+$/).optional(),
});

export function getUsersController(c: Context) {
    return c.json({ message: 'Hello, world!' });
}

export const createUser = async (c: Context) => {
  try {
    const rawData = await c.req.json();
    const validatedData = CreateUserSchema.safeParse(rawData);

    if (!validatedData.success) {
      return c.json({ 
        success: false, 
        errors: validatedData.error.flatten().fieldErrors 
      }, 400);
    }

    const prisma = new PrismaClient();
    const hashedPassword = await bcrypt.hash(validatedData.data.password, 10);

    const user = await prisma.user.create({
      data: {
        ...validatedData.data,
        password: hashedPassword
      }
    });
    
    return c.json({
      success: true,
      data: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    }, 201);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "EMAIL_EXISTS") {
      return c.json({ success: false, error: "Email already in use" }, 409);
    }
    return c.json({ success: false, error: "Internal server error" }, 500);
  }
};

export function getUserController(c: Context) {
    return c.json({ message: 'Hello, world!' });
}

export function deleteUserController(c: Context) {
    return c.json({ message: 'Hello, world!' });
}

export function updateUserController(c: Context) {
    return c.json({ message: 'Hello, world!' });
}               

