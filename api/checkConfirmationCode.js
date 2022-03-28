import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

export default async function checkConfirmationCode(requestData) {
  // eslint-disable-next-line max-len
  const response = await axios.post('https://pass.synergy.ru/code-service/api/v1/public/code/check', requestData);
  return response.data;
}
