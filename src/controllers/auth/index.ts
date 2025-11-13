import { type Context } from "hono";
import bcrypt, { hash } from "bcryptjs";
import { z } from "zod";
import { checkRateLimit } from "../../utils/rate-limit.js";
import { generateToken, verifyPassword } from "../../utils/auth.js";
import { authMiddleware } from "../../utils/auth.js";
import { employerSignUpSchema } from "../../shared/shared-schema.js";
import {
  emailService,
  sendDevelopmentEmail,
} from "../../services/emailService.js";
import { prisma } from "../../db.js";
import { Prisma } from "@prisma/client";

import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
import crypto from "crypto";

// ==================== FILE SIZE VALIDATION ====================
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
const MAX_LOGO_SIZE = 5 * 1024 * 1024; // 5MB for logos
const MAX_PHOTO_SIZE = 5 * 1024 * 1024; // 5MB for photos

// Helper function to validate file size
const validateFileSize = (file: File | null, maxSize: number, fieldName: string): string | null => {
  if (!file) return null;
  
  if (file.size > maxSize) {
    const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1);
    return `${fieldName} exceeds maximum size of ${maxSizeMB}MB`;
  }
  
  return null;
};

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
    return c.json(
      {
        success: false,
        error: "Validation failed",
        details: error.flatten(),
      },
      400
    );
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      const target = (error.meta?.target as string[]) || ["unknown field"];
      return c.json(
        {
          success: false,
          error: `${target.join(", ")} already exists`,
          code: error.code,
        },
        409
      );
    }
    return c.json(
      {
        success: false,
        error: "Database error",
        code: error.code,
      },
      500
    );
  }

  return c.json(
    {
      success: false,
      error: "Registration failed",
      details:
        process.env.NODE_ENV === "development" && error instanceof Error
          ? error.message
          : undefined,
    },
    500
  );
};

// Define proper TypeScript interfaces
interface LoginRequest {
  email: string;
  password: string;
  userType?: string;
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
  is_approved?: boolean;
}

