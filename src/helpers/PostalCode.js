import { CEP_PATH } from "../constants";

export async function fetchPostalCodeAddress(postalCode) {
  try {
    const response = await fetch(`${CEP_PATH}/${postalCode}/json`);
    const responseJson = await response.json();
    return {
      state: responseJson.uf,
      postalCode: responseJson.cep.replace(/-/g, ''),
      neighborhood: responseJson.bairro,
      city: responseJson.localidade,
    };
  } catch (error) {
    return null;
  }
}

export function isPostalCodeValid(postalCode) {
  return postalCode !== null && postalCode !== undefined && postalCode.length === 8;
}
