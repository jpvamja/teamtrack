import mongoose from "mongoose";

const TASK_STATUS = ["TODO", "IN_PROGRESS", "DONE"];
const TASK_PRIORITY = ["LOW", "MEDIUM", "HIGH"];

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Task title is required"],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            enum: TASK_STATUS,
            default: "TODO",
        },
        priority: {
            type: String,
            enum: TASK_PRIORITY,
            default: "MEDIUM",
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
