import { getData } from '../helpers/Storage';
import { apiPath } from '../helpers';

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

const checkOptions = options => {
  return {
    ...options,
    page: options.page ? options.page : DEFAULT_PAGE,
    per_page: options.per_page ? options.per_page : DEFAULT_PER_PAGE,
  };
};

const optionsToQuery = options => {
  return Object.keys(options)
    .map(key => `${key}=${options[key]}`)
    .join('&');
};

const ransackParams = params => {
  if (!params) {
    return '';
  }
  return Object.keys(params)
    .map(key => `q[${key}_eq]=${params[key]}`)
    .join('&');
};

const buildUrl = (path, options) => {
  const { ransack, ...otherParams } = options;
  const optionsQuery = optionsToQuery(checkOptions(otherParams));
  const ransackQuery = ransackParams(ransack);
  return `${path}?${optionsQuery}&${ransackQuery}`;
};

const getAds = async (options = {}) => {
  const src = buildUrl(`${apiPath()}/ads`, options);

  const response = await fetch(src, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (response.status !== 200) {
    throw new Error('Não foi possível ver os anúncios');
  }
  return await response.json();
};

const getAd = async id => {
  const response = await fetch(`${apiPath()}/ads/${id}`, {
    headers: {
      Accept: 'application/json',
    },
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

  const response = await fetch(`${apiPath()}/ads/${adId}/picture`, {
    method: 'POST',
    headers: {
      Authorization: authToken,
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  });

  if (response.status !== 200) {
    throw new Error('Não foi possível realizar o upload da imagem');
  }
  return await response.json();
};

const saveAd = async ad => {
  const authToken = await getData('token');
  const response = await fetch(`${apiPath()}/ads`, {
    method: 'POST',
    body: JSON.stringify(ad),
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
      Authorization: authToken,
    },
  });
  if (response.status !== 201) {
    throw new Error('Não foi possível inserir o anúncio');
  }
  return await response.json();
};

const updateAd = async ad => {
  const authToken = await getData('token');
  const response = await fetch(`${apiPath()}/ads/${ad.id}`, {
    method: 'PUT',
    body: JSON.stringify(ad),
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
      Authorization: authToken,
    },
  });
  if (response.status !== 200) {
    throw new Error('Não foi possível atualizar o anúncio');
  }
  return await response.json();
};

export { getAds, saveAd, uploadImage, getAd, updateAd };
