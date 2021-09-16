<template>
  <div>
    <h2>{{ title }}</h2>
    <m-card
      v-for="product in productsList"
      :key="product.id"
      :title="product.name"
      :description="product.description"
      type="program"
    />
    <pre>{{ methods }}</pre>
    <pre>{{ productsList }}</pre>
  </div>
</template>

<script>
import { MCard } from '@cwespb/synergyui';
import getProductsList from '~/api/products_list';
import '@cwespb/synergyui/lib/synergyui.css';
// import './s_catalog_product_list.scss';

export default {
  name: 'SMainPrograms',

  components: {
    MCard,
  },

  data() {
    return {
      productsList: [],
    };
  },
  props: ['methods', 'title'],
  async mounted() {
    this.methods.forEach(async (method) => {
      this.productsList = await getProductsList(method.data);
    });
  },
};
</script>
