import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();
const token = '2fb147f4c25d2e615e58b408079f888fcdca7cd3';

export default async function getCityByIp(ip) {
  const response = await axios({
    method: 'get',
    mode: 'cors',
    url: `https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=${ip}`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Token ${token}`,
    },
  });
  return response.data;
}
