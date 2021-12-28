import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();
const token = '2fb147f4c25d2e615e58b408079f888fcdca7cd3';
// const token = process.env.DADATA_KEY;

export default async function getCityByStr(str) {
  const response = await axios({
    method: 'post',
    url: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Token ${token}`,
    },
    data: {
      query: str,
      from_bound: { value: 'city' },
      to_bound: { value: 'city' },
    },
  });
  return response.data;
}
