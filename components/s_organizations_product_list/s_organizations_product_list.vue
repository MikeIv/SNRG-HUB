<template>
  <div class="catalog-product-list" id="catalog-product-list">
    <div class="catalog-product-list__wrapper" v-if="productList">
      <slot />
      <h3 class="catalog-product-list__wrapper-sorry" v-if="!productList.length">К сожалению, ничего нет</h3>
      <nuxt-link
        v-for="product in productList"
        :to="`/organization/${product.slug}`"
        :key="product.id"
        class="catalog-product-list__item-wrapper organizations-product-list__item-wrapper"
      >
        <m-card
          type="program"
          class="catalog-product-list__item"
          :description="getProductDescription(product.budget_points, product.contract_points)"
          :title="product.name"
          :verticalImgSrc="`${baseURL}/${product.digital_image}`"
          :bottomText="product.abbreviation_name"
          :iconSrc="`${baseURL}${product.logo}`"
          @organization-click="onOrganizationClick(product)"
        />
      </nuxt-link>
    </div>
    <m-pagination
      v-if="productList"
      :currentPage="pageInx"
      @change-current-page="changeCurrentPage"
      @next="nextPage"
      @prev="prevPage"
      :totalItems="Number(totalProducts)"
      :perPage="productsPerPage"
    />
  </div>
</template>

<script>
import { MCard, MPagination } from '@cwespb/synergyui';
import '../s_catalog_product_list/s_catalog_product_list.scss';
import './s_organizations_product_list.scss';

export default {
  name: 'SOrganizationsProductList',

  props: ['productList', 'totalProducts', 'page', 'productsPerPage'],

  components: {
    MCard,
    MPagination,
  },

  data() {
    return {
      baseURL: process.env.NUXT_ENV_S3BACKET,
    };
  },

  computed: {
    pageInx: {
      get() {
        return this.page;
      },

      set(page) {
        this.$emit('page', page);
        window.scrollTo({
          top: document.getElementById('catalog-product-list'),
          behavior: 'smooth',
        });
      },
    },
  },

  methods: {
    getProductDescription(budget, contract) {
      const budgetStr = budget ? `Бюджет: от ${budget} баллов ${contract ? ' • ' : ''}` : '';
      const contractStr = contract ? `Платное: от ${contract} баллов` : '';
      return budgetStr + contractStr;
    },

    changeCurrentPage(page) {
      this.pageInx = page;
    },

    nextPage(nextPage) {
      this.pageInx = nextPage;
    },

    prevPage(prevPage) {
      this.pageInx = prevPage;
    },

    onOrganizationClick(product) {
      this.$router.push(`/organization/${product.slug}`);
    },
  },
};
</script>
