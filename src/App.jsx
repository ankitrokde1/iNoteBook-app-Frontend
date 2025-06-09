import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import "animate.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/notes/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ msg: "", type: "" });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => {
      setAlert({ msg: "", type: "" });
    }, 4000);
  };

  return (
    <NoteState>
      <AuthProvider>
        <BrowserRouter>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
              <div className="text-center">
                <div
                  className="spinner-border text-primary"
                  style={{
                    width: "4rem",
                    height: "4rem",
                    borderWidth: "0.5em",
                    marginBottom: "1.5rem",
                  }}
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
                <h4 className="fw-bold text-primary mb-2 animate__animated animate__pulse animate__infinite">
                  iNoteBook
                </h4>
                <div className="text-muted mb-2">
                  <span
                    style={{
                      background:
                        "linear-gradient(90deg,#2563eb,#1e40af,#22c55e,#16a34a)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: 600,
                      fontSize: "1.1rem",
                    }}
                  >
                    Loading your notes...
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Navbar showAlert={showAlert} />
              <Alert alert={alert} />
              <div className="container">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <PrivateRoute>
                        <Home showAlert={showAlert} />
                      </PrivateRoute>
                    }
                  />
                  <Route path="/about" element={<About />} />
                  <Route
                    path="/login"
                    element={<Login showAlert={showAlert} />}
                  />
                  <Route
                    path="/signup"
                    element={<SignUp showAlert={showAlert} />}
                  />
                  <Route
                    path="/forgot-password"
                    element={<ForgotPassword showAlert={showAlert} />}
                  />
                  <Route
                    path="/reset-password/:token"
                    element={<ResetPassword showAlert={showAlert} />}
                  />
                  <Route
                    path="*"
                    element={
                      <div className="container mt-5 text-center">
                        <h2>Oops! Page not found.</h2>
                        <p>
                          The page you’re looking for doesn’t exist or has been
                          moved.
                        </p>
                      </div>
                    }
                  />
                </Routes>
                <Footer />
              </div>
            </>
          )}
        </BrowserRouter>
      </AuthProvider>
    </NoteState>
  );
}

export default App;
