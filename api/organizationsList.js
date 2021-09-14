import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Метод получения организаций по фильтру

export default async function getOrganizationsList(requestData) {
  const response = await axios.post('api/v1/organizations/list', requestData);
  return response.data.data;
}
