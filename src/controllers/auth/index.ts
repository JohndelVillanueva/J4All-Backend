import { type Context } from "hono";
import bcrypt, { hash } from "bcryptjs";
import { z } from "zod"; // For validation
import { checkRateLimit } from "../../utils/rate-limit.js";
import { generateToken, verifyPassword } from "../../utils/auth.js";
import { authMiddleware } from '../../utils/auth.js';
import { employerSignUpSchema } from "../../shared/shared-schema.js";
import { emailService, sendDevelopmentEmail } from "../../services/emailService.js";
import { prisma } from "../../db.js";

import { writeFile } from "fs/promises";     // to save the file
import fs from "fs";                        // to use fs.promises.mkdir
import path from "path";                    // to resolve file path
import crypto from "crypto";                // to generate unique file names

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





// Enhanced error handler
const handleError = (c: Context, error: unknown) => {
  console.error("Error:", error);
  
  if (error instanceof z.ZodError) {
    return c.json({
      success: false,
      error: "Validation failed",
      details: error.flatten()
    }, 400);
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      const target = error.meta?.target as string[] || ['unknown field'];
      return c.json({
        success: false,
        error: `${target.join(', ')} already exists`,
        code: error.code
      }, 409);
    }
    return c.json({
      success: false,
      error: "Database error",
      code: error.code
    }, 500);
  }

  return c.json({
    success: false,
    error: "Registration failed",
    details: process.env.NODE_ENV === 'development' && error instanceof Error 
      ? error.message 
      : undefined
  }, 500);
};
// Define proper TypeScript interfaces
interface LoginRequest {
  email: string;
  password: string;
  userType?: string; // Made optional for better UX
}

interface UserResponse {
  id: number;
  email: string;
  user_type: string;
  first_name: string | null;
  last_name: string | null;
  username?: string;
  phone_number?: string | null;
  created_at?: Date;
  is_active?: boolean;
}

