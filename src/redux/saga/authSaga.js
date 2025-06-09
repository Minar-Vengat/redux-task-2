import { takeLatest, put } from "redux-saga/effects";
import { LOGIN_REQUEST, loginSuccess, loginFailure } from "../actions/authActions";
import authSaga from "./sagas/authSaga";


function* handleLogin(action) {
  try {
    const { username, password } = action.payload;

    // Mock API call logic (you can replace it with real API later)
    if (username === "admin" && password === "1234") {
      yield put(loginSuccess({ username }));
    } else {
      yield put(loginFailure("Invalid Username.!"));
    }
  } catch (error) {
    yield put(loginFailure("Login failed."));
  }
}

export default function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, handleLogin);
}
