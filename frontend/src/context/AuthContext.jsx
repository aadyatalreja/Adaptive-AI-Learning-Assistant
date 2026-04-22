import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      try {
        // Demo mode: allow a non-JWT token stored by the UI.
        if (token === "mock-token") {
          const stored = localStorage.getItem("mockUser");
          const mockUser = stored ? JSON.parse(stored) : null;
          setUser(
            mockUser || {
              id: "local-user",
              email: "learner@example.com",
              name: "Learner",
              role: null,
              xp: 0,
              level: 1
            }
          );
          setLoading(false);
          return;
        }

        const decoded = jwtDecode(token);
        setUser({
          id: decoded.id,
          email: decoded.email,
          name: decoded.name,
          role: decoded.role,
          xp: decoded.xp,
          level: decoded.level
        });
      } catch {
        // If decoding fails, keep the session but fall back to local demo user.
        const stored = localStorage.getItem("mockUser");
        const mockUser = stored ? JSON.parse(stored) : null;
        setUser(
          mockUser || {
            id: "local-user",
            email: "learner@example.com",
            name: "Learner",
            role: null,
            xp: 0,
            level: 1
          }
        );
      }
    }
    setLoading(false);
  }, [token]);

  const login = (jwt) => {
    localStorage.setItem("token", jwt);
    setToken(jwt);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("mockUser");
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    loading,
    login,
    logout,
    setUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