export const userLoginController = async (c: Context): Promise<Response> => {
  try {
    const { email, password } = await c.req.json();

    // Validate input
    if (!email || !password) {
      return c.json({ error: "Email and password required" }, 400);
    }

    // Find user
    const user = await prisma.user.findUnique({ 
      where: { email: email.toLowerCase() } 
    });
    if (!user) return c.json({ error: "Invalid credentials" }, 401);

    // Verify password
    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) return c.json({ error: "Invalid credentials" }, 401);

    // Check if account is verified (for both job seekers and employers)
    if (!user.is_active) {
      return c.json({ 
        error: "Account not verified", 
        message: "Please check your email and verify your account before logging in.",
        code: "ACCOUNT_NOT_VERIFIED"
      }, 401);
    }

    // ✅ Update last_login (with error handling)
    try {
      await prisma.user.update({
        where: { id: user.id },
        data: { last_login: new Date() },
      });
    } catch (updateError) {
      console.error("Failed to update last_login:", updateError);
      // Continue login even if update fails
    }

    // Generate token
    const token = generateToken({ userId: user.id.toString(), email: user.email, userType: user.user_type });

    return c.json({ 
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        user_type: user.user_type,
        last_login: new Date().toISOString(), // Confirm update in response
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    return c.json({ error: "Server error" }, 500);
  }
};




export const createEmployerController = async (c: Context) => {
  try {
    const formData = await c.req.formData();

    // Parse the main data payload (now expecting 'data' field with JSON string)
    const payload = JSON.parse(formData.get('data') as string);
    const { user, employer, confirmPassword, agreeToTerms } = payload;

    // Validate input with the complete schema
    const validation = employerSignUpSchema.safeParse({
      user,
      employer,
      confirmPassword,
      agreeToTerms
    });

    if (!validation.success) {
      console.error("Validation failed:", validation.error.flatten());
      return c.json({ 
        success: false, 
        errors: validation.error.flatten() 
      }, 400);
    }

    // Check for existing username/email
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username: user.username },
          { email: user.email.toLowerCase() }
        ],
      },
    });

    if (existingUser) {
      return c.json(
        { 
          message: existingUser.email === user.email 
            ? "Email already exists" 
            : "Username already taken" 
        },
        400
      );
    }

    // Handle file upload (now using 'logo' field instead of 'logo_path')
    let logoPath: string | null = null;
    const logoFile = formData.get('logo') as File | null;

    if (logoFile && logoFile.size > 0) {
      const buffer = await logoFile.arrayBuffer();
      const fileBytes = Buffer.from(buffer);
      const fileExt = path.extname(logoFile.name);
      const fileName = `${crypto.randomUUID()}${fileExt}`;
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      
      // Ensure upload directory exists
      await fs.promises.mkdir(uploadDir, { recursive: true });
      
      const filePath = path.join(uploadDir, fileName);
      await fs.promises.writeFile(filePath, fileBytes);
      
      // Store relative path from public directory
      logoPath = `/uploads/${fileName}`;
    }

    // Handle photo file upload
    let photoPath: string | null = null;
    const photoFile = formData.get('photo') as File | null;

    if (photoFile && photoFile.size > 0) {
      const buffer = await photoFile.arrayBuffer();
      const fileBytes = Buffer.from(buffer);
      const fileExt = path.extname(photoFile.name);
      const fileName = `user_${crypto.randomUUID()}${fileExt}`;
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'photos');
      
      // Ensure upload directory exists
      await fs.promises.mkdir(uploadDir, { recursive: true });
      
      const filePath = path.join(uploadDir, fileName);
      await fs.promises.writeFile(filePath, fileBytes);
      
      // Store relative path from public directory
      photoPath = `/uploads/photos/${fileName}`;
    }

    // Transaction: create user & employer
    const result = await prisma.$transaction(async (tx) => {
      const userRecord = await tx.user.create({
        data: {
          email: user.email.toLowerCase(),
          username: user.username,
          password_hash: await hash(user.password, 12),
          first_name: user.firstName,
          last_name: user.lastName,
          phone_number: user.phone,
          user_type: "employer",
          photo: photoPath,
          is_active: false, // Require email verification for employers too
        } as any,
      });

      const employerRecord = await tx.employer.create({
        data: {
          user_id: userRecord.id,
          company_name: employer.companyName,
          contact_person: employer.contactPerson,
          industry: employer.industry,
          company_size: employer.companySize,
          website_url: employer.websiteUrl,
          founded_year: employer.foundedYear,
          address: employer.address,
          logo_path: logoPath,
        },
      });

      return { userRecord, employerRecord };
    });

    // Create verification token and send email
    try {
      const verificationToken = crypto.randomBytes(32).toString("hex");
      await prisma.verificationToken.create({
        data: {
          user_id: result.userRecord.id,
          token: verificationToken,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        },
      });

      // Send verification email
      const userName = result.userRecord.first_name || result.userRecord.email.split('@')[0];
      const emailSent = await emailService.sendVerificationEmail(
        result.userRecord.email, 
        userName, 
        verificationToken
      );

      if (!emailSent && process.env.NODE_ENV === 'development') {
        // Fallback for development - log the email content
        const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const verificationUrl = `${baseUrl}/verify-email?token=${verificationToken}`;
        sendDevelopmentEmail(
          result.userRecord.email,
          'Verify Your J4IPWDs Account',
          `Click this link to verify your account: ${verificationUrl}`,
          `Click this link to verify your account: ${verificationUrl}`
        );
      }
    } catch (tokenError) {
      console.error("Error creating verification token or sending email:", tokenError);
      // Continue even if token creation fails
    }

    return c.json(
      {
        success: true,
        data: {
          userId: result.userRecord.id,
          employerId: result.employerRecord.id,
        },
        message: "Employer account created successfully. Please check your email to verify your account.",
      },
      201
    );
  } catch (error) {
    console.error("Server Error:", error);
    return handleError(c, error);
  }
};

