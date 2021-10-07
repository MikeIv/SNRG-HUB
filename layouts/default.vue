<template>
  <div>
    <SHeader />
    <Nuxt />
    <SFooter />
  </div>
</template>

<script>
import SHeader from '~/components/s_header/s_header';
import SFooter from '~/components/s_footer/s_footer';

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
    SFooter,
    SHeader,
  },
};
</script>
