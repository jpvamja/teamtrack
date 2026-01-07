import Task from "./task.model.js";
import Project from "../project/project.model.js";
import Organization from "../organization/organization.model.js";
import ApiError from "../../utils/apiError.js";
import { isValidObjectId } from "../../utils/objectId.js";
import { TASK_STATUS } from "../../config/constants.js";

/**
 * Allowed task status transitions
 */
const VALID_TRANSITIONS = {
  [TASK_STATUS.TODO]: [TASK_STATUS.IN_PROGRESS],
  [TASK_STATUS.IN_PROGRESS]: [TASK_STATUS.DONE],
  [TASK_STATUS.DONE]: [],
};

/**
 * Create task (PROJECT MEMBER)
 */
const createTask = async ({
  title,
  description,
  priority,
  dueDate,
  projectId,
  assigneeId,
  userId,
}) => {
  if (!isValidObjectId(projectId)) {
    throw ApiError.badRequest("Invalid project ID");
  }

  const project = await Project.findById(projectId)
    .populate("organization")
    .populate("members.user");

  if (!project || project.status !== "ACTIVE") {
    throw ApiError.notFound("Project not found");
  }

  const projectMember = project.members.find(
    (m) => m.user._id.toString() === userId
  );

  if (!projectMember) {
    throw ApiError.forbidden("You are not a project member");
  }

  if (assigneeId) {
    const validAssignee = project.members.some(
      (m) => m.user._id.toString() === assigneeId
    );

    if (!validAssignee) {
      throw ApiError.badRequest(
        "Assignee must be a project member"
      );
    }
  }

  return Task.create({
    title,
    description,
    priority,
    dueDate,
    project: projectId,
    assignee: assigneeId,
    createdBy: userId,
  });
};

/**
 * Get task by ID (PROJECT MEMBER)
 */
const getTaskById = async ({ taskId, userId }) => {
  if (!isValidObjectId(taskId)) {
    throw ApiError.badRequest("Invalid task ID");
  }

  const task = await Task.findOne({
    _id: taskId,
    isActive: true,
  })
    .populate({
      path: "project",
      populate: { path: "members.user" },
    })
    .populate("assignee", "name email");

  if (!task) {
    throw ApiError.notFound("Task not found");
  }

  const isProjectMember = task.project.members.some(
    (m) => m.user._id.toString() === userId
  );

  if (!isProjectMember) {
    throw ApiError.forbidden("Access denied");
  }

  return task;
};

/**
 * Update task
 */
const updateTask = async ({ taskId, updates, userId }) => {
  if (!isValidObjectId(taskId)) {
    throw ApiError.badRequest("Invalid task ID");
  }

  const task = await Task.findOne({
    _id: taskId,
    isActive: true,
  }).populate({
    path: "project",
    populate: { path: "members.user" },
  });

  if (!task) {
    throw ApiError.notFound("Task not found");
  }

  const member = task.project.members.find(
    (m) => m.user._id.toString() === userId
  );

  if (!member) {
    throw ApiError.forbidden("Access denied");
  }

  // Status update → assignee only
  if (updates.status) {
    if (task.assignee?.toString() !== userId) {
      throw ApiError.forbidden(
        "Only assignee can update task status"
      );
    }

    const allowed = VALID_TRANSITIONS[task.status];
    if (!allowed.includes(updates.status)) {
      throw ApiError.badRequest("Invalid status transition");
    }
  }

  // Reassign → PROJECT ADMIN / OWNER
  if (updates.assigneeId) {
    if (!["OWNER", "ADMIN"].includes(member.role)) {
      throw ApiError.forbidden(
        "Only project ADMIN or OWNER can reassign tasks"
      );
    }

    const validAssignee = task.project.members.some(
      (m) => m.user._id.toString() === updates.assigneeId
    );

    if (!validAssignee) {
      throw ApiError.badRequest(
        "Assignee must be a project member"
      );
    }

    task.assignee = updates.assigneeId;
    delete updates.assigneeId;
  }

  Object.assign(task, updates);
  await task.save();

  return task;
};

/**
 * Delete task (soft delete)
 */
const deleteTask = async ({ taskId, userId }) => {
  if (!isValidObjectId(taskId)) {
    throw ApiError.badRequest("Invalid task ID");
  }

  const task = await Task.findOne({
    _id: taskId,
    isActive: true,
  }).populate({
    path: "project",
    populate: { path: "members.user" },
  });

  if (!task) {
    throw ApiError.notFound("Task not found");
  }

  const member = task.project.members.find(
    (m) => m.user._id.toString() === userId
  );

  if (!member || !["OWNER", "ADMIN"].includes(member.role)) {
    throw ApiError.forbidden(
      "Only project ADMIN or OWNER can delete tasks"
    );
  }

  task.isActive = false;
  await task.save();
};

export {
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
};
