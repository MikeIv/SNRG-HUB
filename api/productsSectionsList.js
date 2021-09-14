import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Метод получения секций продукта по фильтру

export default async function getProductsSectionsList(requestData) {
  const response = await axios.post('api/v1/products/sections/list', requestData);
  return response.data.data;
}
