import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Метод получения предметов по фильтру
// Поля доступные для сотировки: id, name

export default async function getSubjectsList(requestData) {
  const response = await axios.post('api/v1/subjects/list', requestData);
  return response.data.data;
}
