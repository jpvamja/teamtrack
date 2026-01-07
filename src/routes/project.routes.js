import validate from "../middlewares/validator.middleware.js";
import {
    createProjectSchema,
    getProjectSchema,
    listProjectsSchema,
} from "../modules/project/project.validation.js";

router.post(
  "/",
  authMiddleware,
  authorizeRoles(ROLES.ADMIN, ROLES.OWNER),
  validate(createProjectSchema),
  asyncHandler(createProjectController)
);

router.get(
  "/",
  authMiddleware,
  validate(listProjectsSchema, "query"),
  asyncHandler(listProjectsController)
);

router.get(
  "/:id",
  authMiddleware,
  validate(getProjectSchema, "params"),
  asyncHandler(getProjectController)
);
