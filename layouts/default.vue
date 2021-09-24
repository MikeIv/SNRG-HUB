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
  components: {
    SFooter,
    SHeader,
  },
};
</script>
