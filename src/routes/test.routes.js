import express from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";
import ROLES from "../config/roles.js";

const router = express.Router();

/**
 * =========================
 * Test / Debug Routes
 * ⚠️ DEVELOPMENT ONLY
 * =========================
 */

if (process.env.NODE_ENV === "production") {
  throw new Error("Test routes must not be loaded in production");
}

/**
 * Auth check
 * Tests JWT + auth middleware only
 */
router.get(
  "/auth/protected",
  authMiddleware,
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Authenticated access",
      data: req.user,
    });
  }
);

/**
 * Global role check (DEBUG ONLY)
 * ⚠️ Uses GLOBAL roles, not org/project roles
 */
router.get(
  "/auth/admin-only",
  authMiddleware,
  authorizeRoles(ROLES.ADMIN, ROLES.OWNER),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Admin access granted (debug route)",
    });
  }
);

/**
 * Owner-only global role check (DEBUG ONLY)
 */
router.get(
  "/auth/owner-only",
  authMiddleware,
  authorizeRoles(ROLES.OWNER),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Owner access granted (debug route)",
    });
  }
);

export default router;
