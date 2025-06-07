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

      showAlert(msg || "Reset link sent to your email", "success");
      
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
      <div className="login-card animated-fade-in">
        <h3 className="text-center mb-4 text-primary">Forgot Password</h3>

        {successMessage && (
          <div className="alert alert-success text-center" role="alert">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <input
              type="email"
              className="form-control input-animated"
              name="email"
              placeholder=" "
              onChange={(e) => setEmail(e.target.value)}
              required
              value={email}
              disabled={loading}
            />
            <label className="form-label">Enter your email</label>
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
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
