import { SELECT_AD, DELETE_AD, DESELECT_AD, SET_ADS, SET_PROFILE_ADS } from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "./ui";
import { getAds, saveAd, uploadImage, getAd } from "../../api";

export const updateAd = (ad, image) => {
  return async (dispatch) => {
    dispatch(uiStartLoading());
    try {
      await updateAd(ad);
      console.log(ad);
      if (image) {
        await uploadImage(ad.id, image);
      }
      dispatch(uiStopLoading());
      dispatch(fetchAds({currentPage: 1}));
    } catch (error) {
      console.error(error);
      alert(error.message);
      dispatch(uiStopLoading());
    }
  };
};

export const insertAd = (ad, image) => {
  return async (dispatch) => {
    dispatch(uiStartLoading());
    try {
      const savedAd = await saveAd(ad);
      await uploadImage(savedAd.id, image);
      dispatch(uiStopLoading());
      dispatch(fetchAds({currentPage: 1}));
    } catch (error) {
      console.error(error);
      alert(error.message);
      dispatch(uiStopLoading());
    }
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

export const fetchProfileAds = (options, user_id) => {
  const { currentPage } = options;
  return dispatch => {
    dispatch(uiStartLoading());
    getAds({ currentPage, ransack: { user_id_eq: user_id } })
      .then(res => {
        dispatch(setProfileAds(res.ads ? res.ads : [], res._pagination.current_page));
        dispatch(uiStopLoading());
      })
      .catch(error => {
        alert(error.message);
        dispatch(uiStopLoading());
      });
  };
}

export const fetchAd = (id) => {
  return async dispatch => {
    dispatch(uiStartLoading());
    try {
      const ad = await getAd(id);
      dispatch(selectAd(ad));
      dispatch(uiStopLoading());
    } catch (error) {
      console.error(error);
      alert(error.message);
      dispatch(uiStopLoading());
    }
  };
}

export const setAds = (ads, currentPage) => {
  return {
    ads,
    currentPage,
    type: SET_ADS,
  };
};

export const setProfileAds = (profileAds, currentPage) => {
  return {
    profileAds,
    currentPage,
    type: SET_PROFILE_ADS,
  };
};

export const selectAd = (ad) => {
  return {
    ad,
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
