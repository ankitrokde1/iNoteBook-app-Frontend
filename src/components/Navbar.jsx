import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance.jsx";
import { useAuth } from "../context/notes/AuthContext.jsx";

const Navbar = (props) => {
  const [userName, setUserName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.post("/auth/getuser");
        setUserName(res.data.name || "User");
      } catch (error) {
        setUserName("");
      }
    };

    // Only fetch user if authenticated
    if (isAuthenticated) {
      fetchUser();
    } else {
      setUserName("");
    }
  }, [location.pathname, isAuthenticated]);

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");
      setIsAuthenticated(false);
      props.showAlert("Logged out successfully", "success");
      navigate("/login");
    } catch (error) {
      props.showAlert("Logout failed", "danger");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-3 py-2 rounded-bottom m-1">
      <Link className="navbar-brand mx-1 fw-bold text-light" to="/">
        iNoteBook
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link
              className={`nav-link fw-semibold ${
                location.pathname === "/" ? "active text-primary" : ""
              }`}
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link fw-semibold ${
                location.pathname === "/about" ? "active text-primary" : ""
              }`}
              to="/about"
            >
              About
            </Link>
          </li>
        </ul>

        {!isAuthenticated ? (
          <div className="form-inline d-flex gap-2">
            <Link
              className="btn btn-outline-primary rounded-pill px-3"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="btn btn-primary edit-btn rounded-pill px-3"
              to="/signup"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="d-flex align-items-center gap-3">
            <span className="text-light fw-semibold">👋 Hello, {userName}</span>
            <button
              className="btn btn-danger edit-btn rounded-pill px-3"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
