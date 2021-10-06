<template>
  <main class="page-404__wrapper">
    <SHeader />
    <Page404 />
    <SFooter />
  </main>
</template>

<script>
import page404 from '~/components/404/page_404';
import SHeader from '~/components/s_header/s_header';
import SFooter from '~/components/s_footer/s_footer';

export default {
  props: ['error'],

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
  },
};
</script>
