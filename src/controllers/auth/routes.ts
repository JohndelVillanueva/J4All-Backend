import { Hono } from "hono";
import {
  userLoginController,
  createUserController,
  createEmployerController,
} from "./index.js";

const auth = new Hono()
  .post("/login", userLoginController)
  .post("/create", createUserController)
  .post("/createEmployer", createEmployerController)

export default auth;
