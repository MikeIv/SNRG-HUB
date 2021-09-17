<template>
  <div class="catalog-product-list__wrapper">
    <h1>catalog filter</h1>
    <!--      <m-filter />-->
    <!--      <a-tag />-->
  </div>
</template>

<script>
// import { MFilter, ATag } from '@cwespb/synergyui';
// import getProductsList from '~/api/products_list';
// import getOrganizationsDetail from '~/api/organizations_detail';
import '@cwespb/synergyui/lib/synergyui.css';
import './s_catalog_filter.scss';

export default {
  name: 'SCatalogFilter',

  props: ['methods', 'title'],

  // components: {
  //   MFilter,
  //   ATag,
  // },

  data() {
    return {};
  },

  // async mounted() {
  //   this.methods.forEach(async (method) => {
  //     this.productList = await getProductsList(method.data);
  //
  //     this.productList.forEach(async (product) => {
  //       const requestData = {
  //         filter: {
  //           id: product.organization_id,
  //         },
  //       };
  //
  //       const response = await getOrganizationsDetail(requestData);
  //       this.products.push({ ...product, org_name: response.name, org_icon: response.digital_image });
  //     });
  //   });
  // },
};
</script>
