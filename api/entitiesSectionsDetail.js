import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Метод получения конкретной секции страницы по фильтру

export default async function getEntitiesSectionsDetail(requestData) {
  const response = await axios.post('api/v1/entities/sections/detail', requestData);
  return response.data.data;
}
