<template>
  <main>
    <LazyHydrate :key="id" v-for="{ key, methods, title, id, view_type } in pageInfo.components" when-visible>
      <component :is="key" :methods="methods" :title="title" :viewType="view_type"></component>
    </LazyHydrate>
  </main>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration';

export default {
  middleware: 'getPageInfo',

  components: {
    LazyHydrate,
  },
  data() {
    return {
      title: 'Home page',
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
          h1: this.pageMeta?.h1,
          keywords: this.pageMeta?.keywords,
          description: this.pageMeta?.description,
        },
      ],
    };
  },
};
</script>
