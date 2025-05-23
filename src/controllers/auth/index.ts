import { type Context } from "hono";
import bcrypt, { hash } from "bcryptjs";
import { z } from "zod"; // For validation
import { PrismaClient, Prisma } from "@prisma/client";
import { checkRateLimit } from "../../utils/rate-limit.js";
import { generateToken, verifyPassword } from "../../utils/auth.js"; // Assuming you have an auth utility for token generation
import crypto from "crypto";
// import zxcvbn from "zxcvbn";
// import { HTTPException } from "hono/http-exception";

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

// Initialize Prisma client once (recommended to put this in a separate file)
const prisma = new PrismaClient();

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

const employerSignUpSchema = z
  .object({
    // Required fields matching the employers table
    companyName: z
      .string()
      .min(1, "Company name is required")
      .max(100, "Company name too long"),

    contactPerson: z
      .string()
      .min(1, "Contact person is required")
      .max(100, "Name too long"),

    email: z.string().email("Invalid email format").max(100, "Email too long"),

    phone: z
      .string()
      .min(10, "Phone must be at least 10 digits")
      .max(15, "Phone number too long"),

    // address → company_description in DB
    address: z
      .string()
      .min(5, "Address too short (min 5 chars)")
      .max(500, "Address too long (max 500 chars)"),

    industry: z
      .string()
      .min(1, "Industry is required")
      .max(100, "Industry name too long"),

    // Password fields (not stored in employers table but in users table)
    password: z
      .string()
      .min(8, "Password must be 8+ characters")
      .regex(/[A-Z]/, "Must contain uppercase letter")
      .regex(/[a-z]/, "Must contain lowercase letter")
      .regex(/[0-9]/, "Must contain number"),

    confirmPassword: z.string(),

    // Optional fields with defaults from DB schema
    companySize: z
      .enum(["1-10", "11-50", "51-200", "201-500", "501+"])
      .default("1-10"),

    websiteUrl: z
      .string()
      .url("Invalid website URL")
      .max(200, "URL too long")
      .optional()
      .or(z.literal("")),

    foundedYear: z
      .number()
      .min(1900, "Year must be ≥ 1900")
      .max(new Date().getFullYear(), "Can't be in future")
      .default(new Date().getFullYear()),

    // Required for form submission
    agreeToTerms: z.literal(true, {
      errorMap: () => ({ message: "You must accept terms" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });


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
  is_active?: boolean;
}

export const userLoginController = async (c: Context): Promise<Response> => {
  // const prisma = new PrismaClient();

  try {
    // Validate request body
    const { email, password, userType }: LoginRequest = await c.req.json();

    if (!email || !password) {
      return c.json(
        {
          success: false,
          error: "Email and password are required",
        },
        400
      );
    }

    // Find user with case-insensitive email
    const user = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    // Generic error message for security (don't reveal if user exists)
    const invalidCredentials = {
      success: false,
      error: "Invalid email or password",
    };

    if (!user) {
      return c.json(invalidCredentials, 401);
    }

    // Verify password first to prevent timing attacks
    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) {
      return c.json(invalidCredentials, 401);
    }

    // Optional: Check user type if provided
    if (userType && user.user_type !== userType.toLowerCase()) {
      return c.json(
        {
          success: false,
          error: `This account is not registered as ${userType}`,
        },
        403
      );
    }

    // Check if account is verified (if your app has email verification)
    if (user.is_active === false) {
      return c.json(
        {
          success: false,
          error: "Account not verified. Please check your email.",
          requiresVerification: true,
        },
        403
      );
    }

    // Generate token with additional security claims
    const token = generateToken({
      id: user.id,
      email: user.email,
      userType: user.user_type,
    });

    // Construct safe user response (exclude sensitive fields)
    const userResponse: UserResponse = {
      id: user.id,
      email: user.email,
      user_type: user.user_type,
      first_name: user.first_name,
      last_name: user.last_name,
      // Include only if your app uses verification
      ...(user.is_active !== undefined && { is_verified: user.is_active }),
    };

    return c.json({
      success: true,
      message: "Login successful",
      token,
      user: userResponse,
      // Include token expiration info
      expiresIn: "7d", // Should match your token generation
    });
  } catch (error) {
    console.error("Login error:", error);
    return c.json(
      {
        success: false,
        error: "Internal server error",
      },
      500
    );
  } finally {
    await prisma.$disconnect();
  }
};

export const createUserController = async (c: Context) => {
  // const prisma = new PrismaClient();
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

export const createEmployerController = async (c: Context) => {
  console.log('createEmployerController called');
  
  try {
    const rawData = await c.req.json();
    
    // Map and flatten the request body to match the Zod schema
    const mergedData = {
      companyName: rawData.employer?.companyName,
      contactPerson: `${rawData.user?.firstName} ${rawData.user?.lastName}`.trim(),
      email: rawData.user?.email,
      phone: rawData.user?.phone,
      address: rawData.employer?.address || rawData.employer?.companyAddress, // Fixed: use address field, not companyDescription
      industry: rawData.employer?.industry,
      password: rawData.user?.password,
      confirmPassword: rawData.user?.confirmPassword,
      companySize: rawData.employer?.companySize,
      websiteUrl: rawData.employer?.websiteUrl,
      foundedYear: rawData.employer?.foundedYear,
      agreeToTerms: rawData.agreeToTerms
    };
    
    // 1. Validate with Zod schema
    const validation = employerSignUpSchema.safeParse(mergedData);
    
    if (!validation.success) {
      return c.json({
        success: false,
        errors: validation.error.flatten()
      }, 400);
    }
    
    const {
      email,
      password,
      companyName,
      contactPerson,
      address,
      industry,
      companySize,
      websiteUrl,
      foundedYear
    } = validation.data;
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });
    
    if (existingUser) {
      return c.json({
        success: false,
        error: "Email already in use"
      }, 409);
    }
    
    // Create user and employer in transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create user
      const userRecord = await tx.user.create({
        data: {
          email: email.toLowerCase(),
          username: email.split('@')[0],
          password_hash: await hash(password, 12),
          first_name: rawData.user?.firstName || null,
          last_name: rawData.user?.lastName || null,
          phone_number: rawData.user?.phone || null,
          user_type: "employer",
          is_active: true,
          created_at: new Date(),
        }
      });
      
      // Create employer
      const employerRecord = await tx.employer.create({
        data: {
          user_id: userRecord.id,
          company_name: companyName,
          company_description: address || null, // Using address for company_description
          industry,
          company_size: companySize,
          website_url: websiteUrl || null,
          founded_year: foundedYear || null,
          logo_path: null,
          contact_person: contactPerson, // Fixed: uncommented this field
        }
      });
      
      return { userRecord, employerRecord };
    });
    
    return c.json({
      success: true,
      data: {
        user: {
          id: result.userRecord.id,
          email: result.userRecord.email
        },
        employer: {
          id: result.employerRecord.id,
          companyName: result.employerRecord.company_name
        }
      }
    }, 201);
    
  } catch (error) {
    return handleError(c, error);
  }
};
