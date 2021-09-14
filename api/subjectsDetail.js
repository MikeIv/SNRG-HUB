import { axiosCreate } from '~/axios/axios'

const axios = axiosCreate()

// Метод получения конкретного предмета по фильтру

export default async function getSubjectsDetail(requestData) {
  const response = await axios.post('api/v1/subjects/detail', requestData)
  return response.data.data
}
