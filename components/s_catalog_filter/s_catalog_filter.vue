<template>
  <div class="catalog-filter__wrapper">
    <m-catalog-categories
      title="Программы обучения"
      :subcategories="subcategories"
      :categories="categories"
      :subcategoriesTitle="subcategoriesTitle"
      :topicTitle="topicTitle"
      passed-btn-text="Показать всё"
      :visible-count="15"
    />
    <template v-for="filters in filterListData">
      <m-filter
        v-if="filters[0]"
        class="catalog-filter__filter"
        :key="filters[0]"
        :title="filters[1].title"
        :hasSearch="filters[1].values.length > 15"
        :passedBtnText="filtersTextProp ? filtersTextProp[filters[0]] : filtersText[filters[0]]"
        :items="filters[1].values"
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
import MCatalogCategories from '~/components/ui/m-catalog-categories/m-catalog-categories';
import './s_catalog_filter.scss';

export default {
  name: 'SCatalogFilter',

  props: [
    'filterListData',
    'filterCheckboxData',
    'filtersTextProp',
    'subcategories',
    'categories',
    'subcategoriesTitle',
    'topicTitle',
  ],

  components: {
    MCatalogCategories,
    MFilter,
    AControl,
  },

  data() {
    return {
      filtersText: {
        format_ids: 'Все форматы',
        level_ids: 'Все уровни',
        city_ids: 'Все города',
        organization_ids: 'Все заведения',
        publication_type_ids: 'Все форматы',
        reader_type_ids: 'Все пользователи',
        article_author_ids: 'Все авторы',
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
