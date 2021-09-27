<template>
  <section class="s-main-search">
    <h2 class="s-main-search__title">s-main-search {{ title }}</h2>
    <pre>
      {{ rows }}
    </pre>
    <div class="l-wide">
      <div class="s-main-search__row"
      v-for="row in rows"
        :key="row.id"
      >
        <div class="s-main-search__category">{{ row.name }}</div>
        <div class="s-main-search__items">
          <div class="s-main-search__item"
          v-for="item in row.items"
            :key="item.id"
          >
            <div class="s-main-search__item-title">{{ item.name }}</div>
            <div class="s-main-search__item-count">{{ item.count }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import getProductsMain from '~/api/productsMain';
import './s_main_search.scss';

export default {
  name: 'SMainSearch',

  props: {
    redirectUrl: {
      type: String,
      default: '#',
    },
    methods: {
      type: Array,
    },
    title: {
      type: String,
    },
  },

  data() {
    return {
      rows: [],
      baseUrl: process.env.NUXT_ENV_S3BACKET,
      windowWidth: 0,
    };
  },

  async fetch() {
    this.rows = await getProductsMain();
  },
};
</script>
