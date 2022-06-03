import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

export default async function getOrganizationProducts(requestData) {
  const response = await axios.get(
    // eslint-disable-next-line max-len
    `https://release-011-2327.c4.syndev.ru/api/v1/products?filter[organization-slug]=${requestData.slug}`,
    requestData,
  );
  return response.data.data;
}
