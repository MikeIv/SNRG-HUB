import { axiosCreate } from '~/axios/axios'

const axios = axiosCreate()

// Метод получения продуктов по фильтру

export default async function getProductsList(requestData) {
  const response = await axios.post('api/v1/products/list', requestData)
  return response.data
}