import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

export default async function getProductInfo(requestData) {
  const response = await axios.get(
    // eslint-disable-next-line max-len
    `https://release-011-2327.c4.syndev.ru/api/v1/products?filter[slug]=${requestData.slug}&include=formats,offers,levels,seoTag,category,organization`,
    requestData,
  );

  return response.data;
}
