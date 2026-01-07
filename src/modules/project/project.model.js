import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true,
    },

    /**
     * Project creator
     */
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    /**
     * Project members & roles
     */
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: String,
          enum: ["OWNER", "ADMIN", "MEMBER"],
          default: "MEMBER",
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    /**
     * Project lifecycle
     */
    status: {
      type: String,
      enum: ["ACTIVE", "ARCHIVED"],
      default: "ACTIVE",
      index: true,
    },

    /**
     * Soft delete
     */
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Ensure creator is project OWNER
 */
projectSchema.pre("save", function (next) {
  if (!this.members.length) {
    this.members.push({
      user: this.createdBy,
      role: "OWNER",
    });
  }
  next();
});

/**
 * Prevent duplicate project names per organization
 */
projectSchema.index(
  { organization: 1, name: 1 },
  { unique: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
