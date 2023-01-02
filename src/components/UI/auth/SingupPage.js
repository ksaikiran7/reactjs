import React from "react";
import Button from "@mui/material/Button";
import SingUpImg from "../../assets/create.svg";
import { useNavigate } from "react-router-dom";
import { Grid, TextField, Box } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";


const createUserSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  emailId: Yup.string().required("Email Id is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  Password: Yup.string().required("Password is required"),
  conformPassword: Yup.string().required("Password is required"),
});

const SingupPage = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      emailId: "",
      phoneNumber: "",
      Password: "",
      conformPassword: "",
    },
    onSubmit: (values) => {
      CreateUser();
    },
    validationSchema: createUserSchema,
  });

  const CreateUser = () => {
    navigate("/login");
  };
  const BackToLogin = () => {
    navigate("/login");
  };
  return (
    <div className="d-flex register-form-page">
      <div className="register-img">
        <img className="mt-5" src={SingUpImg} alt="SingUpImg" />
      </div>
      <div className="create-form">
        <span className="login-title">Create Your Account</span>
        <div className="create-form-container">
        <form
            className="w-100"
            autoComplete="off"
            onSubmit={formik.handleSubmit}
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
                  label="First Name"
                  id="firstName"
                  onChange={formik.handleChange}
                />
                <div className="error">
                    {formik?.touched?.firstName && formik?.errors?.firstName}
                  </div>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  color="success"
                  fullWidth
                  label="Last Name"
                  id="lastName"
                  onChange={formik.handleChange}
                />
                <div className="error">
                    {formik?.touched?.lastName && formik?.errors?.lastName}
                  </div>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  color="success"
                  fullWidth
                  label="Email Id"
                  id="emailId"
                  onChange={formik.handleChange}
                />
                <div className="error">
                    {formik?.touched?.emailId && formik?.errors?.emailId}
                  </div>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  color="success"
                  fullWidth
                  label="Phone Number"
                  id="phoneNumber"
                  onChange={formik.handleChange}
                />
                <div className="error">
                    {formik?.touched?.phoneNumber && formik?.errors?.phoneNumber}
                  </div>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  color="success"
                  fullWidth
                  label="Password"
                  id="Password"
                  onChange={formik.handleChange}
                />
                    <div className="error">
                    {formik?.touched?.Password && formik?.errors?.Password}
                  </div>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  color="success"
                  fullWidth
                  label="Conform Password"
                  id="conformPassword"
                  onChange={formik.handleChange}
                />
                <div className="error">
                    {formik?.touched?.conformPassword && formik?.errors?.conformPassword}
                  </div>
              </Grid>
            </Grid>
          </Box>
          <div className="d-flex justify-content-between mt-1">
            <Button
              variant="outlined"
              color="success"
              onClick={() => BackToLogin()}
            >
              Back To Login
            </Button>
            <Button
              variant="contained"
              color="success"
              type="submit"
            >
              Create
            </Button>
          </div></form>
        </div>
      </div>
    </div>
  );
};

export default SingupPage;
