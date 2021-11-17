import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Метод получения отфильтрованных продуктов

export default async function getSearchProducts(requestData) {
  const response = await axios.post('api/v1/products/search', requestData);
  return response.data;
}
