<template>
  <div v-if="menu">
    <div class="catalog-page__menu" v-if="filterListData">
      <div v-show="!isFilterExpanded">
        <a-title title="Фильтры" :showIcon="false" @clickClose="filtersMenuClose" class="catalog-page__menu-header" />
        <div v-if="selectedFilters.length" class="catalog-page__menu-tags">
          <a-tag
            v-for="tag in selectedFilters"
            :key="`${tag.name}${tag.id}`"
            :label="tag.key === 'organization_ids' ? tag.abbreviation_name : tag.name"
            status="selected"
            @aTagDelete="deleteTag(tag)"
          />
          <a-tag
            v-if="selectedFilters.length"
            label="Очистить все"
            status="delete"
            @aTagDelete="clearAllFilters"
            @aTagClick="clearAllFilters"
          />
        </div>
      </div>
      <div class="catalog-page__menu-contents" ref="menuContent">
        <div v-show="isFilterExpanded" :key="componentExpandedMenuKey">
          <a-title
            :title="filterListData[currentExpandedFilter].title"
            :showIcon="true"
            @clickClose="filtersMenuClose"
            @click="isFilterExpanded = false"
            class="catalog-page__menu-header"
          />
          <m-filter
            title=""
            passedBtnText=""
            :hasSearch="filterListData[currentExpandedFilter].search"
            :items="filterListData[currentExpandedFilter].values"
            :visibleCount="1000"
            class="catalog-page__menu-filter_mfilter"
            @item-click="selectFilter(filterListData[currentExpandedFilter].filter_by, ...arguments)"
          />
        </div>

        <div
          v-show="!isFilterExpanded"
          class="catalog-page__menu-filters"
          v-for="filters in Object.entries(filterListData)"
          :key="filters[0]"
        >
          <div
            class="catalog-page__menu-filter"
            :class="{ 'catalog-page__menu-filter-expanded': filters[1].values.length > maxVisibleControls }"
            @click="filters[1].values.length > maxVisibleControls ? expandedFilterClickHandler(filters[0]) : null"
          >
            <h3 class="a-font_h7">{{ filters[1].title }}</h3>
            <i
              v-if="filters[1].values.length > maxVisibleControls"
              class="si-chevron-right catalog-page__menu-filter-icon"
            />
          </div>
          <div v-if="filters[1].values.length < maxVisibleControls" class="catalog-page__menu-filter_controls">
            <a-control
              v-for="filter in filters[1].values"
              :title="filter.abbreviation_name ? filter.abbreviation_name : filter.name"
              :key="`${filter.name}${filter.id}`"
              :checked="filter.isChecked"
              :labelText="filter.abbreviation_name ? filter.name : filter.abbreviation_name"
              labelPosition="left"
              class="catalog-page__menu-filter_control"
              typeBtn="checkbox"
              typeCtrl="checkbox"
              @input="selectFilterControl(filters[0], filter, ...arguments)"
            />
          </div>
        </div>
        <div v-show="!isFilterExpanded">
          <a-control
            v-for="filter in filterCheckboxData"
            class="catalog-page__menu-filter_control catalog-page__menu-filter_switch"
            :key="filter.filter_by"
            :title="filter.title"
            typeBtn="checkbox"
            typeCtrl="switch"
            :checked="filter.isChecked"
            labelPosition="left"
            @input="switchClick(filter, ...arguments)"
          />
          <div class="catalog-page__menu-button">
            <a-button :label="menuButtonLabel" bgColor="accent" @click="filtersMenuClose" />
          </div>
        </div>
      </div>
    </div>
    <div class="catalog-page__menu-backdrop" @click="filtersMenuClose" />
  </div>
</template>

<script>
import {
  ATag, ATitle, AButton, AControl, MFilter,
} from '@cwespb/synergyui';
import './s_catalog_menu.scss';

export default {
  name: 'SCatalogMenu',

  props: [
    'filterListData',
    'filterCheckboxData',
    'selectedFilters',
    'filtersMenu',
    'totalProducts',
    'maxVisibleControls',
  ],

  components: {
    ATag,
    ATitle,
    AButton,
    AControl,
    MFilter,
  },

  data() {
    return {
      isFilterExpanded: false,
      currentExpandedFilter: 'direction_ids',
      componentExpandedMenuKey: 3000,
    };
  },

  computed: {
    menuButtonLabel() {
      return `Показать ${this.totalProducts} предложений`;
    },

    menu: {
      get() {
        return this.filtersMenu;
      },
      set(value) {
        this.$emit('menu-toggle', value);
      },
    },
  },

  watch: {
    filtersMenu() {
      this.hideYScroll();
    },
  },

  methods: {
    hideYScroll() {
      const htmlWrapper = document.querySelector('html');

      if (this.filtersMenu === true) {
        htmlWrapper.style.overflowY = 'hidden';
      } else {
        htmlWrapper.style.overflowY = 'visible';
      }
    },

    filtersMenuClose() {
      this.menu = false;
      this.isFilterExpanded = false;
    },

    expandedFilterClickHandler(filterKey) {
      this.$refs.menuContent.scrollIntoView(true);
      this.componentExpandedMenuKey += 1;
      this.currentExpandedFilter = filterKey;
      this.isFilterExpanded = true;
    },

    deleteTag(tag) {
      this.$emit('delete-tag', tag);
    },

    clearAllFilters() {
      this.$emit('clear-all-filters');
    },

    selectFilter(key, item) {
      this.$emit('select-menu-filter', key, item);
    },

    selectFilterControl(key, item, isChecked) {
      this.$emit('select-menu-control', key, item, isChecked);
    },

    switchClick(item, isChecked) {
      this.$emit('switch-menu-click', item, isChecked);
    },
  },
};
</script>
