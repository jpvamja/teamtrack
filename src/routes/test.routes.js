import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";
import ROLES from "../config/roles.js";

const router = express.Router();

router.get(
    "/protected",
    authMiddleware,
    (req, res) => {
        res.json({
            success: true,
            message: "Authenticated access",
            user: req.user,
        });
    }
);

router.get(
    "/admin-only",
    authMiddleware,
    authorizeRoles(ROLES.ADMIN, ROLES.OWNER),
    (req, res) => {
        res.json({
            success: true,
            message: "Admin access granted",
        });
    }
);

router.get(
    "/owner-only",
    authMiddleware,
    authorizeRoles(ROLES.OWNER),
    (req, res) => {
        res.json({
            success: true,
            message: "Owner access granted",
        });
    }
);

export default router;