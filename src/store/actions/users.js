import {
  SET_CURRENT_USER,
  UNSET_CURRENT_USER,
  UPDATE_CURRENT_USER,
  CLEAN_AUTH_DATA,
  SET_TOKEN
} from "./actionTypes";

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
