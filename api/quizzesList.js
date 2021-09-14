import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Метод получения квизов по фильтру

export default async function getQuizzesList(requestData) {
  const response = await axios.post('api/v1/quizzes/list', requestData);
  return response.data.data;
}
