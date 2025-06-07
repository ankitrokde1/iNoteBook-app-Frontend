import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axiosInstance.jsx";
import "../css/Login.css";

const ResetPassword = ({ showAlert }) => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({ password: "", confirm: "" });

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirm } = passwords;

    if (password !== confirm) {
      showAlert("Passwords do not match", "danger");
      return;
    }

    try {
      const res = await axios.post(`/auth/reset-password/${token}`, {
        password,
      });
      showAlert(res.data.message || "Password reset successful", "success");
      navigate("/login");
    } catch (error) {
      showAlert(
        error.response?.data?.message || "Failed to reset password",
        "danger"
      );
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-4 mb-2 signup-bg">
      <div className="login-card animated-fade-in">
        <h3 className="text-center mb-4 text-primary">Reset Password</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="password"
              className="form-control input-animated"
              name="password"
              placeholder=" "
              onChange={handleChange}
              required
              minLength={5}
              value={passwords.password}
            />
            <label className="form-label">New Password</label>
          </div>
          <div className="form-group mb-4">
            <input
              type="password"
              className="form-control input-animated"
              name="confirm"
              placeholder=" "
              onChange={handleChange}
              required
              minLength={5}
              value={passwords.confirm}
            />
            <label className="form-label">Confirm Password</label>
          </div>
          <button type="submit" className="btn btn-gradient w-100">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
