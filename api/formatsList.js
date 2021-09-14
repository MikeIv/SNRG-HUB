import { axiosCreate } from '~/axios/axios'

const axios = axiosCreate()

// Метод получения форматов обучения по фильтру
// Поля доступные для сортировки: id, name

export default async function getFormatsList(requestData) {
  const response = await axios.post('api/v1/formats/list', requestData)
  return response.data.data
}
