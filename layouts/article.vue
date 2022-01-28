<template>
  <div class="product-page">
    <SHeader @search="search = $event" />
    <SProductSearch v-if="search" :search="search" />
    <Nuxt v-else />
    <LazyHydrate when-visible>
      <SFooter />
    </LazyHydrate>
    <MobileButton />
    <Popups />
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration';
import SHeader from '~/components/s_header/s_header';
import SProductSearch from '~/components/s_product_search/s_product_search';
import MobileButton from '~/components/mobile_button/mobile_button';
import Popups from '~/components/popups/popups';

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
    SFooter: () => import('~/components/s_footer/s_footer'),
    SProductSearch,
    LazyHydrate,
    MobileButton,
    Popups,
  },

  data() {
    return {
      search: '',
    };
  },

  mounted() {
    setTimeout(() => {
      this.$gtm();
    }, 2500);
  },
};
</script>
