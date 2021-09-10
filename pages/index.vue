<template>
  <div class="container">
    <div>
      <h1 class="title">{{ pageInfo.name }}</h1>
    </div>
    <nuxt-link to="/product">TO PRODUCT PAGE</nuxt-link>
    <example />
    <pre>
      {{ pageInfo }}
    </pre>
  </div>
</template>

<script>
import Example from '~/components/example'
export default {
  components: { Example },

  middleware: 'getPageInfo',

  computed: {
    pageInfo() {
      return this.$store.state.pageInfo
    },
  },
}
</script>
