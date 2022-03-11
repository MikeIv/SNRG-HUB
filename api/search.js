import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Метод получения результатов поиска

export default async function getSearch(requestData) {
  const response = await axios.post('api/v1/search', requestData);
  return response.data;
}
