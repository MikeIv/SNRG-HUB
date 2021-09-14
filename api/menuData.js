import { axiosCreate } from '~/axios/axios'

const axios = axiosCreate()

// Метод получения меню

export default async function getMenuData(requestData) {
  const response = await axios.post('api/v1/menu', requestData)
  return response.data.data
}
