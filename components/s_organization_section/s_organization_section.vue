<template>
  <div :class="this.$route.name === 'organization-_slug' ? 'catalog-page__section' : ''">
    <h2 class="a-font_h2" v-if="title">
      {{ title }}
      <sup class="catalog-page__header-total a-font_L"> {{ totalProducts }} заведений</sup>
    </h2>
    <s-catalog-presets :presets="presets" :has-presets="hasPresets" :filters-ids-data="filtersIdsData" />
    <s-catalog-menu
      :filtersMenu="filtersMenu"
      :filterListData="filterListData"
      :filterCheckboxData="filterCheckboxData"
      :selectedFilters="selectedFilters"
      :totalProducts="totalProducts"
      :maxVisibleControls="7"
      :key="componentMenuKey"
      @menu-toggle="menuToggle"
      @delete-tag="deleteTag"
      @clear-all-filters="clearAllFilters"
      @select-menu-filter="selectFilter"
      @select-menu-control="selectControlFilter"
      @switch-menu-click="switchClick"
    />
    <div class="catalog-page__content">
      <s-catalog-filter
        :filterListData="Object.entries(filterListData)"
        :filterCheckboxData="filterCheckboxData"
        :key="componentFilterKey"
        @select-filter="selectFilter"
        @switch-click="switchClick"
      />
      <s-organizations-product-list
        :productList="productList"
        :totalProducts="totalProducts"
        :page="page"
        :productsPerPage="productsPerPage"
        :key="componentProductsKey"
        @page="page = $event"
      >
        <s-catalog-tags
          :selectedFilters="selectedFilters"
          :productList="productList"
          :options="options"
          @clear-all-filters="clearAllFilters"
          @delete-tag="deleteTag"
          @filters-icon-click="filtersIconClickHandler"
          @change-sort-option="changeSortOption"
        />
      </s-organizations-product-list>
    </div>
  </div>
</template>

<script>
import SCatalogFilter from '~/components/s_catalog_filter/s_catalog_filter';
import SCatalogPresets from '~/components/s_catalog_presets/s_catalog_presets';
import SCatalogTags from '~/components/s_catalog_tags/s_catalog_tags';
import SCatalogMenu from '~/components/s_catalog_menu/s_catalog_menu';
import getOrganizationsList from '~/api/organizationsList';
import getOrganizationsCatalogFilter from '~/api/organizationsCatalogFilter';
import '../s_catalog_section/s_catalog_section.scss';
import SOrganizationsProductList from '~/components/s_organizations_product_list/s_organizations_product_list';

