import { all } from "redux-saga/effects";
import { authWatcher } from "./components/action/auth/Saga";

export function* rootSagas() {
  yield all([
    authWatcher(),
  ]);
}
