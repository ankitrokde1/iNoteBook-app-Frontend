import { Navigate } from "react-router-dom";
import { useAuth } from "../context/notes/AuthContext.jsx";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated === null) return null; // loading spinner optional
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
