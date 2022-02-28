<template>
  <div class="catalog-product-list" id="catalog-product-list">
    <div class="catalog-product-list__wrapper" v-if="productList">
      <slot />
      <h3 class="catalog-product-list__wrapper-sorry" v-if="!productList.length">К сожалению, ничего нет</h3>
      <nuxt-link
        v-for="product in productList"
        :to="`/product/${product.slug}`"
        :key="product.id"
        :class="
          $route.name === 'organization-_slug'
            ? 'catalog-product-list__item-wrapper-section'
            : 'catalog-product-list__item-wrapper'
        "
      >
        <m-card
          type="program"
          class="catalog-product-list__item"
          :description="
            type === 'organizations'
              ? getProductDescription(product.budget_points, product.contract_points)
              : product.included.levels[0].name
          "
          :title="product.name"
          :verticalImgSrc="`${baseURL}/${type === 'organizations' ? product.digital_image : product.preview_image}`"
          :bottomText="
            type === 'organizations' ? product.abbreviation_name : product.included.organization.abbreviation_name
          "
          :iconSrc="`${baseURL}${type === 'organizations' ? product.logo : product.included.organization.logo}`"
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
import './s_catalog_product_list.scss';

export default {
  name: 'SCatalogProductList',

  props: ['productList', 'totalProducts', 'page', 'productsPerPage', 'type'],

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
      this.$router.push(
        `/organization/${this.type === 'organizations' ? product.slug : product.included.organization.slug}`,
      );
    },
  },
};
</script>
