import { SET_ADS } from "../actions/actionTypes";

const initialState = {
  ads: [],
  selectedAd: null,
  currentPage: 1,
};

const adsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADS:
      return {
        ...state,
        ads: action.currentPage === 1
          ? action.ads
          : state.ads.concat(action.ads),
        currentPage: action.currentPage,
      };
    default:
      return state;
  }
};

export default adsReducer;