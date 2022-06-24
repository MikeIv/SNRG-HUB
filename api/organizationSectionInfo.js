import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Метод получения продуктов по фильтру

export default async function getOrganizationSectionInfo(requestData) {
  const response = await axios.get(
    // eslint-disable-next-line max-len
    `api/v1/entity-sections?filter[slug]=${requestData.slug}&filter[entity_type]=App\\Models\\Organization&filter[api_key]=${requestData.key}`,
    requestData,
  );
  return response?.data?.data[0]?.attributes?.data ? JSON.parse(response?.data?.data[0]?.attributes?.data) : null;
}
