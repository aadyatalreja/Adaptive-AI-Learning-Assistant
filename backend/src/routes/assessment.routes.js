import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { getQuestions, submit } from "../controllers/assessment.controller.js";

const router = Router();

router.get("/questions", requireAuth, getQuestions);
router.post("/submit", requireAuth, submit);

export default router;

