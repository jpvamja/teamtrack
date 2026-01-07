import validate from "../middlewares/validator.middleware.js";
import {
    registerSchema,
    loginSchema,
    refreshSchema,
} from "../modules/auth/auth.validation.js";

router.post(
  "/register",
  validate(registerSchema),
  asyncHandler(register)
);

router.post(
  "/login",
  validate(loginSchema),
  asyncHandler(login)
);

router.post(
  "/refresh",
  validate(refreshSchema),
  asyncHandler(refresh)
);
