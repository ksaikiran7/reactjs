import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import ForgotPasswordImg from "../../assets/Forgotpassword.svg";
import {
  Grid,
  TextField,
  Box,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { forgotAction, resetPasswordAction, veriftOtpAction } from "../../action/auth/Action";
import Verify from "./Verify";
import ChangePassword from "./ChangePassword";


const UserSchema = Yup.object().shape({
  userName: Yup.string().email("Invalid userName").required("Email is required"),
});





const ForgotPassword = () => {
  const [verfiyOtp, setVerfiyOtp] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);

  const forgotOtpToken = useSelector((state) => state?.auth.forgot);
  const resetPasswordToken = useSelector((state) => state?.auth.verifyotp);

 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userFormik = useFormik({
    initialValues: {
      userName: "",
    },
    onSubmit: (values) => {
      dispatch(forgotAction(values));
    },
    validationSchema: UserSchema,
  });



  const goToLogin = () => {
    navigate("/login");
  };
 
  useEffect(() => {
    if(forgotOtpToken?.success){
      setVerfiyOtp(true);
    }
   
  }, [forgotOtpToken])

  useEffect(() => {
    if(resetPasswordToken?.success){
      setResetPassword(true);
      setVerfiyOtp(false);
    }
   
  }, [resetPasswordToken])
  
  console.log("verifyOtp",verfiyOtp,resetPassword);
  return (
    <div className="d-flex register-form-page">
      <div className="register-img">
        <img className="mt-5" src={ForgotPasswordImg} alt="ForgotPassword" />
      </div>
      <div className="register-form">
        {!verfiyOtp && !resetPassword && (
          <>
            <span className="login-title">Verfiying User</span>
            <div className="form-container">
              <form
                className="w-100"
                autoComplete="off"
                onSubmit={userFormik.handleSubmit}
              >
                <Box sx={{ width: "100%" }}>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={12}>
                      <TextField
                        color="success"
                        fullWidth
                        label="Email/Phone Number"
                        id="userName"
                        onChange={userFormik.handleChange}
                      />
                      <div className="error">
                        {userFormik?.touched?.userName &&
                          userFormik?.errors?.userName}
                      </div>
                    </Grid>
                  </Grid>
                </Box>
                <div className="d-flex justify-content-between mt-2">
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={() => goToLogin()}
                  >
                    Back to Login
                  </Button>
                  <Button variant="contained" color="success" type="submit">
                    Send OTP
                  </Button>
                </div>
              </form>
            </div>
          </>
        )}
        {verfiyOtp && !resetPassword && (
          <>
            <span className="login-title">Security Verification</span>
           <Verify/>
          </>
        )}
        {!verfiyOtp && resetPassword && (
          <>
            <span className="login-title">Change Password</span>
           <ChangePassword/>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
