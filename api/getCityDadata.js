import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();
const token = process.env.DADATA_KEY;

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
