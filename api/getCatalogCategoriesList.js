import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Метод получения категорий по фильтру

export default async function getCatalogCategoriesList(requestData) {
  const response = await axios.post('api/v1/categories/list', requestData);
  return response.data.data;
}
