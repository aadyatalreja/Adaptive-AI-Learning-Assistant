import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { httpError } from "../utils/httpError.js";

function signToken(user) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is missing. Set it in backend/.env");

  const payload = {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    role: user.role,
    xp: user.xp,
    level: user.level
  };

  return jwt.sign(payload, secret, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
}

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) return next(httpError(400, "Missing required fields"));

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) return next(httpError(409, "Email already registered"));

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashed
    });

    const token = signToken(user);
    res.status(201).json({ token });
  } catch (e) {
    next(e);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return next(httpError(400, "Missing email or password"));

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return next(httpError(401, "Invalid credentials"));

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return next(httpError(401, "Invalid credentials"));

    const token = signToken(user);
    res.json({ token });
  } catch (e) {
    next(e);
  }
}

