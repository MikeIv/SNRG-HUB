<template>
  <span v-if="$fetchState.pending"> Loading... </span>
  <div v-else-if="$fetchState.error">
    <p>{{ $fetchState.error.message }}</p>
  </div>
  <pre v-else>{{ bannersList }}</pre>
</template>

<script>
import getBannersList from '~/api/bannersList'

export default {
  name: 'Example',

  data() {
    return {
      bannersList: null,
    }
  },

  // Хук asyncData доступен только на страницах (pages)
  // В компонентах мы используем асинхронный хук fetch
  // Поле "data" должно быть обязательно выше хука fetch

  async fetch() {
    const requestData = {
      filter: {
        ids: [1, 3],
        published: true,
      },
      sort: 'name',
    }
    this.bannersList = await getBannersList(requestData)
  },
}
</script>
