import express from "express";
import authRoutes from "./auth.routes.js";
import testRoutes from "./test.routes.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy!!",
    });
});

router.get("/me", authMiddleware, (req, res) => {
    res.json({
        success: true,
        user: req.user,
    });
});

router.use("/auth", authRoutes);
router.use("/test", testRoutes);

export default router;
