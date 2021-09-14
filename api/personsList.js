import { axiosCreate } from '~/axios/axios'

const axios = axiosCreate()

//Метод получения персон по фильтру
//

export default async function getPersonsList(requestData) {
    const response = await axios.post('api/v1/persons/list', requestData)
    return response.data.data
}