export const getPendingEmployersController = async (c: Context): Promise<Response> => {
  try {
    console.log('Fetching pending employers...');
    
    const pendingEmployers = await prisma.user.findMany({
      where: {
        user_type: 'employer',
        is_approved: false,
        is_email_verified: true
      },
      include: {
        employer: true
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    console.log(`Found ${pendingEmployers.length} pending employers`);

    return c.json({
      success: true,
      data: pendingEmployers
    });

  } catch (error) {
    console.error("Get pending employers error:", error);
    return c.json({ 
      success: false,
      error: "Failed to fetch pending employers" 
    }, 500);
  }
};

export const approveEmployerController = async (c: Context): Promise<Response> => {
  try {
    const { employerId } = await c.req.json();
    const adminUser = c.get('user');

    if (!employerId) {
      return c.json({ error: "Employer ID is required" }, 400);
    }

    const employerUser = await prisma.user.findUnique({
      where: { id: employerId },
      include: { employer: true }
    });

    if (!employerUser || employerUser.user_type !== 'employer') {
      return c.json({ error: "Employer not found" }, 404);
    }

    if (employerUser.is_approved) {
      return c.json({ error: "Employer already approved" }, 400);
    }

    const updatedUser = await prisma.user.update({
      where: { id: employerId },
      data: {
        is_approved: true,
        is_active: true,
        approved_at: new Date(),
        approved_by: adminUser.id
      }
    });

    try {
      const userName = employerUser.first_name || employerUser.email.split('@')[0];
      await emailService.sendApprovalEmail(
        employerUser.email,
        userName
      );
    } catch (emailError) {
      console.error("Failed to send approval email:", emailError);
    }

    return c.json({
      success: true,
      message: "Employer approved successfully. Approval email has been sent."
    });

  } catch (error) {
    console.error("Approve employer error:", error);
    return c.json({ error: "Failed to approve employer" }, 500);
  }
};

export const userLoginController = async (c: Context): Promise<Response> => {
  try {
    const { email, password } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: "Email and password required" }, 400);
    }

    const user = await prisma.user.findUnique({ 
      where: { email: email.toLowerCase() } 
    });
    if (!user) return c.json({ error: "Invalid credentials" }, 401);

    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) return c.json({ error: "Invalid credentials" }, 401);

    if (!user.is_email_verified) {
      return c.json({ 
        error: "Email not verified", 
        message: "Please verify your email address before logging in.",
        code: "EMAIL_NOT_VERIFIED"
      }, 401);
    }

    if (user.user_type === 'employer' && !user.is_approved) {
      return c.json({ 
        error: "Account pending approval", 
        message: "Your employer account is awaiting administrator approval. This typically takes 1-2 business days.",
        code: "PENDING_ADMIN_APPROVAL"
      }, 401);
    }

    if (!user.is_active) {
      return c.json({ 
        error: "Account inactive", 
        message: "Your account has been deactivated. Please contact support.",
        code: "ACCOUNT_INACTIVE"
      }, 401);
    }

    try {
      await prisma.user.update({
        where: { id: user.id },
        data: { last_login: new Date() },
      });
    } catch (updateError) {
      console.error("Failed to update last_login:", updateError);
    }

    const token = generateToken({ 
      userId: user.id.toString(), 
      email: user.email, 
      userType: user.user_type 
    });

    return c.json({ 
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        user_type: user.user_type,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        last_login: new Date().toISOString(),
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

    // Parse the main data payload
    const payload = JSON.parse(formData.get("data") as string);
    const { user, employer, confirmPassword, agreeToTerms } = payload;

    // Validate input with the complete schema
    const validation = employerSignUpSchema.safeParse({
      user,
      employer,
      confirmPassword,
      agreeToTerms,
    });

    if (!validation.success) {
      console.error("Validation failed:", validation.error.flatten());
      return c.json(
        {
          success: false,
          errors: validation.error.flatten(),
        },
        400
      );
    }

    // Check for existing username/email
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username: user.username }, { email: user.email.toLowerCase() }],
      },
    });

    if (existingUser) {
      return c.json(
        {
          message:
            existingUser.email === user.email
              ? "Email already exists"
              : "Username already taken",
        },
        400
      );
    }

    // Handle logo file upload with size validation
    let logoPath: string | null = null;
    const logoFile = formData.get("logo") as File | null;

    if (logoFile && logoFile.size > 0) {
      // Validate logo file size
      const logoSizeError = validateFileSize(logoFile, MAX_LOGO_SIZE, "Logo");
      if (logoSizeError) {
        return c.json(
          {
            success: false,
            error: logoSizeError,
            message: "Please compress your logo image before uploading."
          },
          413
        );
      }

      const buffer = await logoFile.arrayBuffer();
      const fileBytes = Buffer.from(buffer);
      const fileExt = path.extname(logoFile.name);
      const fileName = `${crypto.randomUUID()}${fileExt}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads");

      await fs.promises.mkdir(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, fileName);
      await fs.promises.writeFile(filePath, fileBytes);

      logoPath = `/uploads/${fileName}`;
      
      console.log(`Logo uploaded: ${fileName} (${(logoFile.size / 1024).toFixed(2)}KB)`);
    }

    // Handle photo file upload with size validation
    let photoPath: string | null = null;
    const photoFile = formData.get("photo") as File | null;

    if (photoFile && photoFile.size > 0) {
      // Validate photo file size
      const photoSizeError = validateFileSize(photoFile, MAX_PHOTO_SIZE, "Photo");
      if (photoSizeError) {
        return c.json(
          {
            success: false,
            error: photoSizeError,
            message: "Please compress your photo before uploading."
          },
          413
        );
      }

      const buffer = await photoFile.arrayBuffer();
      const fileBytes = Buffer.from(buffer);
      const fileExt = path.extname(photoFile.name);
      const fileName = `user_${crypto.randomUUID()}${fileExt}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads", "photos");

      await fs.promises.mkdir(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, fileName);
      await fs.promises.writeFile(filePath, fileBytes);

      photoPath = `/uploads/photos/${fileName}`;
      
      console.log(`Photo uploaded: ${fileName} (${(photoFile.size / 1024).toFixed(2)}KB)`);
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
          is_active: false,
          is_email_verified: false,
          is_approved: false,
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
          user_id: Number(result.userRecord.id),
          token: verificationToken,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      });

      const userName =
        result.userRecord.first_name || result.userRecord.email.split("@")[0];
      const emailSent = await emailService.sendVerificationEmail(
        result.userRecord.email,
        userName,
        verificationToken
      );

      if (!emailSent && process.env.NODE_ENV === "development") {
        const baseUrl = process.env.FRONTEND_URL || "http://localhost:5173";
        const verificationUrl = `${baseUrl}/verify-email?token=${verificationToken}`;
        sendDevelopmentEmail(
          result.userRecord.email,
          "Verify Your J4IPWDs Account",
          `Click this link to verify your account: ${verificationUrl}`,
          `Click this link to verify your account: ${verificationUrl}`
        );
      }
    } catch (tokenError) {
      console.error(
        "Error creating verification token or sending email:",
        tokenError
      );
    }

    return c.json(
      {
        success: true,
        data: {
          userId: result.userRecord.id,
          employerId: result.employerRecord.id,
        },
        message:
          "Employer account created successfully. Please check your email to verify your account.",
      },
      201
    );
  } catch (error) {
    console.error("Server Error:", error);
    
    // Handle payload too large errors
    if (error instanceof Error && error.message.includes('payload')) {
      return c.json(
        {
          success: false,
          error: "Request payload too large",
          message: "The uploaded files are too large. Please compress your images and try again.",
        },
        413
      );
    }
    
    return handleError(c, error);
  }
};

