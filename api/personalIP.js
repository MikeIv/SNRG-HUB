import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Метод получения ip

export default async function getPersonalIP(requestData) {
  const response = await axios.post('api/v1/personal/ip', requestData);
  return response.data.data;
}

// export default async function getPersonalIP(requestData) {
//   const response = await axios.get('https://api.ipify.org?format=json', requestData);
//   return response.data;
// }
