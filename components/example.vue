<template>
  <pre v-if="directionsList">
    {{ directionsList }}
  </pre>
  <span v-else>Loading...</span>
</template>

<script>
import getDirectionsList from '~/api/dicrectionsList'

export default {
  name: 'Example',

  data() {
    return {
      directionsList: null,
    }
  },

  async mounted() {
    const requestData = {
      filter: {
        published: true,
        ids: [8, 9, 10],
        name: 'Госслужба',
        product_ids: [492],
        show_main: true,
      },
      sort: 'sort',
    }

    this.directionsList = await getDirectionsList(requestData)
  },
}
</script>
