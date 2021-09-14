<template>
  <span v-if="$fetchState.pending"> Loading... </span>
  <div v-else-if="$fetchState.error">
    <p>{{ $fetchState.error.message }}</p>
  </div>
  <pre v-else>{{ productsSectionsDetail }}</pre>
</template>

<script>
import getProductsSectionsDetail from '~/api/productsSectionsDetail';

export default {
  name: 'Example',

  data() {
    return {
      productsSectionsDetail: null,
    };
  },

  // Хук asyncData доступен только на страницах (pages)
  // В компонентах мы используем асинхронный хук fetch
  // Поле "data" должно быть обязательно выше хука fetch

  async fetch() {
    const requestData = {
      filter: {
        section_id: 10,
        product_id: 549,
      },
    };
    this.productsSectionsDetail = await getProductsSectionsDetail(requestData);
  },
};
</script>
