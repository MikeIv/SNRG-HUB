<template>
  <div>
    <s-catalog v-if="pageInfo" :pageInfo="pageInfo" />
    <MobileButton />
  </div>
</template>

<script>
import MobileButton from '~/components/mobile_button/mobile_button';

export default {
  middleware: ['getPageInfo', 'parseUtms'],

  components: {
    MobileButton,
  },

  computed: {
    pageInfo() {
      return this.$store.state.pageInfo;
    },
  },
};
</script>
