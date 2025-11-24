import { Hono } from "hono";
// import {

// } from "./index.js";
import  { applyForJobController, getUserApplicationsController, getEmployerApplicantsController, saveJobController, unsaveJobController, getSavedJobsController, updateApplicationStatusController, getApplicationDetailsController, getApplicantProfileController, checkSavedJobController } from "./index.js";
import { authMiddleware } from "../../utils/auth.js";

const applicant = new Hono()
  .post('/job-applications', applyForJobController)
  .patch('/job-applications/:id/status', authMiddleware, updateApplicationStatusController)
  .get('/applications', authMiddleware, getUserApplicationsController)
  .get('/applications/:id', getApplicationDetailsController)
  .get('/employer-applicants', authMiddleware, getEmployerApplicantsController)
  .get('/applicant-profile', authMiddleware, getApplicantProfileController)
  .post('/save-job', authMiddleware, saveJobController)
  .delete('/unsave-job', authMiddleware, unsaveJobController)
  .get('/saved-jobs', authMiddleware, getSavedJobsController)
  .get('/api/check-saved-job/:jobId', checkSavedJobController);
//   .post("/login", userLoginController)
//   .post("/create", createUserController)
//   .post("/createEmployer", createEmployerController)

export default applicant;
