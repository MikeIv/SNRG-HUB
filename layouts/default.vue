<template>
  <div>
    <SHeader :refs="this.$children" />
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
};
</script>
