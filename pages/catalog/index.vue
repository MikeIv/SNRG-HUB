<template>
  <s-catalog v-if="pageInfo" :pageInfo="pageInfo" />
</template>

<script>
export default {
  middleware: 'getPageInfo',

  data() {
    return {
      title: 'Catalog page',
    };
  },
  computed: {
    pageInfo() {
      return this.$store.state.pageInfo;
    },
    pageMeta() {
      return this.$store.state.pageMeta;
    },
  },
  head() {
    return {
      title: this.pageMeta?.title,
      meta: [
        {
          keywords: this.pageMeta?.keywords,
          description: this.pageMeta?.description,
        },
      ],
    };
  },
};
</script>
