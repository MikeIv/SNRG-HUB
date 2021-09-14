import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Метод получения конкретной организации по фильтру

export default async function getOrganizationsDetail(requestData) {
  const response = await axios.post('api/v1/organizations/detail', requestData);
  return response.data.data;
}
