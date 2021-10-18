import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Метод получения конкретного лендинга по фильтру

export default async function getLandingDetail(requestData) {
  const response = await axios.post('api/v1/landings/detail', requestData);
  return response.data.data;
}
