import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Метод получения конкретной секции страницы по фильтру: pages/sections/detail

export default async function getPageSectionDetail(requestData) {
  const response = await axios.post('api/v1/pages/sections/detail', requestData);
  return response.data.data;
}
