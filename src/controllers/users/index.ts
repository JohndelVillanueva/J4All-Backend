import { type Context } from "hono";
import bcrypt from "bcryptjs";
import { z } from "zod"; // For validation
import { prisma } from "../../db.js";
import { checkRateLimit } from "../../utils/rate-limit.js";
import { generateToken, verifyPassword } from '../../utils/auth.js'; // Assuming you have an auth utility for token generation
import crypto from "crypto";
import { PhotoService } from "../../services/photoService.js";

// User creation schema
 // ✅ Updated validation schema
 const CreateUserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  user_type: z.enum(["pwd", "general", "employer"]),
  first_name: z.string().min(2).optional(),
  last_name: z.string().min(2).optional(),
  phone_number: z.string().regex(/^\+?[0-9\s-]+$/).optional(),
  pwd_id_number: z.string().optional(),
}).refine((data) => {
  if (data.user_type === "pwd") {
    return !!data.pwd_id_number && data.pwd_id_number.trim().length > 0;
  }
  return true;
}, {
  message: "PWD ID Number is required for PWD users",
  path: ["pwd_id_number"],
});
interface UserResponse {
  id: number;
  email: string;
  user_type: string;
  first_name: string | null;
  last_name: string | null;
  is_active?: boolean;
}
interface LoginRequest {
  email: string;
  password: string;
  userType?: string; // Made optional for better UX
}

// export const userLoginController = async (c: Context): Promise<Response> => {
//   // const prisma = new PrismaClient();

//   try {
//     // Validate request body
//     const { email, password, userType }: LoginRequest = await c.req.json();

//     if (!email || !password) {
//       return c.json(
//         {
//           success: false,
//           error: "Email and password are required",
//         },
//         400
//       );
//     }

//     // Find user with case-insensitive email
//     const user = await prisma.user.findUnique({
//       where: {
//         email: email.toLowerCase(),
//       },
//     });

//     // Generic error message for security (don't reveal if user exists)
//     const invalidCredentials = {
//       success: false,
//       error: "Invalid email or password",
//       message: "The email or password you entered is incorrect. Please check your credentials and try again.",
//       code: "INVALID_CREDENTIALS"
//     };

//     if (!user) {
//       return c.json(invalidCredentials, 401);
//     }

//     // Verify password first to prevent timing attacks
//     const isValid = await verifyPassword(password, user.password_hash);
//     if (!isValid) {
//       return c.json(invalidCredentials, 401);
//     }

//     // Optional: Check user type if provided
//     if (userType && user.user_type !== userType.toLowerCase()) {
//       return c.json(
//         {
//           success: false,
//           error: `This account is not registered as ${userType}`,
//           message: `This email is registered as a ${user.user_type} account, not as ${userType}. Please use the correct login form.`,
//           code: "WRONG_USER_TYPE"
//         },
//         403
//       );
//     }

//     // Check if account is verified (if your app has email verification)
//     if (user.is_active === false) {
//       return c.json(
//         {
//           success: false,
//           error: "Account not verified",
//           message: "Your account has not been verified. Please check your email and click the verification link before logging in.",
//           requiresVerification: true,
//           code: "ACCOUNT_NOT_VERIFIED"
//         },
//         403
//       );
//     }

//     // Generate token with additional security claims
//     const token = generateToken({
//       userId: user.id,
//       email: user.email,
//       userType: user.user_type,
//     });

//     // Construct safe user response (exclude sensitive fields)
//     const userResponse: UserResponse = {
//       id: user.id,
//       email: user.email,
//       user_type: user.user_type,
//       first_name: user.first_name,
//       last_name: user.last_name,
//       // Include only if your app uses verification
//       ...(user.is_active !== undefined && { is_verified: user.is_active }),
//     };

