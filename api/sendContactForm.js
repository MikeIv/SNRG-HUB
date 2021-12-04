import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Метод для отправки писем

export default async function sendContactForm(requestData) {
  const response = await axios.post('api/v1/forms/contact/send', requestData);
  return response.data;
}
