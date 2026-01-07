import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Organization name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    /**
     * Members with roles
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
     * Soft delete / lifecycle control
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
 * Ensure owner is always a member with OWNER role
 */
organizationSchema.pre("save", function (next) {
  const ownerExists = this.members.some(
    (m) => m.user.toString() === this.owner.toString()
  );

  if (!ownerExists) {
    this.members.push({
      user: this.owner,
      role: "OWNER",
    });
  }

  next();
});

/**
 * Prevent duplicate members
 */
organizationSchema.index(
  { _id: 1, "members.user": 1 },
  { unique: true }
);

const Organization = mongoose.model("Organization", organizationSchema);

export default Organization;
