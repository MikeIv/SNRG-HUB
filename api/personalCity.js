import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();
const token = process.env.DADATA_KEY;

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
