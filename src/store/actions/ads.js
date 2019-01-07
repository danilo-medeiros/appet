import { SELECT_AD, DELETE_AD, DESELECT_AD, SET_ADS } from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "./ui";
import { getAds, saveAd } from "../../api";
import { uploadImage } from "../../api/Ad";

export const updateAd = (ad, onAdUpdated) => {
  return dispatch => {
    dispatch(uiStartLoading());
    saveAd(ad, 'POST')
      .then(() => {
        dispatch(fetchAds({currentPage: 1}));
        dispatch(uiStopLoading());
        if (onAdInserted) {
          onAdUpdated();
        }
      })
      .catch(error => {
        alert(error.message);
        dispatch(uiStopLoading());
      });
  };
};

export const insertAd = (ad, image, onAdInserted) => {
  return dispatch => {
    dispatch(uiStartLoading());
    saveAd(ad, 'POST')
      .then(ad => uploadImage(ad.id, image))
      .then(() => {
        dispatch(fetchAds({currentPage: 1}));
        dispatch(uiStopLoading());
        if (onAdInserted) {
          onAdInserted();
        }
      })
      .catch(error => {
        alert(error.message);
        dispatch(uiStopLoading());
      });
  };
};

export const fetchAds = (options) => {
  return dispatch => {
    dispatch(uiStartLoading());
    getAds(options)
      .then(res => {
        dispatch(setAds(res.ads ? res.ads : [], res._pagination.current_page));
        dispatch(uiStopLoading());
      })
      .catch(error => {
        alert(error.message);
        dispatch(uiStopLoading());
      });
  };
}

export const setAds = (ads, currentPage) => {
  return {
    ads,
    currentPage,
    type: SET_ADS,
  };
};

export const selectAd = (key) => {
  return {
    adKey: key,
    type: SELECT_AD,
  }
};

export const deselectAd = () => {
  return {
    type: DESELECT_AD,
  }
};

export const deleteAd = () => {
  return {
    type: DELETE_AD,
  }
};
