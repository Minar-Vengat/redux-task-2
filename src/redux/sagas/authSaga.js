
import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { LOGIN_REQUEST } from "../types";
import { loginSuccess, loginFailure } from "../actions/authActions";
function* loginSaga(action) {
  try {
    const response = yield call(axios.get, "https://hastin-container.com/staging/app/auth/login");
    const users = response.data;
    const user = users.find(
      (u) =>
        u.username === action.payload.username &&
        u.password === action.payload.password
    );
    if (user) {
      yield put(loginSuccess(user));
      alert("Login Success ");
    } else {
      yield put(loginFailure("Invalid username or password "));
    }
  } catch (error) {
    yield put(loginFailure("Something went wrong "));
  }
}
export default function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}
