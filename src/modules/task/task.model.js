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
        },

        priority: {
            type: String,
            enum: Object.values(TASK_PRIORITY),
            default: TASK_PRIORITY.MEDIUM,
        },

        dueDate: {
            type: Date,
            validate: {
                validator: function (value) {
                    return !value || value > new Date();
                },
                message: "Due date must be in the future",
            },
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
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
