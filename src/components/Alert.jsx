import React from "react";

const Alert = ({ alert }) => {
  if (!alert || !alert.msg) return null;

  // Choose icon based on alert type
  const icon =
    alert.type === "success"
      ? "✅"
      : alert.type === "danger"
      ? "⨯"
      : alert.type === "warning"
      ? "⚠️"
      : "ℹ️";

  // Choose background gradient based on alert type
  const bgGradient =
    alert.type === "success"
      ? "linear-gradient(90deg,#22c55e,#16a34a)"
      : alert.type === "danger"
      ? "linear-gradient(90deg,#ef4444,#b91c1c)"
      : alert.type === "warning"
      ? "linear-gradient(90deg,#f59e42,#d97706)"
      : "linear-gradient(90deg,#2563eb,#1e40af)";

  return (
    <div
      style={{
        position: "fixed",
        top: "80px",
        right: "30px",
        zIndex: 2000,
        minWidth: "280px",
        pointerEvents: "none",
        transition: "all 0.3s",
      }}
    >
      <div
        className="shadow-lg"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        style={{
          background: bgGradient,
          color: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 24px #0003",
          pointerEvents: "auto",
          padding: "18px 24px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
          fontSize: "1.08rem",
          fontWeight: 500,
          letterSpacing: "0.01em",
        }}
      >
        <span style={{ fontSize: "1.6rem", lineHeight: 1 }}>{icon}</span>
        <span>{alert.msg}</span>
      </div>
    </div>
  );
};

export default Alert;
