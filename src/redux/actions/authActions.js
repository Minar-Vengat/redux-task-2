import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "../types";
export const loginRequest = (payload) => ({
  type: LOGIN_REQUEST,
  payload,
});
export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});
export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});
