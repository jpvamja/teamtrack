import validate from "../middlewares/validator.middleware.js";
import {
    createOrganizationSchema,
    inviteMemberSchema,
} from "../modules/organization/organization.validation.js";

router.post(
  "/",
  authMiddleware,
  authorizeRoles(ROLES.OWNER),
  validate(createOrganizationSchema),
  asyncHandler(createOrg)
);

router.post(
  "/invite",
  authMiddleware,
  authorizeRoles(ROLES.OWNER, ROLES.ADMIN),
  validate(inviteMemberSchema),
  asyncHandler(inviteOrgMember)
);
