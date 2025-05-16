import { type Context } from 'hono';
import bcrypt from 'bcryptjs';
import { z } from 'zod'; // For validation
import PrismaClient from '@prisma/client';  


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

export const createUserController = async (c: Context) => {
  try {
    // 1. Get and sanitize input
    const rawData = await c.req.json();
    const sanitizedData = Object.fromEntries(
      Object.entries(rawData).map(([key, value]) => 
        [key, typeof value === 'string' ? value.trim() : value]
      )
    );

    // 2. Validate input
    const validatedData = CreateUserSchema.safeParse(sanitizedData);
    if (!validatedData.success) {
      return c.json({ 
        success: false, 
        errors: validatedData.error.flatten().fieldErrors 
      }, 400);
    }
    // 3. Check password strength (optional)
    const passwordStrength = require('zxcvbn')(validatedData.data.password);
    if (passwordStrength.score < 3) {
      return c.json({ 
        success: false, 
        error: "Password too weak",
        suggestions: passwordStrength.feedback.suggestions
      }, 400);
    }

    const prisma = PrismaClient;
    const normalizedEmail = validatedData.data.email.toLowerCase();

    // 4. Create user in transaction
    const user = await prisma.$transaction(async (tx) => {
      const hashedPassword = await bcrypt.hash(validatedData.data.password, 10);
      
      return await tx.user.create({
        data: {
          ...validatedData.data,
          email: normalizedEmail,
          password: hashedPassword
        }
      });
    });

    // 5. Create email verification token (optional)
    const verificationToken = crypto.randomBytes(32).toString('hex');
    await prisma.verificationToken.create({
      data: {
        userId: user.id,
        token: verificationToken,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
      }
    });

    // 6. Send response
    return c.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.userType
      }
    }, 201);

  } catch (error: unknown) {
    // Enhanced error handling
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        const target = error.meta?.target as string[];
        if (target.includes('email')) {
          return c.json({ 
            success: false, 
            error: "Email already in use" 
          }, 409);
        }
      }
    }

    console.error('User creation error:', error);
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

