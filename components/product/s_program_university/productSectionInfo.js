import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

// Метод получения продуктов по фильтру

export default async function getProductSectionInfo(requestData) {
  const response = await axios.get(
    // eslint-disable-next-line max-len
    'https://release-011-2327.c4.syndev.ru/api/v1/entity-sections?filter[entity_id]=649&filter[slug]=programmirovanie-na-python-s-nulya',
    requestData,
  );

  return JSON.parse(response.data.data[11].attributes.data);
}
