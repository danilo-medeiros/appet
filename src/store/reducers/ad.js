import { SET_ADS, SELECT_AD, SET_PROFILE_ADS } from '../actions/actionTypes';

const initialState = {
  ads: {
    records: [],
    count: 0,
    current_page: 1,
    canLoadMore: true,
    per_page: 10,
  },
  profileAds: {
    records: [],
    count: 0,
    current_page: 1,
    canLoadMore: true,
    per_page: 10,
  },
  selectedAd: null,
};

const adsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADS:
      return {
        ...state,
        ads: {
          ...state.ads,
          records:
            action.current_page === 1
              ? action.ads
              : action.ads.records.concat(state.ads.records),
          count: action.ads._pagination.count,
          current_page: action.ads._pagination.current_page,
          canLoadMore:
            action.ads._pagination.count >
            state.ads.perPage * action.ads._pagination.current_page,
        },
      };
    case SELECT_AD:
      return {
        ...state,
        selectedAd: action.ad,
      };
    case SET_PROFILE_ADS:
      return {
        ...state,
        profileAds: {
          ...state.profileAds,
          records:
            action.current_page === 1
              ? action.profileAds
              : action.profileAds.records.concat(state.profileAds.records),
          count: action.profileAds.count,
          current_page: action.profileAds.current_page,
          canLoadMore:
            action.ads._pagination.count >
            state.ads.perPage * action.ads._pagination.current_page,
        },
      };
    default:
      return state;
  }
};

export default adsReducer;
