import _ from "lodash";
import { call, put } from "redux-saga/effects";
import endpoint from "./endpoint";

export const RESET_ON_LOGOUT = "RESET_ON_LOGOUT";

export const ActionTypesFactory = (prefix, type) => {
  let p = _.upperCase(prefix) + "/" + _.upperCase(type);
  return {
    REQUEST: p + "_REQUEST",
    INPROGRESS: p + "_INPROGRESS",
    SUCCESS: p + "_SUCCESS",
    FAILED: p + "_FAILED",
    CHANGED: p + "_CHANGED",
    RESET: p + "_RESET",
    custom: (name) => {
      return `${p}_${name}`;
    },
  };
};

export const sagaFunctions = (action_type, method, api, data, headers) => {
  return function* () {
    let res = null;
    try {
      if (method === "post" || method === "put" || method === "patch") {
        res = yield call(endpoint[method], api, data, {
          headers,
        });
      } else if (method === "delete") {
        res = yield call(endpoint[method], api, { data: { ...data } });
      } else {
        res = yield call(endpoint[method], api, {
          params: data,
        });
      }
      if (res.status < 400) {
        yield put({
          type: action_type.SUCCESS,
          payload: res.data,
        });
      } else {
        yield put({
          type: action_type.FAILED,
          payload: res.data,
        });
      }
    } catch (err) {
      yield put({
        type: action_type.FAILED,
        payload:
          err?.response?.data && typeof err?.response?.data === "object"
            ? {
                ...err?.response?.data,
                // message: err?.response?.headers?.message,
              }
            : {
                message: err?.response?.headers?.message,
              },
      });
    }
  };
};

export const ReducerFunctions = (ActionType, initialState) => {
  return (state = initialState, action) => {
    switch (action.type) {
      case ActionType.REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ActionType.SUCCESS:
        return {
          ...state,
          ...action.payload,
          loading: false,
          success: true,
        };
      case ActionType.CHANGED:
        return {
          ...state,
          ...action.payload,
          loading: false,
          success: true,
        };
      case ActionType.FAILED:
        let errMsg = action?.payload?.message;
        return {
          ...state,
          ...action.payload,
          errMsg,
          loading: false,
          success: false,
        };
      case ActionType.RESET: {
        return {
          loading: false,
          success: "",
          message: "",
        };
      }

      case RESET_ON_LOGOUT: {
        return {
          loading: false,
          success: "",
          message: "",
        };
      }

      default:
        return state;
    }
  };
};
