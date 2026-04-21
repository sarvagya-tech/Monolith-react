import { Router } from "express";
import { registerUser, loginUser, logoutUser, getCurrentUser } from "../controller/user.controller.js";
import { verifyJwt } from "../middleware/Auth.middleware.js";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", verifyJwt, logoutUser);
userRouter.get("/me", verifyJwt, getCurrentUser);

export default userRouter;
