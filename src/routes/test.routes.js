import express from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";
import ROLES from "../config/roles.js";

const router = express.Router();

/**
 * =========================
 * Test / Debug Routes
 * (Non-production business logic)
 * =========================
 */

/**
 * Auth check
 */
router.get(
    "/protected",
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
 * Admin / Owner access check
 */
router.get(
    "/admin-only",
    authMiddleware,
    authorizeRoles(ROLES.ADMIN, ROLES.OWNER),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: "Admin access granted",
        });
    }
);

/**
 * Owner-only access check
 */
router.get(
    "/owner-only",
    authMiddleware,
    authorizeRoles(ROLES.OWNER),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: "Owner access granted",
        });
    }
);

export default router;
