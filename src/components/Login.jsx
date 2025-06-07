import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance.jsx";
import "../css/Login.css";
import { useAuth } from "../context/notes/AuthContext.jsx";

const Login = (props) => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/auth/login", {
        email: credentials.email,
        password: credentials.password,
      });

      const { success } = response.data;

      if (success) {
        setIsAuthenticated(true);
        props.showAlert("Logged in successfully", "success");
        navigate("/");
      } else {
        props.showAlert("Invalid credentials", "danger");
      }
    } catch (error) {
      props.showAlert("Invalid credentials or server error", "danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg d-flex justify-content-center mb-2 align-items-center">
      <div className="login-card animated-fade-in">
        <h3 className="text-center mb-4 text-primary">Login to iNotebook</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              type="email"
              className="form-control input-animated"
              id="email"
              name="email"
              onChange={handleChange}
              value={credentials.email}
              placeholder=""
              required
              disabled={loading}
            />
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
          </div>
          <div className="form-group mb-4">
            <input
              type="password"
              className="form-control input-animated"
              id="password"
              name="password"
              onChange={handleChange}
              value={credentials.password}
              placeholder=""
              required
              disabled={loading}
            />
            <label htmlFor="email" className="form-label">
              Password
            </label>
            <span className="mx-1 text-center text-muted">
              Forget Password? <a href="/forgot-password">Reset Password</a>
            </span>
          </div>
          <button
            type="submit"
            className="btn btn-gradient w-100"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p className="mt-3 text-center text-muted">
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
