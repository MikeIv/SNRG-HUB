<template>
  <span>
    {{ directionsList }}
  </span>
</template>

<script>
export default {
  name: 'Example',

  mounted() {
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

    this.$store.dispatch('getDirectionsList', requestData)
  },

  computed: {
    directionsList() {
      return this.$store.state.directionsList
    },
  },
}
</script>
