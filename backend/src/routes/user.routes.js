import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { me, selectRole, selectSubjects } from "../controllers/user.controller.js";

const router = Router();

router.get("/me", requireAuth, me);
router.post("/select-role", requireAuth, selectRole);
router.post("/select-subjects", requireAuth, selectSubjects);

export default router;

