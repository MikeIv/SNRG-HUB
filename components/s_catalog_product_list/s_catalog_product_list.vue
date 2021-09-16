<template>
  <div>
    <div class="catalog-product-list__wrapper">
      <m-card
        class="catalog-product-list__item"
        v-for="product in products"
        :key="product.id"
        type="program"
        :description="product.description"
        :title="product.name"
        :verticalImgSrc="`https://sys3.ru/marketplace/${product.digital_image}`"
        :bottomText="product.org_name"
        :iconSrc="`https://sys3.ru/marketplace/${product.org_icon}`"
      />
    </div>
    <m-pagination v-if="productList" :totalItems="22" :perPage="21" />
  </div>
</template>

<script>
import { MCard, MPagination } from '@cwespb/synergyui';
import getProductsList from '~/api/products_list';
import getOrganizationsDetail from '~/api/organizations_detail';
import '@cwespb/synergyui/lib/synergyui.css';
import './s_catalog_product_list.scss';

export default {
  name: 'SCatalogProductList',

  props: ['methods', 'title'],

  components: {
    MCard,
    MPagination,
  },

  data() {
    return {
      productList: [],
      products: [],
      page: 1,
    };
  },

  async mounted() {
    this.methods.forEach(async (method) => {
      this.productList = await getProductsList(method.data);

      this.productList.forEach(async (product) => {
        const requestData = {
          filter: {
            id: product.organization_id,
          },
        };

        const response = await getOrganizationsDetail(requestData);
        this.products.push({ ...product, org_name: response.name, org_icon: response.digital_image });
      });
    });
  },
};
</script>
