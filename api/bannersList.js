import { axiosCreate } from '~/axios/axios'

const axios = axiosCreate()

// Метод получения баннеров по фильтру
// Поля доступные для сотировки: id, name, sort

export default async function getBannersList(requestData) {
  const response = await axios.post('api/v1/banners/list', requestData)
  return response.data.data
}
