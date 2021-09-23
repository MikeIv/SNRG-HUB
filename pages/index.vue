<template>
  <div>
    <component
      :is="key"
      v-for="{ key, methods, title, id } in pageInfo.components"
      :key="id"
      :methods="methods"
      :title="title"
    ></component>
    <pre>
      {{ pageInfo }}
    </pre>
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
