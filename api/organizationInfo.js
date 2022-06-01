import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

export default async function getOrganizationInfo(requestData) {
  const response = await axios.get(
    // eslint-disable-next-line max-len
    `https://release-011-2327.c4.syndev.ru/api/v1/organizations?filter[slug]=${requestData.slug}&?include=city`,
    requestData,
  );

  return response.data.data[0];
}
