import { type Context } from "hono";
import bcrypt from "bcryptjs";
import { z } from "zod"; // For validation
import { PrismaClient, Prisma } from "@prisma/client";
import { checkRateLimit } from "../../utils/rate-limit.js";
import { generateToken, verifyPassword } from "../../utils/auth.js"; // Assuming you have an auth utility for token generation
import crypto from "crypto";

// User creation schema
const CreateUserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
  user_type: z
    .enum(["general", "pwd", "indigenous", "employer"])
    .default("general"),
  first_name: z.string().min(2).optional(),
  last_name: z.string().min(2).optional(),
  phone_number: z
    .string()
    .regex(/^\+?[0-9\s-]+$/)
    .optional(),
});

// type CreateUserInput = z.infer<typeof CreateUserSchema>;

export const userLoginController: (c: Context) => Promise<Response> = async (c: Context) => {
  const prisma = new PrismaClient();

  try {
    const { email, password, userType } = await c.req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.user_type !== userType) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    // ✅ Type-safe token generation
    const token = generateToken({
      id: user.id,
      email: user.email,
      userType: user.user_type,
    });

    return c.json({
      success: true, // Add this
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        user_type: user.user_type,
        first_name: user.first_name,
        last_name: user.last_name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return c.json({ error: "Internal server error" }, 500);
  } finally {
    await prisma.$disconnect();
  }
}

export const createUserController = async (c: Context) => {
  const prisma = new PrismaClient();
  try {
    // 1. Get and sanitize input
    let rawData;
    try {
      rawData = await c.req.json();
      console.log("Received data:", JSON.stringify(rawData, null, 2));
    } catch (e) {
      console.error("Failed to parse request body:", e);
      return c.json(
        {
          success: false,
          error: "Invalid request body",
        },
        400
      );
    }

    const sanitizedData = Object.fromEntries(
      Object.entries(rawData).map(([key, value]) => [
        key,
        typeof value === "string" ? value.trim() : value,
      ])
    );

    // 2. Validate input
    const validatedData = CreateUserSchema.safeParse(sanitizedData);
    if (!validatedData.success) {
      const errors = validatedData.error.flatten().fieldErrors;
      console.log("Validation errors:", JSON.stringify(errors, null, 2));
      return c.json(
        {
          success: false,
          errors: errors,
        },
        400
      );
    }

    const userData = validatedData.data;

    // 3. Check password strength
    try {
      const passwordStrength = require("zxcvbn")(userData.password);
      if (passwordStrength.score < 3) {
        return c.json(
          {
            success: false,
            error: "Password too weak",
            suggestions: passwordStrength.feedback.suggestions,
          },
          400
        );
      }
    } catch (e) {
      console.error("Password strength check failed:", e);
      // Continue without password strength check if zxcvbn fails
    }

    const normalizedEmail = userData.email.toLowerCase();

    // 4. Add rate limit check
    const rateLimit = await checkRateLimit(
      c.req.header("x-forwarded-for") || "unknown"
    );
    if (!rateLimit.allowed) {
      return c.json(
        {
          success: false,
          error: "Too many requests. Please try again later.",
        },
        429
      );
    }

    // 5. Create user in transaction
    const user = await prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        console.log(`User creation attempt: ${normalizedEmail}`);
        const createdUser = await tx.user.create({
          data: {
            username: userData.username,
            email: normalizedEmail,
            password_hash: hashedPassword,
            user_type: userData.user_type,
            first_name: userData.first_name,
            last_name: userData.last_name,
            phone_number: userData.phone_number,
          },
        });
        console.log(`User created successfully: ${createdUser.id}`);
        return createdUser;
      }
    );

    // 6. Create email verification token
    try {
      const verificationToken = crypto.randomBytes(32).toString("hex");
      await prisma.verificationToken.create({
        data: {
          user_id: user.id,
          token: verificationToken,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      });
    } catch (tokenError) {
      console.error("Error creating verification token:", tokenError);
      // Continue even if token creation fails
    }

    // 7. Send response
    const response = {
      success: true,
      data: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        user_type: user.user_type,
        phone_number: user.phone_number,
        created_at: user.created_at,
      },
    };
    console.log("Sending response:", JSON.stringify(response, null, 2));
    return c.json(response, 201);
  } catch (error: unknown) {
    console.error("Detailed error:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Prisma error code:", error.code);
      console.error("Prisma error meta:", error.meta);

      if (error.code === "P2002") {
        const target = error.meta?.target as string[];
        if (target.includes("email")) {
          return c.json(
            {
              success: false,
              error: "Email already in use",
            },
            409
          );
        }
      }
    }

    const errorResponse = {
      success: false,
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error",
    };
    console.error(
      "Sending error response:",
      JSON.stringify(errorResponse, null, 2)
    );
    return c.json(errorResponse, 500);
  } finally {
    await prisma.$disconnect();
  }
};
