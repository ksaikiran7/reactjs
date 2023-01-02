import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import loginImg from "../../assets/login.svg";
import { useLocation, useNavigate } from "react-router-dom";
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
import { loginAction, resetLogin } from "../../action/auth/Action";
import { toast } from "react-toastify";

const LoginSchema = Yup.object().shape({
  userName: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required").min(8, "Password must be 8 characters")
  .max(15, "Password must not exceed 15 characters"),
});

const LoginPage = ({setIsSignedIn}) => {
  const loginResponse = useSelector((state) => state?.auth?.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(loginAction(values));
    },
    validationSchema: LoginSchema,
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const goToForgotPassword = () => {
    navigate("/forgot");
  };

  const goToRegister = () => {
    navigate("/singup");
  };
  useEffect(() => {
    if (loginResponse?.success) {
      localStorage.setItem("token", loginResponse?.data?.accessToken);
      let userData = loginResponse?.data;
      delete userData?.accessToken;
      localStorage.setItem("userData", JSON.stringify(userData));
      // let from = location?.state?.from || localStorage.getItem("from");
      // let state = location?.state?.state;
      toast.success("jhyufy");
      navigate("/home");
      setIsSignedIn(true)
      dispatch(resetLogin());
    }
  }, [loginResponse]);
  return (
    <div className="d-flex register-form-page">
      <div className="register-img">
        <img className="mt-5" src={loginImg} alt="loginImg" />
      </div>
      <div className="register-form">
        <span className="login-title">Login</span>
        <br />
        <div className="mt-1">
          <span className="login-label">Please provide your credentials</span>
        </div>
        <div className="form-container">
          <form
            className="w-100"
            autoComplete="off"
            onSubmit={formik.handleSubmit}
          >
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={4}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={12}>
                  <TextField
                    color="success"
                    fullWidth
                    label="User Name"
                    id="userName"
                    onChange={formik.handleChange}
                    autoComplete="off"
                  />
                   <div className="error">
                    {formik?.touched?.userName && formik?.errors?.userName}
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="password"
                      onChange={formik.handleChange}
                      autoComplete="off"
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
                    />
                  </FormControl>
                  <div className="error">
                    {formik?.touched?.password && formik?.errors?.password}
                  </div>
                </Grid>
              </Grid>
            </Box>
            <div className="d-flex justify-content-between mt-2">
              <span
                className="highlight-text mt-05"
                variant="contained"
                onClick={() => goToForgotPassword()}
              >
                Forgot Password ?
              </span>
              <Button
                variant="contained"
                color="success"
                type="submit"

              >
                Login
              </Button>
            </div>
          </form>
        </div>
        <div className="center-txt mt-5">
          <span className="p-1">Not Register Yet?</span>
          <span onClick={() => goToRegister()} className="highlight-text">
            Sing Up
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
