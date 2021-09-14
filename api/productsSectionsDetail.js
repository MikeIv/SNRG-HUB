import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Метод получения конкретной секции продукта по фильтру

export default async function getProductsSectionsDetail(requestData) {
  const response = await axios.post('api/v1/products/sections/detail', requestData);
  return response.data.data;
}
