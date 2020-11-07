import login from "./Login";
import register from "./Register";
import allUser from "./allUser";

import { fork } from "redux-saga/effects";

export default function* rootSaga() {
  yield fork(login);
  yield fork(register);
 
  yield fork(allUser);
}
