import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { GlassPanel } from "./ui/Card";

export default function AuthForm({
  mode,
  onSubmit,
  loading,
  error,
  showName = false
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const emailValid = useMemo(() => /\S+@\S+\.\S+/.test(form.email), [form.email]);

  const passwordScore = useMemo(() => {
    let score = 0;
    if (form.password.length >= 8) score += 1;
    if (/[A-Z]/.test(form.password)) score += 1;
    if (/[0-9]/.test(form.password)) score += 1;
    if (/[^A-Za-z0-9]/.test(form.password)) score += 1;
    return score; // 0..4
  }, [form.password]);

  const strengthLabel = ["Too weak", "Weak", "Good", "Strong", "Very strong"][passwordScore];
  const strengthWidth = [0, 30, 55, 80, 100][passwordScore];

  return (
    <GlassPanel className="max-w-md w-full mx-auto p-6 md:p-8">
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-50">
            {mode === "login" ? (
              <>
                Welcome back<span className="text-gradient">.</span>
              </>
            ) : (
              <>
                Create your profile<span className="text-gradient">.</span>
              </>
            )}
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            {mode === "login"
              ? "Sign in to continue your adaptive learning plan."
              : "Set up your learning workspace and start with a baseline assessment."}
          </p>
        </div>

        {error && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {showName && (
            <Input
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          )}

          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            hint={
              form.email
                ? emailValid
                  ? "Valid email address"
                  : "Please enter a valid email address"
                : "Use an institutional or personal email"
            }
          />

          <Input
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            required
            rightSlot={
              <button
                type="button"
                className="focus-ring rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs text-slate-200 hover:bg-white/[0.07]"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            }
          />

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Password strength</span>
              <span className="text-slate-300">{strengthLabel}</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/[0.06] border border-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent-indigo via-accent-violet to-accent-cyan transition-all"
                style={{ width: `${strengthWidth}%` }}
              />
            </div>
          </div>

          {mode === "signup" && (
            <Input
              label="Confirm password"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={form.confirmPassword}
              onChange={handleChange}
              required
              hint={
                form.confirmPassword
                  ? form.password === form.confirmPassword
                    ? "Passwords match"
                    : "Passwords do not match"
                  : undefined
              }
              error={
                form.confirmPassword &&
                form.password !== form.confirmPassword
                  ? "Passwords do not match"
                  : undefined
              }
            />
          )}
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full justify-center"
        >
          {loading
            ? "Processing..."
            : mode === "login"
            ? "Login"
            : "Create account"}
        </Button>
      </motion.form>
    </GlassPanel>
  );
}

