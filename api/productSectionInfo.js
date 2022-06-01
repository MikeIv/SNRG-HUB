import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Метод получения продуктов по фильтру

export default async function getProductSectionInfo(requestData) {
  const response = await axios.get(
    // eslint-disable-next-line max-len
    `https://release-011-2327.c4.syndev.ru/api/v1/entity-sections?filter[slug]=${requestData.slug}&filter[entity_type]=App\\Models\\Product&filter[api_key]=${requestData.key}`,
    requestData,
  );
  return response.data.data[0]?.attributes?.data ? JSON.parse(response.data.data[0]?.attributes?.data) : null;
}
