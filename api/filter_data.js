import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Метод получения фильтра
// Поля доступные для сортировки: id, name

export default async function getFilterData(requestData) {
  const response = await axios.post(
    'https://ogm-1481-test-2397.c4.syndev.ru/api/v1/filters/products/catalog',
    requestData,
  );
  return response.data.data;
}
