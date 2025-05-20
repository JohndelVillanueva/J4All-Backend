
// Import all your dependencies
import { type Context } from "hono";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { PrismaClient, type Prisma } from "@prisma/client";
import { checkRateLimit } from "./rate-limit.js";
import { generateToken, verifyPassword } from "./auth.js";
import crypto from "crypto";

// Create prisma instance
const prisma = new PrismaClient();

// Export everything
export {
  bcrypt,
  z,
  PrismaClient,
  checkRateLimit,
  generateToken,
  verifyPassword,
  crypto,
  prisma
};

export type { Prisma };

// You can also export types separately if needed
export type { Context };