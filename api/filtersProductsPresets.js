import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Метод получения пресетов фильтра
// Входных параметров для запроса нет

export default async function getFiltersProductPresets() {
  const response = await axios.post('api/v1/filters/products/presets');
  return response.data.data;
}
