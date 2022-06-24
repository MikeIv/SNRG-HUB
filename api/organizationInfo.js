import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

export default async function getOrganizationInfo(requestData) {
  const response = await axios.get(
    // eslint-disable-next-line max-len
    `api/v1/organizations?filter[slug]=${requestData.slug}&include=city`,
    requestData,
  );

  return response.data;
}
