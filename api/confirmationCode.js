import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

export default async function getConfirmationCode(requestData) {
  // eslint-disable-next-line max-len
  const response = await axios.post(
    'https://ogm-111-2795.c4.syndev.ru/code-service/api/v1/public/code/send',
    requestData,
  );
  return response.data;
}
