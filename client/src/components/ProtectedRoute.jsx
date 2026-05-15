import { Navigate } from "react-router-dom";
import { getToken } from "../service/AuthService";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const userRole = payload.role;

    if (role && userRole !== role) {
      return <Navigate to="/" />;
    }

    return children;
  } catch (err) {
    return <Navigate to="/login" />;
  }
}