import React, { useState, useEffect } from "react";
import axios from "../api/axiosInstance.jsx";
import "../css/Login.css";
import { useAuth } from "../context/notes/AuthContext.jsx";

const ForgotPassword = ({ showAlert }) => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // If logged in, fetch the user's email
    const fetchUser = async () => {
      try {
        const res = await axios.post("/auth/getuser");
        setUserEmail(res.data.email);
      } catch {
        setUserEmail(null);
      }
    };
    if (isAuthenticated) {
      fetchUser();
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If logged in, only allow if email matches
    if (isAuthenticated && userEmail && email !== userEmail) {
      showAlert("You can only reset password for your own account.", "danger");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/auth/forgot-password", { email });

      const msg = res.data.message || "Reset link sent to your email";
      setSuccessMessage(msg); // Set the success message
      showAlert(msg, "success");
    } catch (error) {
      showAlert(
        error.response?.data?.message || "Failed to send reset link",
        "danger"
      );
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-4 mb-2 signup-bg">
      <div
        className="login-card animated-fade-in p-4 shadow-lg rounded-4"
        style={{ minWidth: 350, maxWidth: 400 }}
      >
        <h3 className="text-center mb-4 text-primary fw-bold">
          <span role="img" aria-label="lock">
            🔑
          </span>{" "}
          Forgot Password
        </h3>

        {successMessage ? (
          <div
            className="alert alert-success text-center animate__animated animate__fadeInDown"
            role="alert"
          >
            <div className="mb-2">
              <span className="display-4 text-success">
                <i className="fas fa-check-circle"></i>
              </span>
            </div>
            <div className="fw-semibold mb-1">{successMessage}</div>
            <div className="small text-muted">
              Please check your email for the reset link.
              <br />
              <span className="text-primary">
                Didn’t get it? Check your spam folder.
              </span>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="animate__animated animate__fadeInUp"
          >
            <div className="mb-4 position-relative">
              <input
                type="email"
                className="form-control input-animated ps-5 py-3"
                id="forgotEmail"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                value={email}
                placeholder="Enter your email"
                disabled={loading}
                style={{
                  background: "#f8fafc",
                  borderRadius: "2rem",
                  border: "2px solid #2563eb",
                  boxShadow: "0 2px 12px #2563eb11",
                  fontSize: "1.08rem",
                  paddingLeft: "2.7rem",
                }}
              />
              <span
                className="position-absolute top-50 start-0 translate-middle-y ms-3 text-primary"
                style={{ fontSize: "1.2rem", zIndex: 2 }}
              >
                <i className="fas fa-envelope"></i>
              </span>
              
            </div>
            <button
              type="submit"
              className="btn btn-gradient w-100 py-2 fw-semibold rounded-pill shadow-sm"
              disabled={loading}
              style={{
                background:
                  "linear-gradient(90deg,#2563eb,#1e40af,#22c55e,#16a34a)",
                border: "none",
                color: "#fff",
                fontSize: "1.1rem",
                letterSpacing: "0.03em",
              }}
            >
              {loading ? (
                <span className="d-flex align-items-center justify-content-center">
                  <span
                    className="spinner-grow spinner-grow-sm me-2"
                    style={{ backgroundColor: "#fff" }}
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Sending...
                </span>
              ) : (
                <>
                  <i className="fas fa-paper-plane me-2"></i>
                  Send Reset Link
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
