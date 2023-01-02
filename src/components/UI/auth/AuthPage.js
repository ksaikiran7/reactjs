import React from "react";
import welcome from "../../assets/welcome.svg";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };
  const goToRegister = () => {
    navigate("/singup");
  };
  return (
    <div className="d-flex register-form-page">
      <div className="register-img">
        <img className="mt-5" src={welcome} alt="welcome" />
      </div>
      <div className="auth-form">
        <span className="auth-title">Welcome to Grocery Store</span>
        <div className="form-container">
          <div className="d-flex justify-content-space-around mt-5">
            <Button
              variant="contained"
              color="success"
              onClick={() => goToRegister()}
            >
              Sign UP
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => goToLogin()}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
