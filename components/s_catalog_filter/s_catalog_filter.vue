<template>
  <div class="catalog-product-list__wrapper">
    <!--    <h1>catalog filter</h1>-->
    <!--    <m-filter-->
    <!--      v-if="filterData.directions"-->
    <!--      passedBtnText="Все направления"-->
    <!--      title="Направления"-->
    <!--      :items="filterData.directions"-->
    <!--      @on-control-click="controlClick"-->
    <!--    />-->
    <!--    <pre>{{ filterData }}</pre>-->
    <!--    <a-tag />-->
  </div>
</template>

<script>
import { MFilter, ATag } from '@cwespb/synergyui';
import '@cwespb/synergyui/lib/synergyui.css';
import './s_catalog_filter.scss';
import getFilterData from '~/api/filter_data';

export default {
  name: 'SCatalogFilter',

  props: ['methods', 'title'],

  components: {
    MFilter,
    // ATag,
  },

  data() {
    return {
      filterData: [],
    };
  },

  methods: {
    async fetchFilterData() {
      this.filterData = await getFilterData(this.methods[0].data);
    },

    controlClick(productsList) {
      console.log(productsList);
    },
  },

  mounted() {
    this.fetchFilterData();
  },
};
</script>
