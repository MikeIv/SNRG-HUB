<template>
  <div class="container">
    <div>
      <h1 class="title">{{ pageInfo.name }}</h1>
    </div>
    <nuxt-link to="/">TO MAIN PAGE</nuxt-link>
    <pre>{{ pageInfo }}</pre>
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
