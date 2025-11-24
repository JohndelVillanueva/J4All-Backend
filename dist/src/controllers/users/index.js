import {} from "hono";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "../../db.js";
import { checkRateLimit } from "../../utils/rate-limit.js";
import { generateToken, verifyPassword } from '../../utils/auth.js';
import crypto from "crypto";
import { PhotoService } from "../../services/photoService.js";
import fs from "fs";
import path from "path";
// Updated validation schema - removed pwd_id_number text validation
const CreateUserSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    user_type: z.enum(["pwd", "indigenous", "general", "employer"]),
    first_name: z.string().min(2).optional(),
    last_name: z.string().min(2).optional(),
    phone_number: z.string().regex(/^\+?[0-9\s-]+$/).optional(),
});
// ============================================
// CREATE USER CONTROLLER - Updated with PWD ID photo
// ============================================
export const createUserController = async (c) => {
    try {
        let rawData;
        let photoFile = null;
        let pwdIdPhotoFile = null;
        // Detect content type
        const contentType = c.req.header('content-type') || '';
        if (contentType.includes('multipart/form-data')) {
            // Handle FormData
            const formData = await c.req.formData();
            rawData = {};
            for (const [key, value] of formData.entries()) {
                if (key === 'photo' && value instanceof File) {
                    photoFile = value;
                }
                else if (key === 'pwd_id_photo' && value instanceof File) {
                    pwdIdPhotoFile = value;
                }
                else {
                    rawData[key] = value;
                }
            }
        }
        else {
            // Handle JSON
            rawData = await c.req.json();
        }
        const sanitizedData = Object.fromEntries(Object.entries(rawData).map(([key, value]) => [
            key,
            typeof value === "string" ? value.trim() : value,
        ]));
        // Validate input
        const validatedData = CreateUserSchema.safeParse(sanitizedData);
        if (!validatedData.success) {
            const errors = validatedData.error.flatten().fieldErrors;
            console.log("Validation errors:", JSON.stringify(errors, null, 2));
            return c.json({
                success: false,
                errors: errors,
            }, 400);
        }
        const userData = validatedData.data;
        const normalizedEmail = userData.email.toLowerCase();
        // Check if PWD user has uploaded PWD ID photo
        if (userData.user_type === "pwd" && (!pwdIdPhotoFile || pwdIdPhotoFile.size === 0)) {
            return c.json({
                success: false,
                error: "PWD ID photo is required",
                message: "Please upload a photo of your PWD ID card.",
                code: "PWD_ID_REQUIRED"
            }, 400);
        }
        // Check password strength
        try {
            const { default: zxcvbn } = await import("zxcvbn");
            const passwordStrength = zxcvbn(userData.password);
            if (passwordStrength.score < 3) {
                return c.json({
                    success: false,
                    error: "Password too weak",
                    suggestions: passwordStrength.feedback.suggestions,
                }, 400);
            }
        }
        catch (e) {
            console.error("Password strength check failed:", e);
        }
        // Add rate limit check
        const rateLimit = await checkRateLimit(c.req.header("x-forwarded-for") || "unknown");
        if (!rateLimit.allowed) {
            return c.json({
                success: false,
                error: "Too many requests. Please try again later.",
            }, 429);
        }
        // Handle PWD ID photo upload
        let pwdIdPhotoPath = null;
        if (pwdIdPhotoFile && pwdIdPhotoFile.size > 0) {
            try {
                const buffer = await pwdIdPhotoFile.arrayBuffer();
                const fileBytes = Buffer.from(buffer);
                const fileExt = path.extname(pwdIdPhotoFile.name);
                const fileName = `pwd_id_${crypto.randomUUID()}${fileExt}`;
                const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'pwd_ids');
                await fs.promises.mkdir(uploadDir, { recursive: true });
                const filePath = path.join(uploadDir, fileName);
                await fs.promises.writeFile(filePath, fileBytes);
                pwdIdPhotoPath = `/uploads/pwd_ids/${fileName}`;
                console.log(`PWD ID photo saved: ${pwdIdPhotoPath}`);
            }
            catch (fileError) {
                console.error("Error saving PWD ID photo:", fileError);
                return c.json({
                    success: false,
                    error: "Failed to save PWD ID photo",
                    message: "An error occurred while uploading your PWD ID photo. Please try again.",
                }, 500);
            }
        }
        // Create user in transaction
        const user = await prisma.$transaction(async (tx) => {
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
                    pwd_id_number: pwdIdPhotoPath, // Store PWD ID photo path
                    is_email_verified: false, // Require email verification
                    is_approved: false, // Require admin approval for PWD users
                    is_active: false, // Account inactive until both email verified and approved
                },
            });
            console.log(`User created successfully: ${createdUser.id}`);
            return createdUser;
        });
        // Save profile photo if present
        if (photoFile) {
            console.log('[createUserController] photoFile:', photoFile, 'type:', typeof photoFile, 'name:', photoFile.name, 'size:', photoFile.size);
            await PhotoService.updateUserPhoto(user.id, photoFile, photoFile.name);
        }
        // Create email verification token and send email
        try {
            const verificationToken = crypto.randomBytes(32).toString("hex");
            await prisma.verificationToken.create({
                data: {
                    user_id: user.id,
                    token: verificationToken,
                    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                },
            });
            const { emailService, sendDevelopmentEmail } = await import("../../services/emailService.js");
            const userName = user.first_name || user.email.split('@')[0];
            const emailSent = await emailService.sendVerificationEmail(user.email, userName, verificationToken);
            if (!emailSent && process.env.NODE_ENV === 'development') {
                const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
                const verificationUrl = `${baseUrl}/verify-email?token=${verificationToken}`;
                sendDevelopmentEmail(user.email, 'Verify Your J4PWDs Account', `Click this link to verify your account: ${verificationUrl}`, `Click this link to verify your account: ${verificationUrl}`);
            }
        }
        catch (tokenError) {
            console.error("Error creating verification token or sending email:", tokenError);
        }
        // Send response
        const response = {
            success: true,
            data: {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                user_type: user.user_type,
                pwd_id_number: user.pwd_id_number, // Include PWD ID photo path in response
                phone_number: user.phone_number,
                created_at: user.created_at,
            },
            message: "Account created successfully. Please check your email to verify your account. After email verification, your account will be reviewed by our admin team."
        };
        console.log("Sending response:", JSON.stringify(response, null, 2));
        return c.json(response, 201);
    }
    catch (error) {
        console.error("Detailed error:", error);
        if (error.code === "P2002") {
            const target = error.meta?.target;
            if (target.includes("email")) {
                return c.json({
                    success: false,
                    error: "Email already exists",
                    message: "This email address is already registered. Please use a different email or try logging in.",
                    code: "EMAIL_EXISTS"
                }, 409);
            }
            if (target.includes("username")) {
                return c.json({
                    success: false,
                    error: "Username already taken",
                    message: "This username is already in use. Please choose a different username.",
                    code: "USERNAME_EXISTS"
                }, 409);
            }
        }
        if (error.code === "P2003") {
            return c.json({
                success: false,
                error: "Invalid data",
                message: "The provided data is invalid or references non-existent records.",
                code: "INVALID_DATA"
            }, 400);
        }
        if (error.code) {
            return c.json({
                success: false,
                error: "Database error",
                message: "A database error occurred. Please try again.",
                code: error.code
            }, 500);
        }
        const errorResponse = {
            success: false,
            error: "Registration failed",
            message: "An unexpected error occurred during registration. Please try again.",
            details: error instanceof Error ? error.message : "Unknown error",
        };
        console.error("Sending error response:", JSON.stringify(errorResponse, null, 2));
        return c.json(errorResponse, 500);
    }
    finally {
        await prisma.$disconnect();
    }
};
// ============================================
// ADMIN CONTROLLERS - For approval management
// ============================================
// Get pending PWD users for admin approval
export const getPendingPWDUsersController = async (c) => {
    try {
        console.log('Fetching pending PWD users...');
        const pendingPWDUsers = await prisma.user.findMany({
            where: {
                user_type: 'pwd',
                is_approved: false,
                is_email_verified: true
            },
            select: {
                id: true,
                email: true,
                username: true,
                first_name: true,
                last_name: true,
                phone_number: true,
                pwd_id_number: true, // PWD ID photo path
                photo: true, // Profile photo
                created_at: true,
                is_email_verified: true,
                is_approved: true,
            },
            orderBy: {
                created_at: 'desc'
            }
        });
        console.log(`Found ${pendingPWDUsers.length} pending PWD users`);
        return c.json({
            success: true,
            data: pendingPWDUsers
        });
    }
    catch (error) {
        console.error("Get pending PWD users error:", error);
        return c.json({
            success: false,
            error: "Failed to fetch pending PWD users"
        }, 500);
    }
};
// Approve PWD user account
export const approvePWDUserController = async (c) => {
    try {
        const { userId } = await c.req.json();
        const adminUser = c.get('user'); // From auth middleware
        if (!userId) {
            return c.json({ error: "User ID is required" }, 400);
        }
        // Find the PWD user
        const pwdUser = await prisma.user.findUnique({
            where: { id: userId }
        });
        if (!pwdUser || pwdUser.user_type !== 'pwd') {
            return c.json({ error: "PWD user not found" }, 404);
        }
        if (pwdUser.is_approved) {
            return c.json({ error: "User already approved" }, 400);
        }
        // Update PWD user approval status
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                is_approved: true,
                is_active: true,
                approved_at: new Date(),
                approved_by: adminUser.id
            }
        });
        // Send approval notification email
        try {
            const { emailService } = await import("../../services/emailService.js");
            const userName = pwdUser.first_name || pwdUser.email.split('@')[0];
            await emailService.sendApprovalEmail(pwdUser.email, userName);
        }
        catch (emailError) {
            console.error("Failed to send approval email:", emailError);
            // Continue even if email fails
        }
        return c.json({
            success: true,
            message: "PWD user approved successfully. Approval email has been sent."
        });
    }
    catch (error) {
        console.error("Approve PWD user error:", error);
        return c.json({ error: "Failed to approve PWD user" }, 500);
    }
};
// ============================================
// UPDATE USER CONTROLLER
// ============================================
export async function updateUserController(c) {
    const id = Number(c.req.param('id'));
    if (!id) {
        return c.json({ success: false, error: 'Missing user id' }, 400);
    }
    const body = await c.req.json();
    try {
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                first_name: body.first_name,
                last_name: body.last_name,
                email: body.email,
                phone_number: body.phone_number,
                photo: body.photo,
            },
        });
        return c.json({ success: true, data: updatedUser });
    }
    catch (error) {
        console.error('Update user error:', error);
        return c.json({ success: false, error: 'Failed to update user' }, 500);
    }
}
