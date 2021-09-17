<template>
  <div>
    <div class="catalog-product-list__wrapper">
      <m-card
        class="catalog-product-list__item"
        v-for="product in productList"
        :key="product.id"
        type="program"
        :description="product.included.levels[0].name"
        :title="product.included.directions[0].name"
        :verticalImgSrc="`${baseURL}/${product.included.directions[0].preview_image}`"
        :bottomText="product.included.organization.abbreviation_name"
        :iconSrc="`${baseURL}/${product.included.organization.logo}`"
      />
    </div>
    <m-pagination
      v-if="productList"
      :currentPage="page"
      @change-current-page="changeCurrentPage"
      @next="nextPage"
      @prev="prevPage"
      :totalItems="Number(totalProducts.length)"
      :perPage="productsPerPage"
    />
  </div>
</template>

<script>
import { MCard, MPagination } from '@cwespb/synergyui';
import getProductsList from '~/api/products_list';
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
      baseURL: process.env.NUXT_ENV_S3BACKET,
      page: 1,
      totalProducts: 0,
      filter: {},
    };
  },

  computed: {
    productsPerPage() {
      return 3;
    },
  },

  methods: {
    changeCurrentPage() {
      console.log('!!!!!!!');
    },

    nextPage() {
      this.page += 1;
    },

    prevPage() {
      this.page -= 1;
    },

    async fetchProductsList() {
      const expandedMethod = { ...this.methods[0].data };
      expandedMethod.include = ['organization', 'levels', 'directions'];
      this.totalProducts = await getProductsList(expandedMethod);
      expandedMethod.pagination = { page: this.page, page_size: this.productsPerPage };
      this.productList = await getProductsList(expandedMethod);
    },
  },

  watch: {
    page() {
      this.$router.push({ path: this.$route.path, query: { page: this.page } });
      this.fetchProductsList();
    },
  },

  created() {
    if (this.$route.query.page) {
      this.page = Number(this.$route.query.page);
    } else {
      this.$router.push({ path: this.$route.path, query: { page: 1 } });
    }
  },

  mounted() {
    this.fetchProductsList();
  },
};
</script>
