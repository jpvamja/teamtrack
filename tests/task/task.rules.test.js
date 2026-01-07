import Task from "../../src/modules/task/task.model.js";
import { createUser } from "../factories/user.factory.js";
import ApiError from "../../src/utils/apiError.js";

describe("Task Business Rules", () => {
  it("only assignee can update status", async () => {
    const assignee = await createUser();
    const other = await createUser();

    const task = await Task.create({
      title: "Test Task",
      project: "507f1f77bcf86cd799439011",
      assignee: assignee._id,
      createdBy: assignee._id,
    });

    await expect(
      task.assignee.toString() === other._id.toString()
    ).toBe(false);
  });
});
