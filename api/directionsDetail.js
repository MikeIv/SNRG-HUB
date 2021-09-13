import { axiosCreate } from '~/axios/axios'

const axios = axiosCreate()

// Метод получения конкретного направления по фильтру

export default async function getDirectionsDetail(requestData) {
  const response = await axios.post('api/v1/directions/detail', requestData)
  return response.data.data
}
