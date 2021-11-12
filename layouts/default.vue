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
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration';
import SHeader from '~/components/s_header/s_header';
import SProductSearch from '~/components/s_product_search/s_product_search';

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
      bodyAttrs: {
        class: `${'body--search' ? this.search : ''}`,
      },
    };
  },

  components: {
    SHeader,
    SProductSearch,
    SFooter: () => import('~/components/s_footer/s_footer'),
    LazyHydrate,
  },

  methods: {
    clearSearch() {
      this.search = '';
    },
  },
};
</script>
<style lang="scss" scoped>
iframe {
  display: none;
  visibility: hidden;
}

body.body--search {
  #__nuxt,
  #__layout,
  #__layout > div:only-child {
    display: flex;
    flex: 1;
    align-items: stretch;
  }

  .screen-height > .l-default {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
}
</style>
