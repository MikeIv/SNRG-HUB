import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Метод получения продуктов по фильтру

export default async function getSectionInfo(requestData) {
  const response = await axios.get(
    // eslint-disable-next-line max-len
    `api/v1/entity-sections?filter[slug]=${requestData.slug}&filter[entity_type]=App\\Models\\Organization&filter[api_key]=${requestData.key}`,
    requestData,
  );
  console.log('here sectionInfo', response);
  return response.data;
}
