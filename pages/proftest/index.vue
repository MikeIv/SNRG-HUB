<template>
  <div class="proftest">
    <SHeader @search="search = $event" />
    <SProftest />
    <SFooter />
  </div>
</template>

<script>
import SHeader from '~/components/s_header/s_header';
import SFooter from '~/components/s_footer/s_footer';
import SProftest from '~/components/s_proftest/s_proftest';

export default {
  layout: 'empty',
  components: {
    SHeader,
    SFooter,
    SProftest,
  },

  data() {
    return {
      search: '',
    };
  },

  methods: {
    clearSearch() {
      this.search = '';
    },
  },
  head() {
    return {
      bodyAttrs: {
        class: 'bg-gray',
      },
    };
  },
};
</script>
