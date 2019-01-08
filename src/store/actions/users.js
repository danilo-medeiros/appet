import {
  SET_CURRENT_USER,
  UNSET_CURRENT_USER,
  UPDATE_CURRENT_USER,
} from "./actionTypes";
import { sendCredentials, register, signUp, updateUser } from "../../api";
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

export const updateCurrentUser = (user) => {
  return async dispatch => {
    dispatch(uiStartLoading());
    try {
      const updatedUser = await updateUser(user);
      dispatch(setCurrentUser(updatedUser));
    } catch (error) {
      alert(error.message);
    }
    dispatch(uiStopLoading());
  };
}

export const getCurrentUser = () => {
  return async dispatch => {
    try {
      const token = await getData('token');
      const registeredUser = await register(token);
      dispatch(setCurrentUser(registeredUser));
    } catch (error) {
      alert(error.message); 
    }
  };
};

const setCurrentUser = (currentUser) => {
  return {
    currentUser,
    type: SET_CURRENT_USER,
  }
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
