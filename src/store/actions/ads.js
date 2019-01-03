import { INSERT_AD, UPDATE_AD, SELECT_AD, DELETE_AD, DESELECT_AD } from "./actionTypes";

export const insertAd = (ad) => {
  return {
    ad,
    type: INSERT_AD,
  }
};

export const updateAd = (ad) => {
  return {
    ad,
    type: UPDATE_AD,
  }
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