export const getUserById = async (c: Context) => {
  try {
    const userId = Number(c.req.param("id"));
    const requestingUser = c.get("user");

    if (requestingUser.id !== userId && requestingUser.user_type !== "admin") {
      return c.json({ error: "Unauthorized" }, 403);
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        user_type: true,
        phone_number: true,
        photo: true,
        username: true,
        created_at: true,
        pwd_id_number: true,
      },
    });

    if (!user) return c.json({ error: "User not found" }, 404);
    return c.json(user);
  } catch (error) {
    console.error("Error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
};

export const forgotPasswordController = async (
  c: Context
): Promise<Response> => {
  try {
    const { email } = await c.req.json();

    if (!email) {
      return c.json({ error: "Email is required" }, 400);
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return c.json({
        success: true,
        message:
          "If an account with that email exists, a reset link has been sent",
      });
    }

    await prisma.verificationToken.deleteMany({
      where: { user_id: user.id },
    });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000);

    await prisma.verificationToken.create({
      data: {
        user_id: user.id,
        token: resetToken,
        expires: resetTokenExpiry,
      },
    });

    await emailService.sendPasswordResetEmail(
      user.email,
      user.first_name || user.username || "User",
      resetToken
    );

    return c.json({
      success: true,
      message:
        "If an account with that email exists, a reset link has been sent",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return c.json({ error: "Error processing password reset request" }, 500);
  }
};

export const resetPasswordController = async (
  c: Context
): Promise<Response> => {
  try {
    const { token, password, confirmPassword } = await c.req.json();

    if (!token || !password || !confirmPassword) {
      return c.json(
        { error: "Token, password, and confirmation are required" },
        400
      );
    }

    if (password !== confirmPassword) {
      return c.json({ error: "Passwords do not match" }, 400);
    }

    console.log("Looking for token:", token);

    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        token: token,
        expires: {
          gt: new Date(),
        },
      },
      include: { user: true },
    });

    console.log("Found token:", verificationToken);

    if (!verificationToken) {
      return c.json({ error: "Invalid or expired token" }, 400);
    }

    const hashedPassword = await hash(password, 12);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: verificationToken.user_id },
        data: {
          password_hash: hashedPassword,
        },
      }),
      prisma.verificationToken.delete({
        where: { id: verificationToken.id },
      }),
    ]);

    try {
      const userName =
        verificationToken.user.first_name ||
        verificationToken.user.username ||
        "User";

      await emailService.sendPasswordResetConfirmation(
        verificationToken.user.email,
        userName
      );
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
    }

    return c.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Prisma error code:", error.code);
    }

    return c.json(
      {
        error: "Error resetting password",
        details: process.env.NODE_ENV === "development",
      },
      500
    );
  }
};

