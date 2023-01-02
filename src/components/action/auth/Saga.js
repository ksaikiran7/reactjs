import { takeLatest } from "@redux-saga/core/effects";
import { apis } from "../../../apis";
import { sagaFunctions } from "../../../utils";
import {
  Login,
  Forget,
  VerifyOtp,
  ResetPassword,
  UpdatePassword,
} from "./Action";

const loginSaga = (req) => {
  return sagaFunctions(Login, "post", apis.login, req.payload)();
};

const forgotSaga = (req) => {
  return sagaFunctions(Forget, "post", apis.forgot, req.payload)();
};

const verifyOtpSaga = (req) => {
  return sagaFunctions(VerifyOtp, "post", apis.verifyotp, req.payload)();
};

const resetPasswordSaga = (req) => {
  return sagaFunctions(ResetPassword, "put", apis.resetpassword, req.payload)();
};

const updatePasswordSaga = (req) => {
  return sagaFunctions(
    UpdatePassword,
    "put",
    apis.changepassword,
    req.payload
  )();
};

export function* authWatcher() {
  yield takeLatest(Login.REQUEST, loginSaga);
  yield takeLatest(Forget.REQUEST, forgotSaga);
  yield takeLatest(VerifyOtp.REQUEST, verifyOtpSaga);
  yield takeLatest(ResetPassword.REQUEST, resetPasswordSaga);
  yield takeLatest(UpdatePassword.REQUEST, updatePasswordSaga);
}
