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
      :checked="filter.isChecked"
      typeBtn="checkbox"
      typeCtrl="switch"
      labelPosition="left"
      @input="switchClick(filter, ...arguments)"
    />
  </div>
</template>

<script>
import { MFilter, AControl } from '@cwespb/synergyui';
import './s_catalog_filter.scss';

export default {
  name: 'SCatalogFilter',

  props: ['filterListData', 'filterCheckboxData', 'filtersCheckboxDataRequest'],

  components: {
    MFilter,
    AControl,
  },

  data() {
    return {
      filtersText: {
        direction_ids: 'Все направления',
        format_ids: 'Все форматы',
        level_ids: 'Все уровни',
        city_ids: 'Все города',
        organization_ids: 'Все заведения',
      },
      switchControl: {
        is_employment: false,
        is_installment: false,
      },
    };
  },

  methods: {
    controlClick(key, item) {
      this.$emit('select-filter', key, item);
    },

    switchClick(item, isChecked) {
      this.$emit('switch-click', item, isChecked);
    },
  },
};
</script>
