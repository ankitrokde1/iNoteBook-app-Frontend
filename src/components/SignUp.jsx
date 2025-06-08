import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance.jsx";
import "../css/Login.css";
import { useAuth } from "../context/notes/AuthContext.jsx";

const SignUp = (props) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
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
    const { name, email, password, cpassword } = credentials;

    if (password !== cpassword) {
      props.showAlert("Passwords do not match", "danger");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/auth/createuser", {
        name,
        email,
        password,
      });

      const { success } = response.data;

      if (success) {
        props.showAlert("Account created successfully", "success");
        navigate("/login");
      } else {
        props.showAlert("Invalid credentials", "danger");
      }
    } catch (error) {
      props.showAlert("Server error or invalid credentials", "danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-4 mb-2 signup-bg">
      <div className="login-card animated-fade-in">
        <h3 className="text-center mb-4 text-primary">Create Your Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control input-animated"
              id="name"
              name="name"
              placeholder=" "
              onChange={handleChange}
              required
              minLength={5}
              value={credentials.name}
              disabled={loading}
            />
            <label htmlFor="name" className="form-label">
              Name
            </label>
          </div>

          <div className="form-group">
            <input
              type="email"
              className="form-control input-animated"
              id="email"
              name="email"
              placeholder=" "
              onChange={handleChange}
              required
              value={credentials.email}
              disabled={loading}
            />
            <label htmlFor="email" className="form-label">
              Email address
            </label>
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control input-animated"
              id="password"
              name="password"
              placeholder=" "
              onChange={handleChange}
              required
              minLength={5}
              value={credentials.password}
              disabled={loading}
            />
            <label htmlFor="password" className="form-label">
              Password
            </label>
          </div>

          <div className="form-group mb-4">
            <input
              type="password"
              className="form-control input-animated"
              id="cpassword"
              name="cpassword"
              placeholder=" "
              onChange={handleChange}
              required
              minLength={5}
              value={credentials.cpassword}
              disabled={loading}
            />
            <label htmlFor="cpassword" className="form-label">
              Confirm Password
            </label>
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
                Signing up...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <p className="mt-3 text-center text-muted">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
