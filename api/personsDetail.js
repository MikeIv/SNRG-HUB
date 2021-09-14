import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Метод получения конкретной персоны по фильтру

export default async function getPersonsDetail(requestData) {
  const response = await axios.post('api/v1/persons/detail', requestData);
  return response.data.data;
}
