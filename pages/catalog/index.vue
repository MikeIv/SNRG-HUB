<template>
  <div class="catalog-page__wrapper">
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

<style scoped lang="scss">
.catalog-page {
  &__wrapper {
    max-width: 1480px;
    margin: 0 auto;
    padding: 10px;
  }
}
</style>
