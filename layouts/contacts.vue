<template>
  <div>
    <SHeader @search="search = $event" :banner="false" />
    <Nuxt />
    <LazyHydrate when-visible>
      <SFooter />
    </LazyHydrate>
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration';
import SHeader from '~/components/s_header/s_header';

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
    SFooter: () => import('~/components/s_footer/s_footer'),
    LazyHydrate,
  },

  mounted() {
    setTimeout(() => {
      this.$gtm();
    }, 2500);
  },
};
</script>
