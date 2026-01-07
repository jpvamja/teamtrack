import mongoose from "mongoose";
import { TASK_STATUS, TASK_PRIORITY } from "../../config/constants.js";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      minlength: 2,
      maxlength: 200,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    status: {
      type: String,
      enum: Object.values(TASK_STATUS),
      default: TASK_STATUS.TODO,
      index: true,
    },

    priority: {
      type: String,
      enum: Object.values(TASK_PRIORITY),
      default: TASK_PRIORITY.MEDIUM,
      index: true,
    },

    dueDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return !value || value > new Date();
        },
        message: "Due date must be in the future",
      },
      index: true,
    },

    /**
     * Kanban ordering inside a status column
     */
    position: {
      type: Number,
      default: 0,
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true,
    },

    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    /**
     * Soft delete / lifecycle control
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
 * Prevent invalid status transitions (basic safeguard)
 * Advanced rules should live in service layer
 */
taskSchema.pre("save", function (next) {
  if (!this.isModified("status")) return next();

  const allowedTransitions = {
    TODO: ["IN_PROGRESS"],
    IN_PROGRESS: ["DONE", "TODO"],
    DONE: [],
  };

  if (
    this.isNew ||
    allowedTransitions[this.status]?.includes(this.$locals.previousStatus)
  ) {
    return next();
  }

  next(
    new Error(
      `Invalid status transition to ${this.status}`
    )
  );
});

/**
 * Track previous status for transition validation
 */
taskSchema.pre("init", function (doc) {
  this.$locals = { previousStatus: doc.status };
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
