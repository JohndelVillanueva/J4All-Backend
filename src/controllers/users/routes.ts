import { Hono } from "hono";
import { approvePWDUserController, createUserController, getPendingPWDUsersController, updateUserController } from "./index.js";
import { getEmployerByUserId, updateEmployerByUserId } from "./employerController.js";
import { getJobSeekerByUserId, updateJobSeekerByUserId } from "./jobSeekerController.js";
import { userLoginController } from "../auth/index.js";

// Create the router with a base path
const userRouter = new Hono()
  .post("/login", userLoginController)
  .post("/create", createUserController)
  .put("/users/:id", updateUserController)
  // // Stats endpoint
  // .get("/stats", getStatsController)
  // Employer endpoints
  .get('/employer/:userId', getEmployerByUserId)
  .put('/employer/:userId', updateEmployerByUserId)
  // JobSeeker endpoints
  .get('/jobseeker/:userId', getJobSeekerByUserId)
  .put('/jobseeker/:userId', updateJobSeekerByUserId)



// Export as named export to match the import in routes.js
export { userRouter };

// Also keep default export for compatibility
export default userRouter;