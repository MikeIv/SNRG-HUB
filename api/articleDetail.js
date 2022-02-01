import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Метод получения конкретного баннера по фильтру
// Поля доступные для сортировки: id

export default async function getArticleDetail(requestData) {
  const response = await axios.post('api/v1/articles/detail', requestData);
  return response.data.data;
}