//     return c.json({
//       success: true,
//       message: "Login successful",
//       token,
//       user: userResponse,
//       // Include token expiration info
//       expiresIn: "7d", // Should match your token generation
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     return c.json(
//       {
//         success: false,
//         error: "Login failed",
//         message: "An unexpected error occurred during login. Please try again.",
//         details: error instanceof Error ? error.message : "Unknown error",
//       },
//       500
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// };


export const createUserController = async (c: Context) => {
  try {
    let rawData: any;
    let photoFile: File | null = null;

    // Detect content type
    const contentType = c.req.header('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      // Handle FormData
      const formData = await c.req.formData();
      rawData = {};
      for (const [key, value] of formData.entries()) {
        if (key === 'photo' && value instanceof File) {
          photoFile = value;
        } else {
          rawData[key] = value;
        }
      }
    } else {
      // Handle JSON
      rawData = await c.req.json();
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
    const normalizedEmail = userData.email.toLowerCase();

    // 3. Check password strength
    try {
      const { default: zxcvbn } = await import("zxcvbn");
      const passwordStrength = zxcvbn(userData.password);
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
    }

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
    const user = await prisma.$transaction(async (tx: any) => {
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
          pwd_id_number: userData.user_type !== "employer" ? userData.pwd_id_number : null, // ✅ Always set for jobseekers
          is_active: userData.user_type === "employer" ? true : false,
        },
      });
      console.log(`User created successfully: ${createdUser.id}`);

      return createdUser;
    });

    // Save photo if present
    if (photoFile) {
      console.log('[createUserController] photoFile:', photoFile, 'type:', typeof photoFile, 'name:', photoFile.name, 'size:', photoFile.size);
      await PhotoService.updateUserPhoto(user.id, photoFile, photoFile.name);
    }

    // 6. Create email verification token and send email
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
      const emailSent = await emailService.sendVerificationEmail(
        user.email,
        userName,
        verificationToken
      );

      if (!emailSent && process.env.NODE_ENV === 'development') {
        const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const verificationUrl = `${baseUrl}/verify-email?token=${verificationToken}`;
        sendDevelopmentEmail(
          user.email,
          'Verify Your J4IPWDs Account',
          `Click this link to verify your account: ${verificationUrl}`,
          `Click this link to verify your account: ${verificationUrl}`
        );
      }
    } catch (tokenError) {
      console.error("Error creating verification token or sending email:", tokenError);
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
        pwd_id_number: user.pwd_id_number, // ✅ include in response
        phone_number: user.phone_number,
        created_at: user.created_at,
      },
    };
    console.log("Sending response:", JSON.stringify(response, null, 2));
    return c.json(response, 201);
  } catch (error: unknown) {
    console.error("Detailed error:", error);

    if ((error as any).code === "P2002") {
      const target = (error as any).meta?.target as string[];
      if (target.includes("email")) {
        return c.json(
          {
            success: false,
            error: "Email already exists",
            message: "This email address is already registered. Please use a different email or try logging in.",
            code: "EMAIL_EXISTS"
          },
          409
        );
      }
      if (target.includes("username")) {
        return c.json(
          {
            success: false,
            error: "Username already taken",
            message: "This username is already in use. Please choose a different username.",
            code: "USERNAME_EXISTS"
          },
          409
        );
      }
    }

    if ((error as any).code === "P2003") {
      return c.json(
        {
          success: false,
          error: "Invalid data",
          message: "The provided data is invalid or references non-existent records.",
          code: "INVALID_DATA"
        },
        400
      );
    }

    if ((error as any).code) {
      return c.json(
        {
          success: false,
          error: "Database error",
          message: "A database error occurred. Please try again.",
          code: (error as any).code
        },
        500
      );
    }

    const errorResponse = {
      success: false,
      error: "Registration failed",
      message: "An unexpected error occurred during registration. Please try again.",
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




export async function updateUserController(c: Context) {
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
  } catch (error) {
    console.error('Update user error:', error);
    return c.json({ success: false, error: 'Failed to update user' }, 500);
  }
}

export const getStatsController = async (c: Context): Promise<Response> => {
  try {
    // Fetch all statistics in parallel for better performance
    const [
      activeUsersCount,
      jobListingsCount,
      partnerEmployersCount
    ] = await Promise.all([
      // Count active users (PWD and general users, excluding employers)
      prisma.user.count({
        where: {
          user_type: {
            in: ["pwd", "general", "employer"]
          },
          is_active: true
        }
      }),
      
      // Count job listings (assuming you have a Job table)
      // Replace 'job' with your actual table name if different
      prisma.jobListing.count({
        where: {
          // Add any filters for active/published jobs if needed
          // status: 'active' or similar
        }
      }).catch(() => 0), // Return 0 if job table doesn't exist yet
      
      // Count employers
      prisma.user.count({
        where: {
          user_type: "employer",
          is_active: true
        }
      })
    ]);

    // Format numbers for display (e.g., 1000 -> "1,000+")
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
          formatted: formatStat(activeUsersCount)
        },
        jobListings: {
          count: jobListingsCount,
          formatted: formatStat(jobListingsCount)
        },
        partnerEmployers: {
          count: partnerEmployersCount,
          formatted: formatStat(partnerEmployersCount)
        }
      }
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return c.json(
      {
        success: false,
        error: "Failed to fetch statistics",
        message: "An error occurred while retrieving platform statistics.",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      500
    );
  } finally {
    await prisma.$disconnect();
  }
};
               
