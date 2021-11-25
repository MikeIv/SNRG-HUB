<template>
  <div>
    <noscript
      ><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WPTVBRG" height="0" width="0"></iframe
    ></noscript>
    <SHeader @search="search = $event" />
    <SProductSearch v-if="search" :search="search" @search-clear="clearSearch" />
    <Nuxt v-else />
    <LazyHydrate when-visible>
      <SFooter />
    </LazyHydrate>
    <MobileButton />
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration';
import SHeader from '~/components/s_header/s_header';
import SProductSearch from '~/components/s_product_search/s_product_search';
import MobileButton from '~/components/mobile_button/mobile_button';

export default {
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

  components: {
    SHeader,
    SProductSearch,
    SFooter: () => import('~/components/s_footer/s_footer'),
    LazyHydrate,
    MobileButton,
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
<style lang="scss" scoped>
iframe {
  display: none;
  visibility: hidden;
}
</style>
