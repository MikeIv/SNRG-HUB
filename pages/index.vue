<template>
  <div class="container">
    <div>
      <h1 class="title">{{ titlePage }}</h1>
    </div>
    <nuxt-link to="/product">TO PRODUCT PAGE</nuxt-link>
    <ul>
      <li v-for="{ name, data } in sectionsData" :key="name">
        <h3>{{ name }}</h3>
        <pre>{{ data }}</pre>
      </li>
    </ul>
    <!--    <component-->
    <!--      v-for="section in sectionsData"-->
    <!--      :key="section.name"-->
    <!--      :is="section.name"-->
    <!--      :propsToPass="sectionsData"-->
    <!--    />-->
  </div>
</template>

<script>
export default {
  middleware: 'getPageInfo',

  async asyncData({ $axios }) {
    const pageQuery = {
      filter: {
        id: 1,
      },
    }

    const response = await $axios.$post('/api/v1/page', pageQuery)

    const titlePage = await response.data.name
    return {
      titlePage,
    }
  },

  data() {
    return {
      titlePage: '',
      sectionsData: [],
    }
  },

  computed: {
    sections() {
      return this.$store.state.pageInfo.components
    },
  },

  mounted() {
    this.sections.forEach((section) => {
      let fetchedData = {}

      section.methods.forEach(async (method) => {
        fetchedData = await this.$store.dispatch('getSectionData', method)
        this.sectionsData.push({ name: section.key, data: fetchedData })
      })
    })
  },
}
</script>
