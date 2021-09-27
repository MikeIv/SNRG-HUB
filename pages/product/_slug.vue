<template>
  <div>
    <component
      :is="key"
      v-for="{ key, methods, title, id, view_type } in pageInfo.components"
      :key="id"
      :methods="methods"
      :title="title"
      :viewType="view_type"
    ></component>
    <pre>
    {{ pageInfo }}
  </pre
    >
  </div>
</template>

<script>
export default {
  middleware: 'getPageInfo',
  computed: {
    pageInfo() {
      return this.$store.state.pageInfo;
    },
  },

  mounted() {
    console.log(this.pageInfo);
  },
};
</script>
