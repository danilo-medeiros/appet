import { SET_ADS, SELECT_AD, SET_PROFILE_ADS } from "../actions/actionTypes";

const initialState = {
  ads: [],
  selectedAd: null,
  currentPage: 1,
  profileAds: [],
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
    case SELECT_AD:
      return {
        ...state,
        selectedAd: action.ad,
      };
    case SET_PROFILE_ADS:
      return {
        ...state,
        profileAds: action.profileAds,
      };
    default:
      return state;
  }
};

export default adsReducer;