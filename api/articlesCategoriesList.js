import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Метод получения фильтров для страницы Журнала

export default async function getArticlesCategoriesList(requestData) {
  const response = await axios.post('api/v1/articles/categories/list', requestData);
  return response.data.data;
}
