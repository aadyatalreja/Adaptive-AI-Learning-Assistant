import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { generate, submit, checkStatus } from "../controllers/assessment.controller.js";

const router = Router();

router.get("/generate", requireAuth, generate);
router.get("/status", requireAuth, checkStatus);
router.post("/submit", requireAuth, submit);

export default router;

