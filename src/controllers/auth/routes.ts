import { Hono } from "hono";
import {
  userLoginController,
  createUserController,
  createEmployerController,
  getUserById,
} from "./index.js";
import { authMiddleware } from "../../utils/auth.js";

const auth = new Hono()
  .get('/users/:id', authMiddleware, getUserById)
  .post("/login", userLoginController)
  .post("/create", createUserController)
  .post("/createEmployer", createEmployerController)

export default auth;
