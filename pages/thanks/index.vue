<template>
  <div class="thanks__wrapper">
    <SHeader />
    <Thanks />
    <SFooter />
  </div>
</template>

<script>
import thanks from '~/components/thanks/thanks';
import SHeader from '~/components/s_header/s_header';
import SFooter from '~/components/s_footer/s_footer';

export default {
  layout: 'empty',
  components: {
    thanks,
    SHeader,
    SFooter,
  },
};
</script>