export default {
  name: 'SOrganizationSection',

  props: ['title', 'hasPresets', 'presets', 'productsPerPage', 'currentOption', 'options', 'filtersMenu'],

  components: {
    SCatalogTags,
    SCatalogPresets,
    SOrganizationsProductList,
    SCatalogFilter,
    SCatalogMenu,
  },

  data() {
    return {
      totalProducts: null,
      productList: [],
      filterListData: {},
      filterCheckboxData: {},
      filtersIdsData: {
        city_ids: [],
        level_ids: [],
        format_ids: [],
      },
      filtersCheckboxDataRequest: {
        is_military_center: false,
        is_hostel: false,
      },
      page: 1,
      componentProductsKey: 10,
      componentFilterKey: 100,
      componentMenuKey: 1000,

      selectedFilters: [],
    };
  },

  watch: {
    currentOption() {
      this.fetchProductsList();
    },

    page() {
      this.fetchProductsList();
      if (window.location.search.includes('page')) {
        let newSearch = window.location.search
          .split('&')
          .filter((query) => !query.includes('page'))
          .join('&');
        newSearch = `?page=${this.page}${newSearch ? '&' : ''}${newSearch}`;

        window.history.pushState({}, null, `${window.location.pathname}${newSearch}`);
      }
    },

    productsPerPage() {
      this.fetchProductsList();
    },

    filtersIdsData: {
      deep: true,
      handler() {
        this.pageMain = 1;
        this.componentProductsKey += 3;
        this.fetchProductsList();
      },
    },

    filtersCheckboxDataRequest: {
      handler() {
        this.pageMain = 1;
        this.componentProductsKey += 3;
        this.fetchProductsList();
      },
      deep: true,
    },
  },

  methods: {
    async fetchFilterData() {
      const filtersResponse = await getOrganizationsCatalogFilter();

      filtersResponse.forEach((filters) => {
        if (filters.filter_by !== 'direction_ids' && filters.filter_by !== 'subject_ids') {
          if (filters.type === 'list') {
            this.filterListData[filters.filter_by] = { ...filters };
          }

          if (filters.type === 'checkbox') {
            this.filterCheckboxData[filters.filter_by] = { ...filters };
          }
        }
      });

      this.componentFilterKey += 3;
    },

    async fetchProductsList() {
      const expandedMethod = {
        filter: { published: true },
      };

      // Логика парсинга выбранных фильтров на бэк, для получения отфильрованный товаров
      Object.entries(this.filtersIdsData).forEach((filterData) => {
        if (filterData[1].length === 0) {
          delete expandedMethod.filter[filterData[0]];
        } else {
          const [key, value] = filterData;
          expandedMethod.filter[key] = value;
        }
      });

      // Ставим дефолтные фильтры на организации и города
      if (this.entity_page) {
        const filterKey = `${this.entity_page.type}_ids`;
        expandedMethod.filter[filterKey] = [this.entity_page.id];
      }

      // Логика парсинга чекбоксов, для получения отфильрованный товаров
      Object.entries(this.filtersCheckboxDataRequest).forEach((checkboxData) => {
        const [key, value] = checkboxData;
        if (value) {
          expandedMethod.filter[key] = value;
        } else {
          delete expandedMethod.filter[[key]];
        }
      });

      if (this.categoryId) {
        expandedMethod.filter.category_ids = this.categoryId;
      } else {
        delete expandedMethod.filter.category_ids;
      }

      expandedMethod.pagination = { page: this.page, page_size: this.productsPerPage };
      expandedMethod.sort = this.currentOption;

      const response = await getOrganizationsList(expandedMethod);

      this.totalProducts = response.count;
      this.productList = response.data;
    },

    switchClick(item, isChecked) {
      const selectedSwitch = { ...item, isChecked };
      this.filterCheckboxData[selectedSwitch.filter_by].isChecked = selectedSwitch.isChecked;
      this.$set(this.filtersCheckboxDataRequest, selectedSwitch.filter_by, selectedSwitch.isChecked);
    },

    selectFilter(key, item) {
      const selectedItem = { ...item, key };

      if (selectedItem.isChecked) {
        this.selectedFilters.push(selectedItem);
        this.filtersIdsData[key].push(selectedItem.id);
      } else {
        this.selectedFilters = this.selectedFilters.filter((filter) => filter.name !== item.name);
        this.filtersIdsData[key] = this.filtersIdsData[key].filter((id) => Number(id) !== item.id);
      }

      this.page = 1;
      this.$emit('on-filter-click', this.filtersIdsData, this.filterListData);
    },

    selectControlFilter(key, item, isChecked) {
      const selectedItem = { ...item, key, isChecked };

      if (selectedItem.isChecked) {
        this.selectedFilters.push(selectedItem);
        this.filtersIdsData[key].push(selectedItem.id);
        const found = this.filterListData[selectedItem.key].values.find((value) => value.name === selectedItem.name);
        this.$set(found, 'isChecked', true);
      } else {
        this.selectedFilters = this.selectedFilters.filter((filter) => filter.name !== item.name);
        this.filtersIdsData[key] = this.filtersIdsData[key].filter((id) => Number(id) !== item.id);
        const found = this.filterListData[selectedItem.key].values.find((value) => value.name === selectedItem.name);
        this.$set(found, 'isChecked', false);
      }

      this.page = 1;
      this.$emit('on-filter-click', this.filtersIdsData, this.filterListData);
    },

    menuToggle(value) {
      this.$emit('menu-toggle', value);
    },

    changeSortOption(option) {
      const options = [
        { label: this.options.find((elem) => elem.value === option).label, value: option },
        ...this.options.filter((elem) => elem.value !== option),
      ];
      this.$emit('change-sort-options', options, option);
    },

    clearAllFilters() {
      this.selectedFilters.forEach((selected) => {
        const found = this.filterListData[selected.key].values.find((value) => value.name === selected.name);
        this.$set(found, 'isChecked', false);
      });
      this.$set(this.filtersCheckboxDataRequest, 'is_employment', false);
      this.$set(this.filtersCheckboxDataRequest, 'is_installment', false);
      this.selectedFilters = [];
      Object.values(this.filtersIdsData).forEach((filterIds) => filterIds.splice(0, filterIds.length));
      Object.entries(this.filterCheckboxData).forEach((checkboxData) => {
        this.filterCheckboxData[checkboxData[0]].isChecked = false;
      });

      this.page = 1;
      this.componentFilterKey += 1;
      this.componentMenuKey += 1;
      this.$emit('clear-filters');
    },

    deleteTag(tag) {
      this.selectedFilters = this.selectedFilters.filter((filter) => filter.name !== tag.name);
      this.filtersIdsData[tag.key] = this.filtersIdsData[tag.key].filter((id) => Number(id) !== tag.id);
      const found = this.filterListData[tag.key].values.find((value) => value.name === tag.name);
      this.$set(found, 'isChecked', false);

      this.componentFilterKey += 1;
      this.$emit('delete-filter-tag', this.filtersIdsData, this.filterListData);
    },

    filtersIconClickHandler() {
      this.$emit('menu-toggle', true);
    },
  },

  async fetch() {
    await this.fetchFilterData();
    await this.fetchProductsList();
  },

  created() {
    if (this.$route.query.page) {
      this.page = Number(this.$route.query.page);
    }
  },
};
</script>
