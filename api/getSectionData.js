import { axios } from '~/axios/axios'

export const getSectionData = async ({ url, data }) => {
  try {
    const response = await axios.get(`${url}`, data)
    return response.data
  } catch (e) {
    console.error(e)
    return {}
  }
}
