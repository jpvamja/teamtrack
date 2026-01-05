import express from "express";
import authRoutes from "./auth.routes.js";

const router = express.Router();

router.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy!!",
    });
});

router.use("/auth", authRoutes);

export default router;
