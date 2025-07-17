import { Hono } from "hono";
import {
//   deleteUserController,
//   getUserController,
//   updateUserController,
  createUserController,
  userLoginController,
  // createEmployerController,
  getEmployerByUserId,
  getJobSeekerByUserId,
} from "./index.js";

const router = new Hono()

  .post("/login", userLoginController)
  .post("/create", createUserController)
  // .post("/createEmployer", createEmployerController);
  .get('/employer-by-user/:userId', getEmployerByUserId)
  .get('/jobseeker-by-user/:userId', getJobSeekerByUserId);
// .get('/users/:id', getUserController)
// .delete('/users/:id', deleteUserController)
// .put('/users/:id', updateUserController)

export default router;
