import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";
import { AuthAPI } from "../services/api";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      setError("");
      const { data } = await AuthAPI.login({
        email: values.email,
        password: values.password
      });

      const token = data?.token;
      if (!token) throw new Error("Login failed: token was not returned.");

      login(token);
      navigate("/role");
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Unable to login. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">
        <AuthForm
          mode="login"
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
        <p className="mt-4 text-xs text-center text-slate-400">
          New to the platform?{" "}
          <Link
            to="/signup"
            className="text-primary-400 hover:text-primary-300 font-medium"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

