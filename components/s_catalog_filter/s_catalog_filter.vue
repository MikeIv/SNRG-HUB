<template>
  <div class="catalog-filter__wrapper">
    <template v-for="(filterProp, filterKey) in filterData">
      <m-filter
        v-if="filterData[filterKey]"
        :key="filterKey"
        class="catalog-filter__filter"
        :title="filtersKeys[filterKey]"
        :passedBtnText="filtersText[filterKey]"
        :items="filterProp"
        @on-control-click="controlClick(filterKey, ...data)"
      />
    </template>
    <!--      -->
    <!--    <m-filter-->
    <!--      class="catalog-filter__filter"-->
    <!--      v-if="filterData.directions"-->
    <!--      title="Направления"-->
    <!--      passedBtnText="Все направления"-->
    <!--      :items="filterData.directions"-->
    <!--      @on-control-click="controlDirectionsClick"-->
    <!--    />-->
    <!--    <m-filter-->
    <!--      class="catalog-filter__filter"-->
    <!--      v-if="filterData.levels"-->
    <!--      title="Уровень образования"-->
    <!--      passedBtnText="Все уровни"-->
    <!--      :items="filterData.levels"-->
    <!--      @on-control-click="controlLevelsClick"-->
    <!--    />-->
    <!--    <m-filter-->
    <!--      class="catalog-filter__filter"-->
    <!--      v-if="filterData.formats"-->
    <!--      passedBtnText="Все форматы"-->
    <!--      title="Форматы"-->
    <!--      :items="filterData.formats"-->
    <!--      @on-control-click="controlFormatsClick"-->
    <!--    />-->
    <!--    <m-filter-->
    <!--      class="catalog-filter__filter"-->
    <!--      v-if="filterData.subjects"-->
    <!--      passedBtnText="Все профессии"-->
    <!--      title="Профессии"-->
    <!--      :items="filterData.subjects"-->
    <!--      @on-control-click="controlSubjectsClick"-->
    <!--    />-->
  </div>
</template>

<script>
import { MFilter } from '@cwespb/synergyui';
import '@cwespb/synergyui/lib/synergyui.css';
import './s_catalog_filter.scss';

export default {
  name: 'SCatalogFilter',

  props: ['filterData', 'filtersKeys'],

  components: {
    MFilter,
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
      },
    };
  },

  methods: {
    // Структура с бэка будет следующая:
    // title: «Направления»
    // slug: «directions»
    // type: «list»
    // search: true
    // values: [] -- массив объектов

    // Убрать все другие методы и использовать только один,
    // передавая ключ фильтра
    controlClick(filter, data) {
      // из кита будет приходить один объект
      console.log('here', filter, data);
      // Пока такой костыль, пока нет апгрейда
      const lastItem = filter[filter.length - 1];
      this.$emit('select-filter', lastItem);
    },

    controlDirectionsClick(productsList) {
      console.log('here', productsList);
      // Todo буду получать айтем и его эмитить наверх
      this.selectedDirections = productsList;
      this.selectedFilters = [...this.selectedFilters, ...this.selectedDirections];

      const lastItem = productsList[productsList.length - 1];
      this.$emit('select-filter', lastItem);
      // this.$emit('select-filter', this.selectedDirections);
    },
    controlLevelsClick(productsList) {
      this.selectedLevels = productsList.map((product) => product);
      console.log('levels', this.selectedLevels);
      this.$emit('select-filter', this.selectedLevels);
    },
    controlFormatsClick(productsList) {
      this.selectedFormats = productsList.map((product) => product.id);
      console.log('formats', this.selectedFormats);
    },
    controlSubjectsClick(productsList) {
      this.selectedSubjects = productsList.map((product) => product.id);
      console.log('subjects', this.selectedSubjects);
    },
  },
};
</script>
