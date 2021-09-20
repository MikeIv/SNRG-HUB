<template>
  <div class="container">
    <component
      :is="key"
      v-for="{ key, methods, title, id } in pageInfo.components"
      :key="id"
      :methods="methods"
      :title="title"
    ></component>
  </div>
</template>

<script>
export default {
  components: {},

  middleware: 'getPageInfo',

  asyncData() {},

  computed: {
    pageInfo() {
      return this.$store.state.pageInfo;
    },
  },
};
</script>
