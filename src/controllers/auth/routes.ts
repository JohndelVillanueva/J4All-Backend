import { Hono } from "hono";
import {
  userLoginController,
  createEmployerController,
  getUserById,
} from "./index.js";
import { authMiddleware } from "../../utils/auth.js";

const auth = new Hono()
  .get('/users/:id', authMiddleware, getUserById)
  .post("/login", userLoginController)
  .post("/createEmployer", createEmployerController)

export default auth;
