<template>
  <div class="container">
    <div>
      <span>/</span>
      <h1 class="title">{{ titlePage }}</h1>
    </div>
    <nuxt-link to="/product">TO PRODUCT PAGE</nuxt-link>
  </div>
</template>

<script>
// import { getSectionData } from '~/api/getSectionData'

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

  // mounted() {
  // this.$axios
  //   .$get('https://mp.synergy.ru/api/v1/page', {
  //     filter: {
  //       slug: 'product',
  //     },
  //     params: {
  //       id: 480,
  //     },
  //   })
  //   .then((res) => {
  //     console.log(res.data)
  //   })

  // const dataItems = {
  //   filter: {
  //     slug: 'product',
  //   },
  //   params: {
  //     id: 480,
  //   },
  // }
  //
  // this.$axios({
  //   method: 'get',
  //   url: 'https://mp.synergy.ru/api/v1/page',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Accept: 'application/vnd.api+json',
  //   },
  //   data: JSON.stringify(dataItems),
  // }).then((res) => {
  //   console.log(res.data)
  // })
  // },

  // data() {
  //   return {
  //     sectionsData: [],
  //   }
  // },
  //
  // computed: {
  //   sections() {
  //     return this.$store.state.pageInfo.components
  //   },
  // },
  //
  // mounted() {
  //   this.sections.forEach((section) => {
  //     let fetchedData = {}
  //
  //     section.methods.forEach(async (method) => {
  //       fetchedData = await getSectionData(method)
  //       // console.log(fetchedData)
  //       this.sectionsData.push({ name: section.key, data: fetchedData.data })
  //     })
  //   })
  //
  //   console.log(this.sectionsData)
  // },
  //
  // asyncData() {},
}
</script>
