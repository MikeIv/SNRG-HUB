<template>
  <div>
    <noscript
      ><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WPTVBRG" height="0" width="0"></iframe
    ></noscript>
    <SHeader />
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
<style lang="scss" scoped>
iframe {
  display: none;
  visibility: hidden;
}
</style>
