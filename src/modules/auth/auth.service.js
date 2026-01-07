import User from "../user/user.model.js";
import ApiError from "../../utils/apiError.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyToken,
} from "../../utils/jwt.js";

/**
 * Register user
 */
const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw ApiError.badRequest("Email already registered");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const userObj = user.toObject();
  delete userObj.password;

  return userObj;
};

/**
 * Login user
 */
const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  const payload = {
    userId: user._id,
    role: user.role,
  };

  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  // 🔐 Store refresh token (or hash) in DB
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.refreshToken;

  return {
    user: userObj,
    accessToken,
    refreshToken,
  };
};

/**
 * Refresh access token (with rotation)
 */
const refreshAccessToken = async (refreshToken) => {
  let decoded;

  try {
    decoded = verifyToken(refreshToken);
  } catch (err) {
    throw ApiError.unauthorized("Invalid refresh token");
  }

  const user = await User.findById(decoded.userId);

  if (!user || user.refreshToken !== refreshToken) {
    throw ApiError.unauthorized("Refresh token revoked");
  }

  const payload = {
    userId: user._id,
    role: user.role,
  };

  const newAccessToken = signAccessToken(payload);
  const newRefreshToken = signRefreshToken(payload);

  // 🔁 Rotate refresh token
  user.refreshToken = newRefreshToken;
  await user.save({ validateBeforeSave: false });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

export {
  registerUser,
  loginUser,
  refreshAccessToken,
};
