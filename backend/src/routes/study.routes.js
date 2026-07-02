import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { generateStudyMaterials } from "../controllers/study.controller.js";

const router = Router();

router.get("/generate", requireAuth, generateStudyMaterials);

export default router;
