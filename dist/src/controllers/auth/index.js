import {} from "hono";
import bcrypt, { hash } from "bcryptjs";
import { z } from "zod"; // For validation
import { checkRateLimit } from "../../utils/rate-limit.js";
import { generateToken, verifyPassword } from "../../utils/auth.js";
import { authMiddleware } from "../../utils/auth.js";
import { employerSignUpSchema } from "../../shared/shared-schema.js";
import { emailService, sendDevelopmentEmail, } from "../../services/emailService.js";
import { prisma } from "../../db.js";
import { Prisma } from "@prisma/client"; // Added Prisma import
import { writeFile } from "fs/promises"; // to save the file
import fs from "fs"; // to use fs.promises.mkdir
import path from "path"; // to resolve file path
import crypto from "crypto"; // to generate unique file names
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
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
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
const handleError = (c, error) => {
    console.error("Error:", error);
    if (error instanceof z.ZodError) {
        return c.json({
            success: false,
            error: "Validation failed",
            details: error.flatten(),
        }, 400);
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
            const target = error.meta?.target || ["unknown field"];
            return c.json({
                success: false,
                error: `${target.join(", ")} already exists`,
                code: error.code,
            }, 409);
        }
        return c.json({
            success: false,
            error: "Database error",
            code: error.code,
        }, 500);
    }
    return c.json({
        success: false,
        error: "Registration failed",
        details: process.env.NODE_ENV === "development" && error instanceof Error
            ? error.message
            : undefined,
    }, 500);
};
export const getPendingEmployersController = async (c) => {
    try {
        console.log('Fetching pending employers...');
        const pendingEmployers = await prisma.user.findMany({
            where: {
                user_type: 'employer',
                is_approved: false,
                is_email_verified: true
            },
            include: {
                employer: true,
                photos: {
                    orderBy: [
                        { photo_type: 'asc' },
                        { order: 'asc' }
                    ]
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        });
        console.log(`Found ${pendingEmployers.length} pending employers`);
        // Debug: Log photos for each employer
        pendingEmployers.forEach(emp => {
            console.log(`Employer ${emp.id} (${emp.email}):`);
            console.log('  - Profile photo:', emp.photo);
            console.log('  - Photos count:', emp.photos?.length || 0);
            emp.photos?.forEach((photo, idx) => {
                console.log(`  - Photo ${idx + 1}:`, {
                    path: photo.photo_path,
                    type: photo.photo_type,
                    order: photo.order
                });
            });
        });
        return c.json({
            success: true,
            data: pendingEmployers
        });
    }
    catch (error) {
        console.error("Get pending employers error:", error);
        return c.json({
            success: false,
            error: "Failed to fetch pending employers"
        }, 500);
    }
};
// Approve employer account
export const approveEmployerController = async (c) => {
    try {
        const { employerId } = await c.req.json();
        const adminUser = c.get('user'); // From auth middleware
        if (!employerId) {
            return c.json({ error: "Employer ID is required" }, 400);
        }
        // Find the employer user
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
        // Update employer approval status
        const updatedUser = await prisma.user.update({
            where: { id: employerId },
            data: {
                is_approved: true,
                is_active: true,
                approved_at: new Date(),
                approved_by: adminUser.id
            }
        });
        // Send approval notification email
        try {
            const userName = employerUser.first_name || employerUser.email.split('@')[0];
            await emailService.sendApprovalEmail(employerUser.email, userName);
        }
        catch (emailError) {
            console.error("Failed to send approval email:", emailError);
            // Continue even if email fails
        }
        return c.json({
            success: true,
            message: "Employer approved successfully. Approval email has been sent."
        });
    }
    catch (error) {
        console.error("Approve employer error:", error);
        return c.json({ error: "Failed to approve employer" }, 500);
    }
};
export const userLoginController = async (c) => {
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
        if (!user)
            return c.json({ error: "Invalid credentials" }, 401);
        // Verify password
        const isValid = await verifyPassword(password, user.password_hash);
        if (!isValid)
            return c.json({ error: "Invalid credentials" }, 401);
        // Check if account is verified
        if (!user.is_email_verified) {
            return c.json({
                error: "Email not verified",
                message: "Please verify your email address before logging in.",
                code: "EMAIL_NOT_VERIFIED"
            }, 401);
        }
        // Check if employer account is approved
        if (user.user_type === 'employer' && !user.is_approved) {
            return c.json({
                error: "Account pending approval",
                message: "Your employer account is awaiting administrator approval. This typically takes 1-2 business days.",
                code: "PENDING_ADMIN_APPROVAL"
            }, 401);
        }
        // Check if account is active
        if (!user.is_active) {
            return c.json({
                error: "Account inactive",
                message: "Your account has been deactivated. Please contact support.",
                code: "ACCOUNT_INACTIVE"
            }, 401);
        }
        // Update last_login
        try {
            await prisma.user.update({
                where: { id: user.id },
                data: { last_login: new Date() },
            });
        }
        catch (updateError) {
            console.error("Failed to update last_login:", updateError);
        }
        // Generate token
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
    }
    catch (error) {
        console.error("Login error:", error);
        return c.json({ error: "Server error" }, 500);
    }
};
export const createEmployerController = async (c) => {
    try {
        const formData = await c.req.formData();
        // Parse the main data payload
        const payload = JSON.parse(formData.get("data"));
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
            return c.json({
                success: false,
                errors: validation.error.flatten(),
            }, 400);
        }
        // Check for existing username/email
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ username: user.username }, { email: user.email.toLowerCase() }],
            },
        });
        if (existingUser) {
            return c.json({
                message: existingUser.email === user.email
                    ? "Email already exists"
                    : "Username already taken",
            }, 400);
        }
        // Handle company logo upload
        let logoPath = null;
        const logoFile = formData.get("logo");
        if (logoFile && logoFile.size > 0) {
            const buffer = await logoFile.arrayBuffer();
            const fileBytes = Buffer.from(buffer);
            const fileExt = path.extname(logoFile.name);
            const fileName = `${crypto.randomUUID()}${fileExt}`;
            const uploadDir = path.join(process.cwd(), "public", "uploads", "logos");
            await fs.promises.mkdir(uploadDir, { recursive: true });
            const filePath = path.join(uploadDir, fileName);
            await fs.promises.writeFile(filePath, fileBytes);
            logoPath = `/uploads/logos/${fileName}`;
        }
        // Handle profile photo upload (single photo)
        let profilePhotoPath = null;
        const profilePhoto = formData.get("profilePhoto");
        if (profilePhoto && profilePhoto.size > 0) {
            const buffer = await profilePhoto.arrayBuffer();
            const fileBytes = Buffer.from(buffer);
            const fileExt = path.extname(profilePhoto.name);
            const fileName = `profile_${crypto.randomUUID()}${fileExt}`;
            const uploadDir = path.join(process.cwd(), "public", "uploads", "profiles");
            await fs.promises.mkdir(uploadDir, { recursive: true });
            const filePath = path.join(uploadDir, fileName);
            await fs.promises.writeFile(filePath, fileBytes);
            profilePhotoPath = `/uploads/profiles/${fileName}`;
        }
        // Handle verification documents upload (multiple documents)
        const verificationDocPaths = [];
        const verificationDocsCount = parseInt(formData.get("verificationDocsCount")) || 0;
        for (let i = 0; i < verificationDocsCount; i++) {
            const docFile = formData.get(`verificationDoc_${i}`);
            if (docFile && docFile.size > 0) {
                const buffer = await docFile.arrayBuffer();
                const fileBytes = Buffer.from(buffer);
                const fileExt = path.extname(docFile.name);
                const fileName = `verification_${crypto.randomUUID()}${fileExt}`;
                const uploadDir = path.join(process.cwd(), "public", "uploads", "verification");
                await fs.promises.mkdir(uploadDir, { recursive: true });
                const filePath = path.join(uploadDir, fileName);
                await fs.promises.writeFile(filePath, fileBytes);
                verificationDocPaths.push(`/uploads/verification/${fileName}`);
            }
        }
        // Store verification documents as JSON
        const verificationDocsJson = JSON.stringify(verificationDocPaths);
        // Transaction: create user & employer with verification documents
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
                    photo: profilePhotoPath, // Single profile photo
                    is_active: false,
                    is_email_verified: false,
                    is_approved: false,
                },
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
                    // Add verification_documents field to your schema if needed
                    // verification_documents: verificationDocsJson,
                },
            });
            // Store verification documents in UserPhoto table with verification type
            for (let i = 0; i < verificationDocPaths.length; i++) {
                await tx.userPhoto.create({
                    data: {
                        user_id: userRecord.id,
                        photo_path: verificationDocPaths[i],
                        photo_type: "verification", // Mark as verification document
                        is_primary: false,
                        order: i,
                    }
                });
            }
            return { userRecord, employerRecord, verificationDocPaths };
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
            // Send verification email
            const userName = result.userRecord.first_name || result.userRecord.email.split("@")[0];
            const emailSent = await emailService.sendVerificationEmail(result.userRecord.email, userName, verificationToken);
            if (!emailSent && process.env.NODE_ENV === "development") {
                const baseUrl = process.env.FRONTEND_URL || "http://localhost:5173";
                const verificationUrl = `${baseUrl}/verify-email?token=${verificationToken}`;
                sendDevelopmentEmail(result.userRecord.email, "Verify Your J4IPWDs Account", `Click this link to verify your account: ${verificationUrl}`, `Click this link to verify your account: ${verificationUrl}`);
            }
        }
        catch (tokenError) {
            console.error("Error creating verification token or sending email:", tokenError);
        }
        return c.json({
            success: true,
            data: {
                userId: result.userRecord.id,
                employerId: result.employerRecord.id,
                verificationDocsUploaded: result.verificationDocPaths.length,
                profilePhotoUploaded: !!profilePhotoPath,
            },
            message: "Employer account created successfully. Please check your email to verify your account. After email verification, your account will be reviewed by our admin team.",
        }, 201);
    }
    catch (error) {
        console.error("Server Error:", error);
        return handleError(c, error);
    }
};
export const getUserById = async (c) => {
    try {
        const userId = Number(c.req.param("id"));
        const requestingUser = c.get("user"); // From middleware
        // Optional: Verify user can access this data
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
                pwd_id_number: true, // 👈 add this line
            },
        });
        if (!user)
            return c.json({ error: "User not found" }, 404);
        return c.json(user);
    }
    catch (error) {
        console.error("Error:", error);
        return c.json({ error: "Internal server error" }, 500);
    }
};
export const forgotPasswordController = async (c) => {
    try {
        const { email } = await c.req.json();
        // Validate input
        if (!email) {
            return c.json({ error: "Email is required" }, 400);
        }
        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
        });
        // Always return success to prevent email enumeration
        if (!user) {
            return c.json({
                success: true,
                message: "If an account with that email exists, a reset link has been sent",
            });
        }
        // Delete any existing password reset tokens for this user
        await prisma.verificationToken.deleteMany({
            where: { user_id: user.id },
        });
        // Generate reset token and expiry (1 hour)
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpiry = new Date(Date.now() + 3600000);
        // Store token in VerificationToken table
        await prisma.verificationToken.create({
            data: {
                user_id: user.id,
                token: resetToken,
                expires: resetTokenExpiry,
            },
        });
        // You can use the raw token in the reset link
        await emailService.sendPasswordResetEmail(user.email, user.first_name || user.username || "User", resetToken);
        return c.json({
            success: true,
            message: "If an account with that email exists, a reset link has been sent",
        });
    }
    catch (error) {
        console.error("Forgot password error:", error);
        return c.json({ error: "Error processing password reset request" }, 500);
    }
};
export const resetPasswordController = async (c) => {
    try {
        const { token, password, confirmPassword } = await c.req.json();
        // Validate input
        if (!token || !password || !confirmPassword) {
            return c.json({ error: "Token, password, and confirmation are required" }, 400);
        }
        if (password !== confirmPassword) {
            return c.json({ error: "Passwords do not match" }, 400);
        }
        // Debug logging
        console.log("Looking for token:", token);
        // Find the verification token
        const verificationToken = await prisma.verificationToken.findFirst({
            where: {
                token: token,
                expires: {
                    gt: new Date(), // Check if token is not expired
                },
            },
            include: { user: true },
        });
        console.log("Found token:", verificationToken);
        if (!verificationToken) {
            return c.json({ error: "Invalid or expired token" }, 400);
        }
        // Hash new password
        const hashedPassword = await hash(password, 12);
        // Update user's password using transaction to ensure both operations succeed
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
        // Send confirmation email
        try {
            // Create a simple email sending function since sendEmail doesn't exist
            const userName = verificationToken.user.first_name ||
                verificationToken.user.username ||
                "User";
            const emailContent = `
        <p>Hello ${userName},</p>
        <p>Your password has been successfully changed.</p>
        <p>If you didn't make this change, please contact our support team immediately.</p>
      `;
            // Use your existing email service's transporter
            await emailService.sendPasswordResetConfirmation(verificationToken.user.email, userName);
        }
        catch (emailError) {
            console.error("Failed to send confirmation email:", emailError);
            // Continue even if email fails
        }
        return c.json({
            success: true,
            message: "Password updated successfully",
        });
    }
    catch (error) {
        console.error("Reset password error:", error);
        // More detailed error logging
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.error("Prisma error code:", error.code);
        }
        return c.json({
            error: "Error resetting password",
            details: process.env.NODE_ENV === "development",
        }, 500);
    }
};
// Email verification controller
export const verifyEmailController = async (c) => {
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
            await prisma.verificationToken.delete({
                where: { id: verificationToken.id }
            });
            return c.json({
                success: false,
                error: "Verification token has expired",
                message: "Please request a new verification email"
            }, 400);
        }
        // ✅ FIX: Ensure user_id is treated as number and handle type conversion
        const userId = Number(verificationToken.user_id);
        if (isNaN(userId)) {
            console.error("Invalid user_id format:", verificationToken.user_id);
            return c.json({
                success: false,
                error: "Invalid user ID format"
            }, 500);
        }
        // Update user based on user type
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                is_email_verified: true,
                // For employers: set active to false until admin approval
                is_active: verificationToken.user.user_type !== 'employer'
            }
        });
        // Delete the used token
        await prisma.verificationToken.delete({
            where: { id: verificationToken.id }
        });
        // Return different messages based on user type
        if (verificationToken.user.user_type === 'employer') {
            return c.json({
                success: true,
                requiresApproval: true,
                message: "Email verified successfully! Your employer account is now pending admin approval. You will receive an email notification once your account is approved (typically within 1-2 business days)."
            });
        }
        else {
            return c.json({
                success: true,
                message: "Email verified successfully! You can now log in to your account."
            });
        }
    }
    catch (error) {
        console.error("Email verification error:", error);
        // More detailed error logging
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.error("Prisma error code:", error.code);
            console.error("Prisma error details:", error.meta);
            // Handle specific Prisma errors
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
// Resend verification email controller
export const resendVerificationController = async (c) => {
    try {
        const { email } = await c.req.json();
        if (!email) {
            return c.json({
                success: false,
                error: "Email is required",
            }, 400);
        }
        // Find the user
        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
        });
        if (!user) {
            return c.json({
                success: false,
                error: "User not found",
            }, 404);
        }
        // Check if user is already verified
        if (user.is_active) {
            return c.json({
                success: false,
                error: "Account already verified",
                message: "Your account is already verified. You can log in normally.",
            }, 400);
        }
        // Delete any existing verification tokens for this user
        await prisma.verificationToken.deleteMany({
            where: { user_id: user.id },
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
        const userName = user.first_name || user.email.split("@")[0];
        const emailSent = await emailService.sendVerificationEmail(user.email, userName, verificationToken);
        if (!emailSent && process.env.NODE_ENV === "development") {
            // Fallback for development - log the email content
            const baseUrl = process.env.FRONTEND_URL || "http://localhost:5173";
            const verificationUrl = `${baseUrl}/verify-email?token=${verificationToken}`;
            sendDevelopmentEmail(user.email, "Verify Your J4IPWDs Account", `Click this link to verify your account: ${verificationUrl}`, `Click this link to verify your account: ${verificationUrl}`);
        }
        return c.json({
            success: true,
            message: emailSent
                ? "Verification email sent successfully"
                : "Account created. Please check your email for verification link.",
            // Remove this in production - only for development
            token: process.env.NODE_ENV === "development" ? verificationToken : undefined,
        });
    }
    catch (error) {
        console.error("Resend verification error:", error);
        return c.json({
            success: false,
            error: "Failed to resend verification email",
            message: "An error occurred. Please try again later.",
        }, 500);
    }
};
// Test email configuration endpoint
export const testEmailController = async (c) => {
    try {
        // Test connection first
        const connectionTest = await emailService.testConnection();
        if (!connectionTest) {
            return c.json({
                success: false,
                error: "Email connection failed",
                message: "Check your SMTP configuration in .env file",
            }, 500);
        }
        // Try to send a test email
        const testEmail = process.env.SMTP_USER || "test@example.com";
        const testResult = await emailService.sendVerificationEmail(testEmail, "Test User", "test-token-123");
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
                nodeEnv: process.env.NODE_ENV,
            },
        });
    }
    catch (error) {
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
                nodeEnv: process.env.NODE_ENV,
            },
        }, 500);
    }
};
/**
 * Validate password reset token (for frontend to check before showing reset form)
 */