export const verifyEmailController = async (c: Context): Promise<Response> => {
  try {
    const { token } = await c.req.json();

    if (!token) {
      return c.json({
        success: false,
        error: "Verification token is required"
      }, 400);
    }

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

    if (verificationToken.expires < new Date()) {
      await prisma.verificationToken.delete({
        where: { id: verificationToken.id }
      });

      return c.json({
        success: false,
        error: "Verification token has expired",
        message: "Please request a new verification email"
      }, 400);
    }

    const userId = Number(verificationToken.user_id);
    
    if (isNaN(userId)) {
      console.error("Invalid user_id format:", verificationToken.user_id);
      return c.json({
        success: false,
        error: "Invalid user ID format"
      }, 500);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { 
        is_email_verified: true,
        is_active: verificationToken.user.user_type !== 'employer'
      }
    });

    await prisma.verificationToken.delete({
      where: { id: verificationToken.id }
    });

    if (verificationToken.user.user_type === 'employer') {
      return c.json({
        success: true,
        requiresApproval: true,
        message: "Email verified successfully! Your employer account is now pending admin approval. You will receive an email notification once your account is approved (typically within 1-2 business days)."
      });
    } else {
      return c.json({
        success: true,
        message: "Email verified successfully! You can now log in to your account."
      });
    }

  } catch (error) {
    console.error("Email verification error:", error);
    
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Prisma error code:", error.code);
      console.error("Prisma error details:", error.meta);
      
      if (error.code === 'P2025') {
        return c.json({
          success: false,
          error: "User not found",
          message: "The user associated with this verification token no longer exists."
        }, 404);
      }
    }
    
    return c.json({
      success: false,
      error: "Verification failed",
      message: "An error occurred during verification. Please try again."
    }, 500);
  }
};

