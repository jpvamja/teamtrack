import mongoose from "mongoose";

/**
 * Check if value is a valid MongoDB ObjectId
 */
export const isValidObjectId = (id) => {
  if (!id || typeof id !== "string") {
    return false;
  }

  return mongoose.Types.ObjectId.isValid(id);
};
