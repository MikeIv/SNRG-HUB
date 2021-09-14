import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Метод получения конкретной секции организации по фильтру

export default async function getOrganizationsSectionsDetail(requestData) {
  const response = await axios.post('api/v1/organizations/sections/detail', requestData);
  return response.data.data;
}
