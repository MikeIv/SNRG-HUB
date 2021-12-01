<template>
  <div class="page-404__wrapper">
    <SHeader @search="search = $event" />
    <SProductSearch v-if="search" :search="search" @search-clear="clearSearch" />
    <Page404 v-else />
    <SFooter />
  </div>
</template>

<script>
import page404 from '~/components/404/page_404';
import SHeader from '~/components/s_header/s_header';
import SFooter from '~/components/s_footer/s_footer';
import SProductSearch from '~/components/s_product_search/s_product_search';

export default {
  props: ['error'],

  data() {
    return {
      search: '',
    };
  },

  head() {
    return {
      link: [
        {
          rel: 'canonical',
          href: `${this.$config.SITE_URL}${this.$route.path}`,
        },
      ],
    };
  },

  layout: 'empty',

  components: {
    page404,
    SHeader,
    SFooter,
    SProductSearch,
  },

  methods: {
    clearSearch() {
      this.search = '';
    },
  },

  mounted() {
    if (this.$route.query.search) {
      this.search = this.$route.query.search;
    }
  },
};
</script>
