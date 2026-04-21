import { ApiResponse } from "../utils/apiResponse.js";
import { asynchandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/apiError.js";
import { callAI } from "../service/ai.service.js";
import Chat from "../Model/chat.model.js";

const sendMessage = asynchandler(async (req, res) => {
  const { chatId } = req.params;
  const { message } = req.body;

  if (!message?.trim()) {
    throw new APIError(400, "Message is required");
  }

  let chat;
  if (chatId) {
    chat = await Chat.findById(chatId);
    if (!chat) {
      throw new APIError(404, "Chat not found");
    }
    if (String(chat.user) !== String(req.user._id)) {
      throw new APIError(403, "You are not allowed to access this chat");
    }
  } else {
    chat = await Chat.create({
      user: req.user._id,
      title: message.trim().slice(0, 30),
      messages: [],
    });
  }

  chat.messages.push({
    role: "user",
    content: message.trim(),
  });

  const history = chat.messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  const aiReply = await callAI(history);
  chat.messages.push({
    role: "assistant",
    content: aiReply,
  });

  await chat.save();

  return res.status(200).json(
    new ApiResponse(200, "Message sent successfully", {
      chatId: chat._id,
      reply: aiReply,
      messages: chat.messages,
    })
  );
});

const getAllChats = asynchandler(async (req, res) => {
  const chats = await Chat.find({ user: req.user._id })
    .select("title _id updatedAt")
    .sort({ updatedAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, "Chats fetched successfully", chats));
});

const getChatById = asynchandler(async (req, res) => {
  const { chatId } = req.params;

  const chat = await Chat.findById(chatId);

  if (!chat) {
    throw new APIError(404, "Chat not found");
  }

  if (String(chat.user) !== String(req.user._id)) {
    throw new APIError(403, "Unauthorized access to this chat");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Chat fetched successfully", chat));
});

export { sendMessage, getAllChats, getChatById };
