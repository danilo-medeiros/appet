import { SET_CURRENT_USER, UNSET_CURRENT_USER, UPDATE_CURRENT_USER } from "../actions/actionTypes";

const initialState = {
  currentUser: null,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser,
      };
    case UNSET_CURRENT_USER:
      return {
        ...state,
        currentUser: null,
      };
    case UPDATE_CURRENT_USER:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...action.currentUser,
        },
      }
    default:
      return state;
  }
}

export default userReducer;