import { Hono } from "hono";
import {
//   deleteUserController,
//   getUserController,
//   updateUserController,
  createUserController,
  userLoginController,
  // createEmployerController,
} from "./index.js";

const router = new Hono()

  .post("/login", userLoginController)
  .post("/create", createUserController)
  // .post("/createEmployer", createEmployerController);
// .get('/users/:id', getUserController)
// .delete('/users/:id', deleteUserController)
// .put('/users/:id', updateUserController)

export default router;
