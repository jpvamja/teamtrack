import express from "express";
import {
  createComment,
  fetchCommentsByTask,
} from "./comment.controller.js";
import {
  createCommentSchema,
  getCommentsSchema,
} from "./comment.validation.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import validate from "../middlewares/validator.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", validate(createCommentSchema) , createComment);
router.get("/", validate(getCommentsSchema , "query"), fetchCommentsByTask);

export default router;
