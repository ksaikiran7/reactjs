import { combineReducers } from "redux";
import {
  login_reducer,
  forgot_reducer,
  verify_otp_reducer,
  reset_password_reducer,
  update_password_reducer,
} from "./components/action/auth/Reducer";

export default combineReducers({
  auth: combineReducers({
    login: login_reducer,
    forgot: forgot_reducer,
    verifyotp: verify_otp_reducer,
    resetpassword: reset_password_reducer,
    updatepassword: update_password_reducer,
  }),
})