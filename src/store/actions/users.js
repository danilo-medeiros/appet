import { SET_CURRENT_USER, UNSET_CURRENT_USER } from "./actionTypes";

export const setCurrentUser = (currentUser) => {
  return {
    currentUser,
    type: SET_CURRENT_USER,
  }
}

export const unsetCurrentUser = () => {
  return {
    type: UNSET_CURRENT_USER,
  }
}
