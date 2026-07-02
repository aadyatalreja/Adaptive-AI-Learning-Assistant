import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";
import { AuthAPI } from "../services/api";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const { data } = await AuthAPI.register({
        name: values.name,
        email: values.email,
        password: values.password
      });

      const token = data?.token;
      if (!token) throw new Error("Signup failed: token was not returned.");

      login(token);
      navigate("/role");
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Unable to sign up. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">
        <AuthForm
          mode="signup"
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
          showName
        />
        <p className="mt-4 text-xs text-center text-slate-400">
          Already registered?{" "}
          <Link
            to="/login"
            className="text-primary-400 hover:text-primary-300 font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

