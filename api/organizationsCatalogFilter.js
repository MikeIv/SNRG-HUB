import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Метод получения фильтра организаций

export default async function getOrganizationsCatalogFilter(requestData) {
  const response = await axios.post('api/v1/filters/organizations/catalog', requestData);
  return response.data.data;
}
