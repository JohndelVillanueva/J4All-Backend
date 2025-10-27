import { Hono } from "hono";
import { userLoginController, createEmployerController, getUserById, verifyEmailController, resendVerificationController, testEmailController, forgotPasswordController, resetPasswordController, validateResetTokenController, getStatsController, getPendingEmployersController, approveEmployerController, } from "./index.js";
import { authMiddleware } from "../../utils/auth.js";
const auth = new Hono()
    .get("/stats", getStatsController)
    .get('/users/:id', authMiddleware, getUserById)
    .post("/login", userLoginController)
    .post("/createEmployer", createEmployerController)
    .post("/verify-email", verifyEmailController)
    .post("/resend-verification", resendVerificationController)
    .post("/forgot-password", forgotPasswordController)
    .get("/test-email", testEmailController)
    .get("/validate-reset-token", validateResetTokenController) // To verify token validity
    .post("/reset-password", resetPasswordController)
    .get("/admin/pending-employers", authMiddleware, getPendingEmployersController)
    .post("/admin/approve-employer", authMiddleware, approveEmployerController);
export default auth;
