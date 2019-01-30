import {
  SELECT_AD,
  DELETE_AD,
  DESELECT_AD,
  SET_ADS,
  SET_PROFILE_ADS,
  SET_AD_FILTER,
} from './actionTypes';
import { uiStartLoading, uiStopLoading } from './ui';
import {
  getAds,
  saveAd,
  uploadImage,
  getAd,
  updateAd as editAd,
} from '../../api';
import { showSnackbar } from '../../helpers';

export const updateAd = (ad, image) => {
  return async dispatch => {
    dispatch(uiStartLoading());
    try {
      await editAd(ad);
      if (image) {
        await uploadImage(ad.id, image);
      }
      dispatch(fetchAd(ad.id));
      dispatch(fetchAds({ current_page: 1 }));
    } catch (error) {
      console.log(error);
      dispatch(uiStopLoading());
    }
  };
};

export const insertAd = (ad, image) => {
  return async dispatch => {
    dispatch(uiStartLoading());
    try {
      const savedAd = await saveAd(ad);
      await uploadImage(savedAd.id, image);
      dispatch(uiStopLoading());
      dispatch(fetchAds({ current_page: 1 }));
    } catch (error) {
      console.error(error);
      alert(error.message);
      dispatch(uiStopLoading());
    }
  };
};

export const fetchAds = options => {
  return async dispatch => {
    dispatch(uiStartLoading());
    try {
      const res = await getAds(options);
      dispatch(setAds(res));
    } catch (error) {
      console.log(error);
      showSnackbar(error.message);
    }
    dispatch(uiStopLoading());
  };
};

export const fetchProfileAds = options => {
  return async dispatch => {
    dispatch(uiStartLoading());
    try {
      const res = await getAds(options);
      dispatch(setProfileAds(res));
      dispatch(uiStopLoading());
    } catch (error) {
      console.log(error);
      dispatch(uiStopLoading());
    }
  };
};

export const fetchAd = id => {
  return async dispatch => {
    dispatch(uiStartLoading());
    dispatch(deselectAd());
    try {
      const ad = await getAd(id);
      dispatch(selectAd(ad));
      dispatch(uiStopLoading());
    } catch (error) {
      console.log(error);
      dispatch(uiStopLoading())  ;
    }
  };
};

export const setAds = ads => {
  return {
    ads,
    type: SET_ADS,
  };
};

export const setProfileAds = profileAds => {
  return {
    profileAds,
    type: SET_PROFILE_ADS,
  };
};

export const selectAd = ad => {
  return {
    ad,
    type: SELECT_AD,
  };
};

export const deselectAd = () => {
  return {
    type: DESELECT_AD,
  };
};

export const setFilter = filter => {
  return {
    filter,
    type: SET_AD_FILTER,
  };
};

const deleteAd = () => {
  return {
    type: DELETE_AD,
  };
};
