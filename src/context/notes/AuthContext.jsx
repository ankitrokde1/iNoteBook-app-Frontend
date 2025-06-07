import { createContext, useContext, useState, useEffect } from "react";
import axios from "../../api/axiosInstance.jsx";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading

  const checkAuth = async () => {
    try {
      await axios.post("/auth/getuser"); // uses HTTP-only cookie
      setIsAuthenticated(true);
    } catch (err) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
