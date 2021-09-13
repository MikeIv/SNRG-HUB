import { axiosCreate } from '~/axios/axios'

const axios = axiosCreate()

// Метод получения направлений по фильтру
// Поля доступные для сотировки: id, name, sort

export default async function getDirectionsList(requestData) {
  const response = await axios.post('api/v1/directions/list', requestData)
  return response.data.data
}
