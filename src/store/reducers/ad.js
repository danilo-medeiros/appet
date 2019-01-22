import {
  SET_ADS,
  SELECT_AD,
  SET_PROFILE_ADS,
  DESELECT_AD,
  SET_AD_FILTER,
} from '../actions/actionTypes';

const initialState = {
  filter: {
    order_by: 'created_at',
    asc: false,
  },
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
      const totalAds =
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
          canLoadMore: totalAds < action.ads._pagination.count,
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
      const totalProfileAds =
        action.profileAds._pagination.current_page === 1
          ? action.profileAds.records.length
          : state.profileAds.records.length + action.profileAds.records.length;

      return {
        ...state,
        profileAds: {
          ...state.profileAds,
          ...action.profileAds._pagination,
          records:
            action.profileAds._pagination.current_page === 1
              ? action.profileAds.records
              : state.profileAds.records.concat(action.profileAds.records),
          canLoadMore: totalProfileAds < action.profileAds._pagination.count,
        },
      };
    case SET_AD_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.filter,
        },
      };
    default:
      return state;
  }
};

export default adsReducer;
