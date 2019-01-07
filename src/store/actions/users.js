import {
  SET_CURRENT_USER,
  UNSET_CURRENT_USER,
  UPDATE_CURRENT_USER,
  CLEAN_AUTH_DATA,
  SET_TOKEN
} from "./actionTypes";
import { sendCredentials, register, signUp } from "../../api";
import { uiStartLoading, uiStopLoading } from "./ui";

export const login = (credentials) => {
  return dispatch => {
    dispatch(uiStartLoading());
    sendCredentials(credentials)
      .then(authResponse => register(authResponse.token))
      .then(registerResponse => {
        dispatch(uiStopLoading());
        dispatch(setCurrentUser(registerResponse));
      })
      .catch(error => {
        alert(error.message);
        dispatch(uiStopLoading());
      });
  };
};

export const insertUser = (user) => {
  return dispatch => {
    dispatch(uiStartLoading());
    signUp(user)
      .then(signUpResponse => register(signUpResponse.auth_token))
      .then(registerResponse => {
        dispatch(uiStopLoading());
        dispatch(setCurrentUser(registerResponse));
      })
      .catch(error => {
        alert(error.message);
        dispatch(uiStopLoading());
      });
  };
}

export const setCurrentUser = (currentUser) => {
  return {
    currentUser,
    type: SET_CURRENT_USER,
  }
};

export const unsetCurrentUser = () => {
  return {
    type: UNSET_CURRENT_USER,
  };
};

export const updateCurrentUser = (currentUser) => {
  return {
    currentUser,
    type: UPDATE_CURRENT_USER,
  };
};

export const cleanAuthData = () => {
  return {
    type: CLEAN_AUTH_DATA,
  };
};

export const setToken = (token) => {
  return {
    token,
    type: SET_TOKEN,
  };
};
