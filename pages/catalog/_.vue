<template>
  <s-catalog v-if="pageInfo" :pageInfo="pageInfo" />
</template>

<script>
export default {
  middleware: ['getPageInfo', 'parseUtms'],

  computed: {
    pageInfo() {
      return this.$store.state.pageInfo;
    },
  },
};
</script>
