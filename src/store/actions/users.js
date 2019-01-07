import {
  SET_CURRENT_USER,
  UNSET_CURRENT_USER,
  UPDATE_CURRENT_USER,
} from "./actionTypes";
import { sendCredentials, register, signUp } from "../../api";
import { uiStartLoading, uiStopLoading } from "./ui";
import { storeData, getData, removeData } from "../../helpers/Storage";

export const login = (credentials) => {
  return dispatch => {
    dispatch(uiStartLoading());
    sendCredentials(credentials)
      .then(authResponse => storeData('token', authResponse.token))
      .then(token => register(token))
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

export const getCurrentUser = () => {
  return dispatch => {
    getData('token')
      .then(token => register(token))
      .then(registerResponse => dispatch(setCurrentUser(registerResponse)))
      .catch(error => alert(error.message));
  };
};

const setCurrentUser = (currentUser) => {
  return {
    currentUser,
    type: SET_CURRENT_USER,
  }
};

export const updateCurrentUser = (currentUser) => {
  return {
    currentUser,
    type: UPDATE_CURRENT_USER,
  };
};

const unsetCurrentUser = () => {
  return {
    type: UNSET_CURRENT_USER,
  };
};

export const deleteToken = () => {
  return dispatch => {
    removeData('token')
      .then(() => dispatch(unsetCurrentUser()))
      .catch(error => alert(error.message));
  }
}
