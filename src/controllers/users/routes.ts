import { Hono } from "hono";
import {
  updateUserController,
  createUserController,
  userLoginController,
} from "./index.js";
import { getEmployerByUserId, updateEmployerByUserId } from "./employerController.js";
import { getJobSeekerByUserId, updateJobSeekerByUserId } from "./jobSeekerController.js";

const router = new Hono()
  .post("/login", userLoginController)
  .post("/create", createUserController)
  .put("/users/:id", updateUserController)
  // Employer endpoints
  .get('/employer/:userId', getEmployerByUserId)
  .put('/employer/:userId', updateEmployerByUserId)
  // JobSeeker endpoints
  .get('/jobseeker/:userId', getJobSeekerByUserId)
  .put('/jobseeker/:userId', updateJobSeekerByUserId);

export default router;
