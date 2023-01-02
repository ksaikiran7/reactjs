import { ActionTypesFactory } from "../../../utils";

export const Login = ActionTypesFactory("Auth", "Login");
export const Forget = ActionTypesFactory("Auth", "Forget");
export const VerifyOtp = ActionTypesFactory("Auth", "VerifyOtp");
export const ResetPassword = ActionTypesFactory("Auth", "ResetPassword");
export const UpdatePassword = ActionTypesFactory("Auth", "UpdatePassword");


export const loginAction = (payload) => {
  return {
    type: Login.REQUEST,
    payload,
  };
};

export const forgotAction = (payload) => {
  return {
    type: Forget.REQUEST,
    payload,
  };
};

export const veriftOtpAction = (payload) => {
  return {
    type: VerifyOtp.REQUEST,
    payload,
  };
};

export const resetPasswordAction = (payload) => {
  return {
    type: ResetPassword.REQUEST,
    payload,
  };
};

export const updatePasswordAction = (payload) => {
  return {
    type: UpdatePassword.REQUEST,
    payload,
  };
};

export const resetLogin = () => {
  return {
    type: Login.RESET,
  };
};