import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Метод получения главного меню по фильтру

export default async function getMenuMain(requestData) {
  const response = await axios.post('api/v1/menu/main', requestData);
  return response.data.data;
}
