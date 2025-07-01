import { Hono } from "hono";
// import {

// } from "./index.js";
import  { applyForJobController } from "./index.js";
import { authMiddleware } from "../../utils/auth.js";

const applicant = new Hono()
  .post('/job-applications', applyForJobController)
//   .post("/login", userLoginController)
//   .post("/create", createUserController)
//   .post("/createEmployer", createEmployerController)

export default applicant;
