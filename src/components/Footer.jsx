import React from "react";

const Footer = () => {
  return (
    <footer
      className="bg-dark text-light py-2 px-2 mt-auto shadow-lg"
      style={{
        borderTopLeftRadius: "1.5rem",
        borderTopRightRadius: "1.5rem",
        letterSpacing: "0.02em",
      }}
    >
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="mb-2 mb-md-0">
          <span
            className="fw-bold text-gradient"
            style={{ fontSize: "1.1rem" }}
          >
            <span style={{ color: "#2563eb" }}>i</span>
            <span style={{ color: "#1e40af" }}>NoteBook</span>
          </span>{" "}
          <span className="mx-2">|</span>
          <small>
            &copy; {new Date().getFullYear()} by Ankit Rokde. All rights
            reserved.
          </small>
        </div>
        <div>
          <a
            href="https://github.com/ankitrokde1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light mx-2"
            style={{ textDecoration: "none", fontSize: "1.2rem" }}
            title="GitHub"
          >
            <i className="bi bi-github"></i> {/* Bootstrap Icons */}
            <span className="ms-1">GitHub</span>
          </a>
          <a
            href="mailto:rokdeankit@gmail.com"
            className="text-light mx-2"
            style={{ textDecoration: "none", fontSize: "1.2rem" }}
            title="Contact"
          >
            <i className="bi bi-envelope-fill"></i>
            <span className="ms-1">Contact</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
