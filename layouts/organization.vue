<template>
  <div class="organization-page">
    <SHeader @search="search = $event" />
    <SProductSearch v-if="search" :search="search" @search-clear="clearSearch" />
    <Nuxt v-else />
    <LazyHydrate when-visible v-if="!search">
      <SQuiz :quiz-id="2" />
    </LazyHydrate>
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
    SQuiz: () => import('~/components/s_quiz/s_quiz'),
    SFooter: () => import('~/components/s_footer/s_footer'),
    LazyHydrate,
    SProductSearch,
    SHeader,
    MobileButton,
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

  mounted() {
    if (this.$route.query.search) {
      this.search = this.$route.query.search;
    }

    setTimeout(() => {
      this.$gtm();
    }, 2500);
  },
};
</script>
