import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Метод получения списка вопросов

export default async function getQuestionsList(requestData) {
  const response = await axios.post('api/v1/tests/detail ', requestData);
  return response.data.data;
}
