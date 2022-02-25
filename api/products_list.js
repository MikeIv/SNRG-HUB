import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Метод получения продуктов по фильтру

export default async function getProductsList(requestData, url) {
  const response = await axios.post(url, requestData);
  return response.data;
}
