import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Метод получения фильтров для страницы Журнала

export default async function getArticlesFilters(requestData) {
  const response = await axios.post('api/v1/filters/articles/catalog', requestData);
  return response.data.data;
}
