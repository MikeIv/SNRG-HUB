import { axiosCreate } from '~/axios/axios'

const axios = axiosCreate()

// Метод получения конкретного квиза по фильтру
// Поля доступные для сортировки: id

export default async function getQuizzesDetail(requestData) {
  const response = await axios.post('api/v1/quizzes/detail', requestData)
  return response.data.data
}
