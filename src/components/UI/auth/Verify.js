
import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import {
  Grid,
  TextField,
  Box,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  veriftOtpAction,
} from "../../action/auth/Action";

const VerficationSchema = Yup.object().shape({
  otp: Yup.string().required("OTP is required"),
  token: Yup.string().required("OTP is required"),
});

const Verify = () => {
    const dispatch = useDispatch();
 
    const forgotOtpToken = useSelector((state) => state?.auth.forgot);
   
  const otpFormik = useFormik({
    initialValues: {
      otp: "",
      token: forgotOtpToken?.data?.token,
    },
    onSubmit: (values) => {
      dispatch(veriftOtpAction(values));
     
    },
    validationSchema: VerficationSchema,
  });
  return (
    <div className="form-container">
      <form
        className="w-100"
        autoComplete="off"
        onSubmit={otpFormik.handleSubmit}
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
                label="OTP"
                id="otp"
                onChange={otpFormik.handleChange}
              />
              <div className="error">
                {otpFormik?.touched?.otp && otpFormik?.errors?.otp}
              </div>
            </Grid>
          </Grid>
        </Box>
        <div className="d-flex justify-content-end mt-2">
          <Button variant="contained" color="success" type="submit">
            Verfiy OTP
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Verify;
