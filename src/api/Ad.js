import { getData } from "../helpers/Storage";
import { apiPath } from "../helpers";

const ransackParams = (params) => {
  let src = '';
  if (params) {
    src += '&';
    for (let key in params) {
      src += `q[${key}]=${params[key]}`;
    }
  }
  return src;
}

const getAds = async (options) => {
  const src = `${apiPath()}ads?page=${options.currentPage}${ransackParams(options.ransack)}`;

  const response = await fetch(src, {
    headers: {
      'Accept': 'application/json',
    },
  });

  if (response.status !== 200) {
    throw new Error('Não foi possível ver os anúncios');
  }
  return await response.json();
};

const getAd = async (id) => {
  const response = await fetch(`${apiPath()}ads/${id}`, {
    headers: {
      'Accept': 'application/json',
    }
  });
  if (response.status !== 200) {
    throw new Error('Não foi possível ver o anúncio');
  }
  return await response.json();
};

const uploadImage = async (adId, image) => {
  const authToken = await getData('token');
  const formData = new FormData();

  formData.append('file', {
    uri: image.uri,
    type: image.type,
    name: image.name,
  });

  const response = await fetch(`${apiPath()}ads/${adId}/picture`, {
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

const saveAd = async (ad) => {
  const authToken = await getData('token');
  const response = await fetch(`${apiPath()}ads`, {
    method: 'POST',
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

const updateAd = async (ad) => {
  const authToken = await getData('token');
  const response = await fetch(`${apiPath()}ads/${ad.id}`, {
    method: 'PUT',
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

export { getAds, saveAd, uploadImage, getAd, updateAd };