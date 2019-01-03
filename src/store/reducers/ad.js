import { INSERT_AD, UPDATE_AD, SELECT_AD, DESELECT_AD, DELETE_AD } from "../actions/actionTypes";

const lorem = () => `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed libero justo, auctor non tellus at, sollicitudin cursus turpis. Fusce a lacus sed odio vestibulum iaculis vel a leo. In imperdiet ultricies bibendum. Proin pellentesque, lectus quis vulputate porttitor, purus augue euismod risus, sed luctus ligula nisl quis urna. Ut eget sem leo. Duis sit amet lacus interdum, ornare arcu id, bibendum quam. Donec blandit nulla nisl, sed molestie augue luctus id. Donec facilisis ex consectetur tristique facilisis.`;

const initialState = {
  ads: [
    {
      key: '1',
      title: 'Gato persa',
      pet_type: 'cat',
      weight: 2,
      aprox_age: 2,
      phone_number: '84992120696',
      description: lorem(),
      city: 'Parnamirim',
      state: 'RN',
      neighborhood: 'Monte Castelo',
      datetime: '8 de junho, 22:10',
      img: 'https://picsum.photos/200/200/?random',
    },
  ],
  selectedAd: null,
};

const adsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INSERT_AD:
      return {
        ...state,
        ads: state.ads.concat({
          key: Math.random(),
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
    case SELECT_AD:
      return {
        ...state,
        selectedAd: state.ads.find(ad => ad.key === action.adKey),
      };
    case DESELECT_AD:
      return {
        ...state,
        selectedAd: null,
      };
    case DELETE_AD:
      return {
        ...state,
        ads: state.ads.filter(ad => {
          return ad.key !== action.adKey;
        }),
        selectedAd: null,
      };
    default:
      return state;
  }
};

export default adsReducer;