export const getUserById = async (c: Context) => {
  try {
    const userId = Number(c.req.param('id'));
    const requestingUser = c.get('user'); // From middleware

    // Optional: Verify user can access this data
    if (requestingUser.id !== userId && requestingUser.user_type !== 'admin') {
      return c.json({ error: "Unauthorized" }, 403);
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        user_type: true
      }
    });

    if (!user) return c.json({ error: "User not found" }, 404);
    return c.json(user);
  } catch (error) {
    console.error("Error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
};

// Email verification controller
export const verifyEmailController = async (c: Context): Promise<Response> => {
  try {
    const { token } = await c.req.json();

    if (!token) {
      return c.json({
        success: false,
        error: "Verification token is required"
      }, 400);
    }

    // Find the verification token
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
      include: { user: true }
    });

    if (!verificationToken) {
      return c.json({
        success: false,
        error: "Invalid verification token"
      }, 400);
    }

    // Check if token is expired
    if (verificationToken.expires < new Date()) {
      // Delete expired token
      await prisma.verificationToken.delete({
        where: { id: verificationToken.id }
      });

      return c.json({
        success: false,
        error: "Verification token has expired",
        message: "Please request a new verification email"
      }, 400);
    }

    // Activate the user account
    await prisma.user.update({
      where: { id: verificationToken.user_id },
      data: { is_active: true }
    });

    // Delete the used token
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id }
    });

    return c.json({
      success: true,
      message: "Email verified successfully! You can now log in to your account."
    });

  } catch (error) {
    console.error("Email verification error:", error);
    return c.json({
      success: false,
      error: "Verification failed",
      message: "An error occurred during verification. Please try again."
    }, 500);
  }
};

// Resend verification email controller
export const resendVerificationController = async (c: Context): Promise<Response> => {
  try {
    const { email } = await c.req.json();

    if (!email) {
      return c.json({
        success: false,
        error: "Email is required"
      }, 400);
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      return c.json({
        success: false,
        error: "User not found"
      }, 404);
    }

    // Check if user is already verified
    if (user.is_active) {
      return c.json({
        success: false,
        error: "Account already verified",
        message: "Your account is already verified. You can log in normally."
      }, 400);
    }

    // Delete any existing verification tokens for this user
    await prisma.verificationToken.deleteMany({
      where: { user_id: user.id }
    });

    // Create new verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    await prisma.verificationToken.create({
      data: {
        user_id: user.id,
        token: verificationToken,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      },
    });

    // Send verification email
    const userName = user.first_name || user.email.split('@')[0];
    const emailSent = await emailService.sendVerificationEmail(
      user.email, 
      userName, 
      verificationToken
    );

    if (!emailSent && process.env.NODE_ENV === 'development') {
      // Fallback for development - log the email content
      const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      const verificationUrl = `${baseUrl}/verify-email?token=${verificationToken}`;
      sendDevelopmentEmail(
        user.email,
        'Verify Your J4IPWDs Account',
        `Click this link to verify your account: ${verificationUrl}`,
        `Click this link to verify your account: ${verificationUrl}`
      );
    }

    return c.json({
      success: true,
      message: emailSent 
        ? "Verification email sent successfully" 
        : "Account created. Please check your email for verification link.",
      // Remove this in production - only for development
      token: process.env.NODE_ENV === 'development' ? verificationToken : undefined
    });

  } catch (error) {
    console.error("Resend verification error:", error);
    return c.json({
      success: false,
      error: "Failed to resend verification email",
      message: "An error occurred. Please try again later."
    }, 500);
  }
};

// Test email configuration endpoint
export const testEmailController = async (c: Context): Promise<Response> => {
  try {
    // Test connection first
    const connectionTest = await emailService.testConnection();
    
    if (!connectionTest) {
      return c.json({
        success: false,
        error: "Email connection failed",
        message: "Check your SMTP configuration in .env file"
      }, 500);
    }

    // Try to send a test email
    const testEmail = process.env.SMTP_USER || 'test@example.com';
    const testResult = await emailService.sendVerificationEmail(
      testEmail,
      'Test User',
      'test-token-123'
    );

    return c.json({
      success: true,
      message: "Email test completed",
      connection: connectionTest,
      emailSent: testResult,
      config: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
        // Don't expose password in response
        hasPassword: !!process.env.SMTP_PASS,
        frontendUrl: process.env.FRONTEND_URL,
        nodeEnv: process.env.NODE_ENV
      }
    });

  } catch (error) {
    console.error("Email test error:", error);
    return c.json({
      success: false,
      error: "Email test failed",
      message: error instanceof Error ? error.message : "Unknown error",
      config: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
        hasPassword: !!process.env.SMTP_PASS,
        frontendUrl: process.env.FRONTEND_URL,
        nodeEnv: process.env.NODE_ENV
      }
    }, 500);
  }
};
