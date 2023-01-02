import { ReducerFunctions } from "../../../utils";
import {
  Login,
  Forget,
  VerifyOtp,
  ResetPassword,
  UpdatePassword,
} from "./Action";

export const login_reducer = ReducerFunctions(Login, {});
export const forgot_reducer = ReducerFunctions(Forget, {});
export const verify_otp_reducer = ReducerFunctions(VerifyOtp, {});
export const reset_password_reducer = ReducerFunctions(ResetPassword, {});
export const update_password_reducer = ReducerFunctions(UpdatePassword, {});
