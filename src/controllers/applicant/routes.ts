import { Hono } from "hono";
// import {

// } from "./index.js";
import  { getJobPostingsController } from "../jobPosting/index.js";
import { authMiddleware } from "../../utils/auth.js";

const applicant = new Hono()
  .get('/getAllJob', getJobPostingsController)
//   .post("/login", userLoginController)
//   .post("/create", createUserController)
//   .post("/createEmployer", createEmployerController)

export default applicant;
