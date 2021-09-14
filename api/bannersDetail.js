import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Метод получения конкретного баннера по фильтру
// Поля доступные для сортировки: id

export default async function getBannersDetail(requestData) {
  const response = await axios.post('api/v1/banners/detail', requestData);
  return response.data.data;
}
