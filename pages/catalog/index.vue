<template>
  <div>
    <h1 class="title">Программы обучения</h1>
    <component
      :is="key"
      v-for="{ key, methods, id, title } in pageInfo.components"
      :key="id"
      :methods="methods"
      :title="title"
    ></component>
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
};
</script>
