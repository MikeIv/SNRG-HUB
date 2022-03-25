import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Метод получения категорий по фильтру

export default async function getLevelsList(requestData) {
  const response = await axios.post('api/v1/levels/list', requestData);
  return response.data.data;
}
