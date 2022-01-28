import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Метод получения списка статей по фильтру

export default async function getArticlesList(requestData) {
  const response = await axios.post('api/v1/articles/list', requestData);
  return response.data;
}
