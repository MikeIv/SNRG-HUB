import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Метод получения категорий по фильтру

export default async function getCatalogCategoriesList() {
  const response = await axios.post('api/v1/categories/list');
  return response.data.data;
}
