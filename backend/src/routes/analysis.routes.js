import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { weakAreas } from "../controllers/analysis.controller.js";

const router = Router();

router.get("/weak-areas", requireAuth, weakAreas);

export default router;

