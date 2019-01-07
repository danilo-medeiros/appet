import {
  SET_CURRENT_USER,
  UNSET_CURRENT_USER,
  UPDATE_CURRENT_USER,
  CLEAN_AUTH_DATA,
  SET_TOKEN,
  LOGIN,
} from "../actions/actionTypes";

const initialState = {
  currentUser: null,
  token: null,
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
    case CLEAN_AUTH_DATA:
      return {
        ...initialState,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
}

export default userReducer;