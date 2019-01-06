import { CEP_PATH } from "../constants";

const fetchPostalCodeAddress = async function(postalCode) {
  try {
    const response = await fetch(`${CEP_PATH}${postalCode}/json`);
    const responseJson = await response.json();
    return {
      state: responseJson.uf,
      postal_code: responseJson.cep.replace(/-/g, ''),
      neighborhood: responseJson.bairro,
      city: responseJson.localidade,
    };
  } catch (error) {
    return null;
  }
}

const isPostalCodeValid = function(postalCode) {
  return postalCode !== null && postalCode !== undefined && postalCode.length === 8;
}

export { fetchPostalCodeAddress, isPostalCodeValid };