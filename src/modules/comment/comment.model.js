import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Comment content is required"],
      trim: true,
      minlength: 1,
      maxlength: 1000,
    },

    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
      index: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    /**
     * Edit & lifecycle tracking
     */
    isEdited: {
      type: Boolean,
      default: false,
    },

    editedAt: {
      type: Date,
    },

    /**
     * Soft delete
     */
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Track edits automatically
 */
commentSchema.pre("save", function (next) {
  if (!this.isModified("content")) return next();

  if (!this.isNew) {
    this.isEdited = true;
    this.editedAt = new Date();
  }

  next();
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
