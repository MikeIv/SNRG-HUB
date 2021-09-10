import { axios } from '~/axios/axios'

export const getPageInfo = async (data) => {
  try {
    const response = await axios.get('/api/v1/page', data)
    return response.data
  } catch (e) {
    console.error(e)
  }
}
