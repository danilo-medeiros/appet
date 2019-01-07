import { API_PATH } from "../constants";
import { getData } from "../helpers/Storage";

const getAds = async (options) => {
  const response = await fetch(`${API_PATH}ads?page=${options.currentPage}`, {
    headers: {
      'Accept': 'application/json',
    }
  });
  if (response.status !== 200) {
    throw new Error('Não foi possível ver os anúncios');
  }
  return await response.json();
};

const uploadImage = async (adId, image) => {
  const authToken = await getData('token');
  const formData = new FormData();

  console.log(image.uri);
  console.log(image.type);
  console.log(image.name);

  formData.append('file', {
    uri: image.uri,
    type: image.type,
    name: image.name,
  });

  /* formData.append('uri', image.uri);
  formData.append('type', image.type);
  formData.append('name', image.name); */

  const response = await fetch(`${API_PATH}ads/${adId}/picture`, {
    method: 'POST',
    headers: {
      'Authorization': authToken,
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  });

  if (response.status !== 200) {
    throw new Error('Não foi possível realizar o upload da imagem');
  }
  return await response.json();
};

const saveAd = async (ad, method) => {
  const authToken = await getData('token');
  const response = await fetch(`${API_PATH}ads`, {
    method,
    body: JSON.stringify(ad),
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Authorization': authToken,
    },
  });
  if (response.status !== 201) {
    throw new Error('Não foi possível inserir o anúncio');
  }
  return await response.json();
}

export { getAds, saveAd, uploadImage };