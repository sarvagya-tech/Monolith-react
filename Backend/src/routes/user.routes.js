import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../controller/user.controller.js";
import { verifyJwt, optionalVerifyJwt } from "../middleware/Auth.middleware.js";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", optionalVerifyJwt, logoutUser);
userRouter.get("/me", verifyJwt, getCurrentUser);

export default userRouter;
