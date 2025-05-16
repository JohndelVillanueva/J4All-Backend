import { type Context } from 'hono';
import { db } from '../db'; // Your Prisma client
import bcrypt from 'bcryptjs';
import { z } from 'zod'; // For validation



// User creation schema
const CreateUserSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  phone_number: z.string().optional(),
  user_type: z.string().default('user'),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
});

export function getUsersController(c: Context) {
    return c.json({ message: 'Hello, world!' });
}

export const createUser = async (c: Context) => {
  try {
    // 1. Validate Input
    const rawData = await c.req.json();
    const validatedData = CreateUserSchema.safeParse(rawData);

    if (!validatedData.success) {
      return c.json({
        success: false,
        errors: validatedData.error.flatten().fieldErrors
      }, 400);
    }

    // 2. Check for existing user
    const existingUser = await db.user.findUnique({
      where: { email: validatedData.data.email }
    });

    if (existingUser) {
      return c.json({
        success: false,
        error: "Email already in use"
      }, 409);
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(validatedData.data.password, 10);

    // 4. Create user
    const newUser = await db.user.create({
      data: {
        ...validatedData.data,
        password_hash: hashedPassword,
        created_at: new Date(),
        last_log: new Date()
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        user_type: true,
        created_at: true
      }
    });

    // 5. Return success response
    return c.json({
      success: true,
      data: newUser,
      message: "User created successfully"
    }, 201);

  } catch (error) {
    console.error("User creation error:", error);
    
    // Handle unexpected errors
    return c.json({
      success: false,
      error: "Internal server error"
    }, 500);
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

