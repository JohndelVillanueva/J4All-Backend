// Import all your dependencies
import {} from "hono";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { checkRateLimit } from "./rate-limit.js";
import { generateToken, verifyPassword } from "./auth.js";
import crypto from "crypto";
// Create prisma instance
const prisma = new PrismaClient();
// Export everything
export { bcrypt, z, PrismaClient, checkRateLimit, generateToken, verifyPassword, crypto, prisma };
