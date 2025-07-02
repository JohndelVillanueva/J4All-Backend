import { Hono } from "hono";
// import {

// } from "./index.js";
import  { applyForJobController, getUserApplicationsController, getEmployerApplicantsController, saveJobController, unsaveJobController, getSavedJobsController } from "./index.js";
import { authMiddleware } from "../../utils/auth.js";

const applicant = new Hono()
  .post('/job-applications', applyForJobController)
  .get('/applications', authMiddleware, getUserApplicationsController)
  .get('/employer-applicants', authMiddleware, getEmployerApplicantsController)
  .post('/save-job', authMiddleware, saveJobController)
  .delete('/unsave-job', authMiddleware, unsaveJobController)
  .get('/saved-jobs', authMiddleware, getSavedJobsController)
//   .post("/login", userLoginController)
//   .post("/create", createUserController)
//   .post("/createEmployer", createEmployerController)

export default applicant;
