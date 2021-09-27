import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Метод получения продуктов на главной странице
//

export default async function getPersonsList(requestData) {
  const response = await axios.post('api/v1/filters/products/main', requestData);
  return response.data.data;
}
