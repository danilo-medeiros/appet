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

const actionHandlers = {
  [SET_ADS](state, action) {
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
  },
  [SELECT_AD](state, action) {
    return {
      ...state,
      selectedAd: action.ad,
    };
  },
  [DESELECT_AD](state, action) {
    return {
      ...state,
      selectedAd: null,
    };
  },
  [SET_PROFILE_ADS](state, action) {
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
  },
  [SET_AD_FILTER](state, action) {
    return {
      ...state,
      filter: {
        ...state.filter,
        ...action.filter,
      },
    };
  },
};

const adsReducer = (state = initialState, action) => {
  if (actionHandlers[action.type]) {
    return actionHandlers[action.type](state, action);
  }
  return state;
};

export default adsReducer;
