import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {Login} from "./components/Login";
import Register from "./components/Register";
import MapPage from "./pages/MapPage";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

// Protect routes
function PrivateRoute({ children }) {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/login" />;
}

// Prevent logged-in users from seeing login/register
function PublicRoute({ children }) {
  const { token } = useContext(AuthContext);
  return token ? <Navigate to="/" /> : children;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Public */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* Private */}
      <Route
        path="/map"
        element={
          <PrivateRoute>
            <MapPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}