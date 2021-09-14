import { axiosCreate } from '~/axios/axios'

const axios = axiosCreate()

// Метод получения конкретной формы обучения по фильтру
// Поля доступные для сортировки: id

export default async function getFormatsDetail(requestData) {
  const response = await axios.post('api/v1/formats/detail', requestData)
  return response.data.data
}
