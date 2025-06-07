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
            <div className="d-flex justify-content-center align-items-center vh-100">
              <button className="btn btn-primary" type="button" disabled>
                <span
                  className="spinner-grow spinner-grow-sm"
                  aria-hidden="true"
                ></span>
                <span role="status"> Loading...</span>
              </button>
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
