import { User } from "../models/User.js";
import { httpError } from "../utils/httpError.js";

export async function me(req, res, next) {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return next(httpError(404, "User not found"));
    res.json({ user });
  } catch (e) {
    next(e);
  }
}

export async function selectRole(req, res, next) {
  try {
    const { role } = req.body || {};
    const allowed = new Set(["student", "teacher", "self-learner"]);
    if (!allowed.has(role)) return next(httpError(400, "Invalid role"));

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { role },
      { new: true }
    ).select("-password");
    if (!user) return next(httpError(404, "User not found"));
    res.json({ ok: true, user });
  } catch (e) {
    next(e);
  }
}

export async function selectSubjects(req, res, next) {
  try {
    const { subjects } = req.body || {};
    if (!Array.isArray(subjects) || subjects.length === 0) {
      return next(httpError(400, "Subjects must be a non-empty array"));
    }
    const normalized = subjects.map((s) => String(s));
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { subjects: normalized },
      { new: true }
    ).select("-password");
    if (!user) return next(httpError(404, "User not found"));
    res.json({ ok: true, user });
  } catch (e) {
    next(e);
  }
}

