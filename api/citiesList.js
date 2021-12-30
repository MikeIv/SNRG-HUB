import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Метод получения списка городов

export default async function getCitiesList(requestData) {
  const response = await axios.post('api/v1/cities/list', requestData);
  return response.data.data;
}
