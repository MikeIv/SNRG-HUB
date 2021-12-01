<template>
  <div>
    <s-catalog v-if="pageInfo" :pageInfo="pageInfo" />
  </div>
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
