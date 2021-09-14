import { axiosCreate } from '~/axios/axios'

const axios = axiosCreate()

// Метод получения секций организации по фильтру

export default async function getOrganizationsSectionsList(requestData) {
  const response = await axios.post('api/v1/organizations/sections/list', requestData)
  return response.data.data
}
