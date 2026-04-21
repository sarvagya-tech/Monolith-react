import { asynchandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import User from "../Model/user.model.js";
import { APIError } from "../utils/apiError.js";

const verifyJwt = asynchandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "").trim();

  if (!token) {
    throw new APIError(401, "Access token is required");
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch {
    throw new APIError(401, "Invalid or expired access token");
  }

  const user = await User.findById(decodedToken._id).select("-password -refreshToken");
  if (!user) {
    throw new APIError(401, "User not found for this token");
  }

  req.user = user;
  next();
});

export { verifyJwt };
