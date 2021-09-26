<template>
  <s-catalog v-if="pageInfo" :pageInfo="pageInfo" />
</template>

<script>
export default {
  middleware: 'getPageInfo',

  computed: {
    pageInfo() {
      return this.$store.state.pageInfo;
    },
  },
};
</script>
