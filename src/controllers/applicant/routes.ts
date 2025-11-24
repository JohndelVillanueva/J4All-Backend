import { Hono } from "hono";
import { 
  applyForJobController, 
  getUserApplicationsController, 
  getEmployerApplicantsController, 
  saveJobController, 
  unsaveJobController, 
  getSavedJobsController, 
  updateApplicationStatusController, 
  getApplicationDetailsController, 
  getApplicantProfileController, 
  checkSavedJobController 
} from "./index.js";
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
  // FIX: Remove '/api/' prefix - it's already in the base path
  .get('/check-saved-job/:jobId', authMiddleware, checkSavedJobController);

export default applicant;