export const validateResetTokenController = async (c) => {
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
    }
    catch (error) {
        console.error("Validate reset token error:", error);
        return c.json({ valid: false, error: "Server error" }, 500);
    }
};
// Simple email sending function (replacement for the missing function)
const sendEmail = async (emailData) => {
    try {
        // Use the existing email service's transporter
        const mailOptions = {
            from: `"J4IPWDs" <${process.env.SMTP_USER || "j4pwdsno.reply@gmail.com"}>`,
            to: emailData.to,
            subject: emailData.subject,
            html: emailData.html,
        };
        const result = await emailService.sendMail(mailOptions);
        console.log("Email sent successfully:", result.messageId);
        return true;
    }
    catch (error) {
        console.error("Email sending failed:", error);
        return false;
    }
};
export const getStatsController = async (c) => {
    try {
        // Fetch all statistics in parallel for better performance
        const [activeUsersCount, jobListingsCount, partnerEmployersCount] = await Promise.all([
            // Count active users (PWD and general users, excluding employers)
            prisma.user.count({
                where: {
                    user_type: {
                        in: ["pwd", "general", "employer"],
                    },
                    is_active: true,
                },
            }),
            // Count job listings (assuming you have a Job table)
            // Replace 'job' with your actual table name if different
            prisma.jobListing
                .count({
                where: {
                // Add any filters for active/published jobs if needed
                // status: 'active' or similar
                },
            })
                .catch(() => 0), // Return 0 if job table doesn't exist yet
            // Count employers
            prisma.user.count({
                where: {
                    user_type: "employer",
                    is_active: true,
                },
            }),
        ]);
        // Format numbers for display (e.g., 1000 -> "1,000+")
        const formatStat = (num) => {
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
    }
    catch (error) {
        console.error("Error fetching stats:", error);
        return c.json({
            success: false,
            error: "Failed to fetch statistics",
            message: "An error occurred while retrieving platform statistics.",
            details: error instanceof Error ? error.message : "Unknown error",
        }, 500);
    }
    finally {
        await prisma.$disconnect();
    }
};
