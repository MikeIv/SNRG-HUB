import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Метод получения списка вопросов

export default async function getQuestionsList(requestData) {
  const response = await axios.post('api/v1/type_thinkings/list', requestData);
  return response.data.data;
}
