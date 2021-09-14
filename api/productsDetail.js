import { axiosCreate } from '~/axios/axios'

const axios = axiosCreate()

// Метод получения конкретного продукта по фильтру

export default async function getProductsDetails(requestData) {
  const response = await axios.post('api/v1/products/detail', requestData)
  return response.data.data
}
