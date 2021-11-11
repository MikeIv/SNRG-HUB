<template>
  <div class="product-page">
    <noscript
      ><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WPTVBRG" height="0" width="0"></iframe
    ></noscript>
    <SHeader @search="search = $event" />
    <SProductSearch v-if="search" :search="search" @search-clear="clearSearch" />
    <Nuxt v-else />
    <LazyHydrate when-visible v-if="!search">
      <SQuiz :quiz-id="2" />
    </LazyHydrate>
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
    SQuiz: () => import('~/components/s_quiz/s_quiz'),
    SFooter: () => import('~/components/s_footer/s_footer'),
    SProductSearch,
    LazyHydrate,
  },

  data() {
    return {
      search: '',
    };
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
</style>
