import validate from "../middlewares/validator.middleware.js";
import {
    createTaskSchema,
    updateTaskSchema,
    taskIdParamSchema,
} from "../modules/task/task.validation.js";

router.post(
  "/",
  authMiddleware,
  validate(createTaskSchema),
  asyncHandler(createTaskController)
);

router.get(
  "/:id",
  authMiddleware,
  validate(taskIdParamSchema, "params"),
  asyncHandler(getTaskController)
);

router.patch(
  "/:id",
  authMiddleware,
  validate(taskIdParamSchema, "params"),
  validate(updateTaskSchema),
  asyncHandler(updateTaskController)
);

router.delete(
  "/:id",
  authMiddleware,
  validate(taskIdParamSchema, "params"),
  asyncHandler(deleteTaskController)
);
