import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Универсальный метод для любой секции, который принимает url и requestData и отдает промис
// Пока решил оставить его, вдруг понадобится

export default async function getSectionData({ url, data }) {
  const response = await axios.post(url, data);
  return response.data;
}
