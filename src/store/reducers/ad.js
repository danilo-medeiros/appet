import {
  SET_ADS,
  SELECT_AD,
  SET_PROFILE_ADS,
  DESELECT_AD,
} from '../actions/actionTypes';

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
      const total =
        action.ads._pagination.current_page === 1
          ? action.ads.records.length
          : state.ads.records.length + action.ads.records.length;

      return {
        ...state,
        ads: {
          ...state.ads,
          ...action.ads._pagination,
          records:
            action.ads._pagination.current_page === 1
              ? action.ads.records
              : state.ads.records.concat(action.ads.records),
          canLoadMore: total < action.ads._pagination.count,
        },
      };
    case SELECT_AD:
      return {
        ...state,
        selectedAd: action.ad,
      };
    case DESELECT_AD:
      return {
        ...state,
        selectedAd: null,
      };
    case SET_PROFILE_ADS:
      return {
        ...state,
        profileAds: {
          ...state.profileAds,
          ...action.profileAds._pagination,
          records:
            action.profileAds._pagination.current_page === 1
              ? action.profileAds.records
              : action.profileAds.records.concat(state.profileAds.records),
          canLoadMore:
            action.profileAds._pagination.count >
            state.profileAds.per_page *
              action.profileAds._pagination.current_page,
        },
      };
    default:
      return state;
  }
};

export default adsReducer;
