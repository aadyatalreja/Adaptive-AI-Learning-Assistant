import { useState } from "react";
import { motion } from "framer-motion";

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

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const passwordStrong =
    form.password.length >= 8 &&
    /[A-Z]/.test(form.password) &&
    /[0-9]/.test(form.password);

  const emailValid = /\S+@\S+\.\S+/.test(form.email);

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="glass-panel max-w-md w-full mx-auto p-6 md:p-8 space-y-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-50">
          {mode === "login" ? "Welcome back" : "Create your learning profile"}
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          {mode === "login"
            ? "Access your adaptive learning dashboard."
            : "Start with a short setup and initial assessment."}
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-100">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {showName && (
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-primary-500"
              placeholder="How should we address you?"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-300">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-primary-500"
            placeholder="you@institution.edu"
            value={form.email}
            onChange={handleChange}
            required
          />
          {form.email && (
            <p
              className={`text-[11px] ${
                emailValid ? "text-emerald-400" : "text-amber-400"
              }`}
            >
              {emailValid ? "Valid email address" : "Please enter a valid email"}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-300">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-primary-500"
            placeholder="Minimum 8 characters"
            value={form.password}
            onChange={handleChange}
            required
          />
          <div className="flex items-center gap-2 text-[11px]">
            <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className={`h-full transition-all ${
                  !form.password
                    ? "w-0"
                    : passwordStrong
                    ? "w-full bg-emerald-500"
                    : "w-1/2 bg-amber-500"
                }`}
              />
            </div>
            <span
              className={
                passwordStrong ? "text-emerald-400" : "text-slate-400"
              }
            >
              {passwordStrong ? "Strong" : "Weak"}
            </span>
          </div>
        </div>
        {mode === "signup" && (
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-primary-500"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            {form.confirmPassword && (
              <p
                className={`text-[11px] ${
                  form.password === form.confirmPassword
                    ? "text-emerald-400"
                    : "text-amber-400"
                }`}
              >
                {form.password === form.confirmPassword
                  ? "Passwords match"
                  : "Passwords do not match"}
              </p>
            )}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center rounded-xl bg-primary-600 hover:bg-primary-700 text-sm font-medium text-white py-2.5 mt-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {loading
          ? "Processing..."
          : mode === "login"
          ? "Login"
          : "Create Account"}
      </button>
    </motion.form>
  );
}

