import { INSERT_AD, UPDATE_AD, SELECT_AD, DESELECT_AD, DELETE_AD } from "../actions/actionTypes";

const initialState = {
  ads: [],
};

let currentKey = 1;

const adsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INSERT_AD:
      return {
        ...state,
        ads: state.ads.concat({
          key: ++currentKey,
          createdAt: new Date().toLocaleDateString(),
          ...action.ad,
          img: 'https://picsum.photos/200/200/?random',
        }),
      };
    case UPDATE_AD:
      return {
        ...state,
        ads: state.ads.map(ad => {
          if (ad.key === action.ad.key) {
            return action.ad;
          }
          return ad;
        })
      };
    default:
      return state;
  }
};

export default adsReducer;