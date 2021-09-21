<template>
  <div class="catalog-filter__wrapper">
    <m-filter
      v-for="filters in filterListData"
      class="catalog-filter__filter"
      :key="filters[0]"
      :title="filters[1].title"
      :hasSearch="filters[1].search"
      :passedBtnText="filtersText[filters[0]]"
      :items="filters[1].values"
      @item-click="controlClick(filters[1].filter_by, ...arguments)"
    />
    <a-control
      v-for="filter in filterCheckboxData"
      class="catalog-filter__checkbox"
      :key="filter.filter_by"
      :title="filter.title"
      :checked="false"
      typeBtn="radio"
      typeCtrl="switch"
      labelPosition="left"
    />
  </div>
</template>

<script>
import { MFilter, AControl } from '@cwespb/synergyui';
import './s_catalog_filter.scss';

export default {
  name: 'SCatalogFilter',

  props: ['filterListData', 'filterCheckboxData'],

  components: {
    MFilter,
    AControl,
  },

  data() {
    return {
      direction_ids: [],
      level_ids: [],
      format_ids: [],
      subject_ids: [],
      organization_ids: [],
      person_ids: [],
      selectedFilters: [],

      filtersText: {
        directions: 'Все направления',
        formats: 'Все форматы',
        levels: 'Все уровени',
        subjects: 'Все профессии',
        city_ids: 'Все города',
        organization_id: 'Все заведения',
      },
    };
  },

  methods: {
    controlClick(key, item) {
      this.$emit('select-filter', key, item);
    },

    controlDirectionsClick(productsList) {
      // Todo буду получать айтем и его эмитить наверх
      this.selectedDirections = productsList;
      this.selectedFilters = [...this.selectedFilters, ...this.selectedDirections];

      const lastItem = productsList[productsList.length - 1];
      this.$emit('select-filter', lastItem);
      // this.$emit('select-filter', this.selectedDirections);
    },
  },
};
</script>
