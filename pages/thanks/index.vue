<template>
  <div class="thanks__wrapper">
    <SHeader @search="search = $event" />
    <SProductSearch v-if="search" :search="search" />
    <Thanks v-else />
    <SFooter />
    <Popups />
  </div>
</template>

<script>
import thanks from '~/components/thanks/thanks';
import SHeader from '~/components/s_header/s_header';
import SFooter from '~/components/s_footer/s_footer';
import SProductSearch from '~/components/s_product_search/s_product_search';
import Popups from '~/components/popups/popups';

export default {
  layout: 'empty',
  components: {
    thanks,
    SHeader,
    SFooter,
    SProductSearch,
    Popups,
  },

  data() {
    return {
      search: '',
    };
  },
};
</script>
