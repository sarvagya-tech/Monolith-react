import { APIError } from "../utils/apiError.js";
import { asynchandler } from "../utils/asyncHandler.js";
import User from "../Model/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";

const generateAccessTokenAndRefreshToken = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new APIError(404, "User not found with this id");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

const registerUser = asynchandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname?.trim()) {
    throw new APIError(400, "Fullname is required");
  }
  if (!email?.trim()) {
    throw new APIError(400, "Email is required");
  }
  if (!password) {
    throw new APIError(400, "Password is required");
  }

  const existedUser = await User.findOne({ email: email.toLowerCase() });
  if (existedUser) {
    throw new APIError(409, "User already exists with this email");
  }

  const user = await User.create({
    fullname,
    email: email.toLowerCase(),
    password,
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");
  if (!createdUser) {
    throw new APIError(500, "User not found after creation");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully", createdUser));
});

const loginUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email?.trim()) {
    throw new APIError(400, "Email is required");
  }
  if (!password) {
    throw new APIError(400, "Password is required");
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw new APIError(404, "User not found with this email");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new APIError(401, "Invalid password");
  }

  const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);
  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, "User logged in successfully", {
        user: loggedInUser,
        accessToken,
        refreshToken,
      })
    );
});

const logoutUser = asynchandler(async (req, res) => {
  if (req.user?._id) {
    await User.findByIdAndUpdate(
      req.user._id,
      { $unset: { refreshToken: 1 } },
      { new: true }
    );
  }

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "User logged out", {}));
});

const getCurrentUser = asynchandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, "Current user fetched successfully", req.user));
});

export { registerUser, loginUser, logoutUser, getCurrentUser };
