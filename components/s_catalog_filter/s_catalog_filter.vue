<template>
  <div class="catalog-filter__wrapper">
    <template v-for="filters in filterListData">
      <m-filter
        v-if="isFilterRendered(filters[0])"
        class="catalog-filter__filter"
        :key="filters[0]"
        :title="filters[1].title"
        :hasSearch="
          filters[0] === 'subject_ids' ? renderSubjects(filters[1].values).length > 15 : filters[1].values.length > 15
        "
        :passedBtnText="filtersTextProp ? filtersTextProp[filters[0]] : filtersText[filters[0]]"
        :items="filters[0] === 'subject_ids' ? renderSubjects(filters[1].values) : filters[1].values"
        @item-click="controlClick(filters[1].filter_by, ...arguments)"
      />
    </template>

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

  props: ['filterListData', 'filterCheckboxData', 'subjects', 'filtersTextProp'],

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
        subject_ids: 'Все тематики',
      },
    };
  },

  methods: {
    isFilterRendered(key) {
      return key === 'subject_ids' ? this.subjects.length : true;
    },

    renderSubjects(values) {
      return this.subjects.length ? values.filter((value) => this.subjects.includes(value.id)) : values;
    },

    controlClick(key, item) {
      this.$emit('select-filter', key, item);
    },

    switchClick(item, isChecked) {
      this.$emit('switch-click', item, isChecked);
    },
  },
};
</script>
