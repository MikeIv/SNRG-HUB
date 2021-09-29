import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Метод получения секций продукта по фильтру

export default async function getEntitiesSectionsList(requestData) {
  const response = await axios.post('api/v1/entities/sections/list', requestData);
  return response.data.data;
}
