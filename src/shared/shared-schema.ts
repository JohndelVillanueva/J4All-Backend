import { z } from "zod";

export const employerSignUpSchema = z
  .object({
    user: z.object({
      username: z
        .string({ required_error: "Username is required" })
        .min(3, "Username must be at least 3 characters"),
      email: z
        .string({ required_error: "Email is required" })
        .email("Invalid email format"),
      password: z
        .string({ required_error: "Password is required" })
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Must include uppercase")
        .regex(/[a-z]/, "Must include lowercase")
        .regex(/[0-9]/, "Must include number")
        .regex(/[^A-Za-z0-9]/, "Must include special character"),
      phone: z.string({ required_error: "Phone number is required" }),
      userType: z.literal("EMPLOYER"),
      firstName: z.string({ required_error: "First name is required" }),
      lastName: z.string({ required_error: "Last name is required" }),
    }),
    employer: z.object({
      companyName: z.string({ required_error: "Company name is required" }),
      contactPerson: z.string({ required_error: "Contact person is required" }),
      industry: z.string({ required_error: "Industry is required" }),
      companySize: z.enum(["1-10", "11-50", "51-200", "201-500", "501+"], {
        errorMap: () => ({ message: "Invalid company size" }),
      }),
      websiteUrl: z.string().url().optional(),
      foundedYear: z
        .number({ required_error: "Founded year is required" })
        .min(1900)
        .max(new Date().getFullYear()),
      address: z.string({ required_error: "Address is required" }),
    }),
    confirmPassword: z
      .string({ required_error: "Confirm password is required" }),
    agreeToTerms: z.literal(true, {
      errorMap: () => ({
        message: "You must agree to the terms and conditions",
      }),
    }),
  })
  .refine((data) => data.user.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  });

export type EmployerSignUpInput = z.infer<typeof employerSignUpSchema>;
