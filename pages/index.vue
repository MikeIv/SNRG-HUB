<template>
  <div>
    <component
      :is="key"
      v-for="{ key, methods, title, id, view_type } in pageInfo.data.components"
      :key="id"
      :methods="methods"
      :title="title"
      :viewType="view_type"
    ></component>
  </div>
</template>

<script>
export default {
  middleware: 'getPageInfo',
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
          hid: 'description',
          name: 'description',
          content: 'Home page description',
        },
      ],
    };
  },
};
</script>
