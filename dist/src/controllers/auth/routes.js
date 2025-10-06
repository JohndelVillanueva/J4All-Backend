import { Hono } from "hono";
import { userLoginController, createEmployerController, getUserById, verifyEmailController, resendVerificationController, testEmailController, forgotPasswordController, resetPasswordController, validateResetTokenController } from "./index.js";
import { authMiddleware } from "../../utils/auth.js";
const auth = new Hono()
    .get('/users/:id', authMiddleware, getUserById)
    .post("/login", userLoginController)
    .post("/createEmployer", createEmployerController)
    .post("/verify-email", verifyEmailController)
    .post("/resend-verification", resendVerificationController)
    .post("/forgot-password", forgotPasswordController)
    .get("/test-email", testEmailController)
    .get("/validate-reset-token", validateResetTokenController) // To verify token validity
    .post("/reset-password", resetPasswordController);
export default auth;
