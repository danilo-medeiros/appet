import {
  SET_CURRENT_USER,
  UNSET_CURRENT_USER,
  UPDATE_CURRENT_USER,
} from './actionTypes';
import { sendCredentials, register, signUp, updateUser, refresh } from '../../api';
import { uiStartLoading, uiStopLoading } from './ui';
import { storeData, getData, removeData } from '../../helpers/Storage';

export const login = credentials => {
  return async dispatch => {
    dispatch(uiStartLoading());
    try {
      const authResponse = await sendCredentials(credentials);
      await storeData('token', authResponse.token);
      const registerResponse = await register(authResponse.token);
      dispatch(uiStopLoading());
      dispatch(setCurrentUser(registerResponse));
    } catch (error) {
      alert(error.message);
      dispatch(uiStopLoading());
    }
  };
};

export const insertUser = user => {
  return async dispatch => {
    try {
      dispatch(uiStartLoading());
      const signUpResponse = await signUp(user);
      await storeData('token', signUpResponse.auth_token);
      const registerResponse = await register(signUpResponse.auth_token);
      dispatch(uiStopLoading());
      dispatch(setCurrentUser(registerResponse));
    } catch (error) {
      alert(error.message);
      dispatch(uiStopLoading());
    }
  };
};

export const updateCurrentUser = user => {
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
};

export const getCurrentUser = () => {
  return async dispatch => {
    try {
      const token = await getData('token');
      const registeredUser = await register(token);
      dispatch(setCurrentUser(registeredUser));
      return registeredUser;
    } catch (error) {
      alert(error.message);
    }
  };
};

export const refreshRegister = () => {
  return async dispatch => {
    try {
      const token = await getData('token');
      const newToken = await refresh(token).token;
      await storeData('token', newToken);
      const registeredUser = await register(newToken);
      dispatch(setCurrentUser(registeredUser));
      return registeredUser;
    } catch (error) {
      alert(error.message);
    }
  }
}

const setCurrentUser = currentUser => {
  return {
    currentUser,
    type: SET_CURRENT_USER,
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
  };
};
