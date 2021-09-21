<template>
  <span v-if="$fetchState.pending"> Loading... </span>
  <div v-else-if="$fetchState.error">
    <p>{{ $fetchState.error.message }}</p>
  </div>
  <pre v-else>{{ directionsList }}</pre>
</template>

<script>
import getDirectionsList from '~/api/dicrectionsList';

export default {
  name: 'Example',

  data() {
    return {
      directionsList: null,
    };
  },

  // Хук asyncData доступен только на страницах (pages)
  // В компонентах мы используем асинхронный хук fetch
  // Поле "data" должно быть обязательно выше хука fetch

  async fetch() {
    const requestData = {
      filter: {
        published: true,
        ids: [8, 9, 10],
        name: 'Госслужба',
        product_ids: [492],
        show_main: true,
      },
      sort: 'sort',
    };
    this.directionsList = await getDirectionsList(requestData);
  },
};
</script>