export const resendVerificationController = async (
  c: Context
): Promise<Response> => {
  try {
    const { email } = await c.req.json();

    if (!email) {
      return c.json(
        {
          success: false,
          error: "Email is required",
        },
        400
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return c.json(
        {
          success: false,
          error: "User not found",
        },
        404
      );
    }

    if (user.is_active) {
      return c.json(
        {
          success: false,
          error: "Account already verified",
          message: "Your account is already verified. You can log in normally.",
        },
        400
      );
    }

    await prisma.verificationToken.deleteMany({
      where: { user_id: user.id },
    });

    const verificationToken = crypto.randomBytes(32).toString("hex");
    await prisma.verificationToken.create({
      data: {
        user_id: user.id,
        token: verificationToken,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    const userName = user.first_name || user.email.split("@")[0];
    const emailSent = await emailService.sendVerificationEmail(
      user.email,
      userName,
      verificationToken
    );

    if (!emailSent && process.env.NODE_ENV === "development") {
      const baseUrl = process.env.FRONTEND_URL || "http://localhost:5173";
      const verificationUrl = `${baseUrl}/verify-email?token=${verificationToken}`;
      sendDevelopmentEmail(
        user.email,
        "Verify Your J4IPWDs Account",
        `Click this link to verify your account: ${verificationUrl}`,
        `Click this link to verify your account: ${verificationUrl}`
      );
    }

    return c.json({
      success: true,
      message: emailSent
        ? "Verification email sent successfully"
        : "Account created. Please check your email for verification link.",
      token:
        process.env.NODE_ENV === "development" ? verificationToken : undefined,
    });
  } catch (error) {
    console.error("Resend verification error:", error);
    return c.json(
      {
        success: false,
        error: "Failed to resend verification email",
        message: "An error occurred. Please try again later.",
      },
      500
    );
  }
};

export const testEmailController = async (c: Context): Promise<Response> => {
  try {
    const connectionTest = await emailService.testConnection();

    if (!connectionTest) {
      return c.json(
        {
          success: false,
          error: "Email connection failed",
          message: "Check your SMTP configuration in .env file",
        },
        500
      );
    }

    const testEmail = process.env.SMTP_USER || "test@example.com";
    const testResult = await emailService.sendVerificationEmail(
      testEmail,
      "Test User",
      "test-token-123"
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
        hasPassword: !!process.env.SMTP_PASS,
        frontendUrl: process.env.FRONTEND_URL,
        nodeEnv: process.env.NODE_ENV,
      },
    });
  } catch (error) {
    console.error("Email test error:", error);
    return c.json(
      {
        success: false,
        error: "Email test failed",
        message: error instanceof Error ? error.message : "Unknown error",
        config: {
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          user: process.env.SMTP_USER,
          hasPassword: !!process.env.SMTP_PASS,
          frontendUrl: process.env.FRONTEND_URL,
          nodeEnv: process.env.NODE_ENV,
        },
      },
      500
    );
  }
};

export const validateResetTokenController = async (
  c: Context
): Promise<Response> => {
  try {
    const token = c.req.query("token");
    if (!token) {
      return c.json({ valid: false, error: "Token is required" }, 400);
    }

    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken || verificationToken.expires < new Date()) {
      return c.json({ valid: false, error: "Invalid or expired token" }, 400);
    }

    return c.json({ valid: true });
  } catch (error) {
    console.error("Validate reset token error:", error);
    return c.json({ valid: false, error: "Server error" }, 500);
  }
};

const sendEmail = async (emailData: {
  to: string;
  subject: string;
  html: string;
}) => {
  try {
    const mailOptions = {
      from: `"J4IPWDs" <${
        process.env.SMTP_USER || "j4pwdsno.reply@gmail.com"
      }>`,
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html,
    };

    const result = await emailService.sendMail(mailOptions);
    console.log("Email sent successfully:", result.messageId);
    return true;
  } catch (error) {
    console.error("Email sending failed:", error);
    return false;
  }
};

export const getStatsController = async (c: Context): Promise<Response> => {
  try {
    const [activeUsersCount, jobListingsCount, partnerEmployersCount] =
      await Promise.all([
        prisma.user.count({
          where: {
            user_type: {
              in: ["pwd", "general", "employer"],
            },
            is_active: true,
          },
        }),

        prisma.jobListing
          .count({
            where: {},
          })
          .catch(() => 0),

        prisma.user.count({
          where: {
            user_type: "employer",
            is_active: true,
          },
        }),
      ]);

    const formatStat = (num: number): string => {
      if (num >= 1000) {
        return `${Math.floor(num / 1000) * 1000}+`;
      }
      return `${num}+`;
    };

    return c.json({
      success: true,
      data: {
        activeUsers: {
          count: activeUsersCount,
          formatted: formatStat(activeUsersCount),
        },
        jobListings: {
          count: jobListingsCount,
          formatted: formatStat(jobListingsCount),
        },
        partnerEmployers: {
          count: partnerEmployersCount,
          formatted: formatStat(partnerEmployersCount),
        },
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return c.json(
      {
        success: false,
        error: "Failed to fetch statistics",
        message: "An error occurred while retrieving platform statistics.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  } finally {
    await prisma.$disconnect();
  }
};