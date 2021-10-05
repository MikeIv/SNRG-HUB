<template>
  <main class="organization-page">
    <SHeader />
    <Nuxt />
    <SFooter />
  </main>
</template>

<script>
import SHeader from '~/components/s_header/s_header';
import SFooter from '~/components/s_footer/s_footer';

export default {
  head() {
    return {
      link: [
        { rel: 'canonical', href: `http://localhost:3000${this.$route.path}` },
      ],
    };
  },

  components: {
    SHeader,
    SFooter,
  },
};
</script>
