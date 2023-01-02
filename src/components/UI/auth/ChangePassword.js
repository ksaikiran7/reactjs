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
import {
  forgotAction,
  resetPasswordAction,
  veriftOtpAction,
} from "../../action/auth/Action";

const ResetSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be 8 characters")
    .max(15, "Password must not exceed 15 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required")
    .min(8, "Password must be 8 characters")
    .max(15, "Password must not exceed 15 characters"),
});

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resetPasswordToken = useSelector((state) => state?.auth.verifyotp);
  const goToLoginResponse = useSelector((state) => state?.auth.resetpassword);
  const resetFormik = useFormik({
    initialValues: {
      password: "",
      token: resetPasswordToken?.data?.token,
    },
    onSubmit: (values) => {
      delete values.confirmPassword;
      onResetPassword();
      dispatch(resetPasswordAction(values));
    },
    validationSchema: ResetSchema,
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [showconfirmPassword, setShowconfirmPassword] = React.useState(false);

  const handleClickShowconfirmPassword = () =>
    setShowconfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const onResetPassword = () => {
    navigate("/login");
  };
  useEffect(() => {
    if(goToLoginResponse.success){
      onResetPassword()
      dispatch()
    }
  }, [goToLoginResponse])
  
  return (
    <>
      {" "}
      <div className="form-container">
        <form
          className="w-100"
          autoComplete="off"
          onSubmit={resetFormik.handleSubmit}
        >
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    onChange={resetFormik.handleChange}
                  />
                </FormControl>
                <div className="error">
                  {resetFormik?.touched?.password &&
                    resetFormik?.errors?.password}
                </div>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="confirmPassword">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowconfirmPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showconfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm Password"
                    onChange={resetFormik.handleChange}
                  />
                </FormControl>
                <div className="error">
                  {resetFormik?.touched?.confirmPassword &&
                    resetFormik?.errors?.confirmPassword}
                </div>
              </Grid>
            </Grid>
          </Box>
          <div className="d-flex justify-content-end mt-2">
            <Button variant="contained" color="success" type="submit">
              Reset Password
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
