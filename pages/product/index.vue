<template>
  <div class="container">
    <div>
      <span>/product</span>
      <h1 class="title">{{ titlePage }}</h1>
    </div>
    <nuxt-link to="/">TO MAIN PAGE</nuxt-link>
  </div>
</template>

<script>
export default {
  // middleware: 'getPageInfo',

  async asyncData({ $axios }) {
    const response = await $axios.$get('/api/v1/page', {
      data: {
        filter: {
          slug: 'product',
        },
        params: {
          id: 480,
        },
      },
    })

    const titlePage = await response.data.name
    return {
      titlePage,
    }
  },

  data() {
    return {
      titlePage: 'Default Values',
    }
  },

  // computed: {
  //   sections() {
  //     return this.$store.state.pageInfo
  //   },
  // },
}
</script>
