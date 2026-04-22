import { Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RoleSelection from "./pages/RoleSelection";
import SubjectSelection from "./pages/SubjectSelection";
import InitialAssessment from "./pages/InitialAssessment";
import Dashboard from "./pages/Dashboard";
import WeakAreas from "./pages/WeakAreas";
import StudyMode from "./pages/StudyMode";
import Gamification from "./pages/Gamification";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

function ShellLayout({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-app">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-app flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 px-4 pt-5 pb-8 md:px-8 md:pt-7">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route
          path="/"
          element={
            <ShellLayout>
              <Landing />
            </ShellLayout>
          }
        />
        <Route
          path="/login"
          element={
            <ShellLayout>
              <Login />
            </ShellLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <ShellLayout>
              <Signup />
            </ShellLayout>
          }
        />
        <Route
          path="/role"
          element={
            <ProtectedRoute>
              <ShellLayout>
                <RoleSelection />
              </ShellLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/subjects"
          element={
            <ProtectedRoute>
              <ShellLayout>
                <SubjectSelection />
              </ShellLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/assessment"
          element={
            <ProtectedRoute>
              <ShellLayout>
                <InitialAssessment />
              </ShellLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ShellLayout>
                <Dashboard />
              </ShellLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/weak-areas"
          element={
            <ProtectedRoute>
              <ShellLayout>
                <WeakAreas />
              </ShellLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/study-mode"
          element={
            <ProtectedRoute>
              <ShellLayout>
                <StudyMode />
              </ShellLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/gamification"
          element={
            <ProtectedRoute>
              <ShellLayout>
                <Gamification />
              </ShellLayout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

