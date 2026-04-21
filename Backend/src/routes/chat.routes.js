import { Router } from "express";
import { sendMessage, getAllChats, getChatById } from "../controller/chat.controller.js";
import { verifyJwt } from "../middleware/Auth.middleware.js";

const chatRouter = Router();

chatRouter.post("/", verifyJwt, sendMessage);
chatRouter.post("/:chatId", verifyJwt, sendMessage);
chatRouter.get("/", verifyJwt, getAllChats);
chatRouter.get("/:chatId", verifyJwt, getChatById);

export default chatRouter;
