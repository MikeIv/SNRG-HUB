<template>
  <div>
    <h2 class="a-font_h2">
      {{ title }}
      <sup class="catalog-page__header-total a-font_L"> {{ totalProducts }} программ</sup>
    </h2>
    <s-catalog-presets :presets="presets" :has-presets="hasPresets" :filters-ids-data="filtersIdsData" />
    <div class="catalog-page__content">
      <s-catalog-filter
        v-show="visibleFilters"
        :filterListData="Object.entries(filterListData)"
        :filterCheckboxData="filterCheckboxData"
        :key="componentFilterKey"
      />
      <s-catalog-product-list
        :productList="productList"
        :totalProducts="totalProducts"
        :page="page"
        :productsPerPage="productsPerPage"
        :windowWidth="windowWidth"
        :key="componentProductsKey"
        @page="page = $event"
      >
        <s-catalog-tags
          :selected-filters="selectedFilters"
          :visibleFiltersIcon="visibleFiltersIcon"
          :productList="productList"
          @clear-all-filters="clearAllFilters"
          @delete-tag="deleteTag"
          @filters-icon-click="filtersIconClickHandler"
          @change-sort-option="changeSortOption"
        />
      </s-catalog-product-list>
    </div>
  </div>
</template>

<script>
import SCatalogFilter from '~/components/s_catalog_filter/s_catalog_filter';
import SCatalogProductList from '~/components/s_catalog_product_list/s_catalog_product_list';
import SCatalogPresets from '~/components/s_catalog_presets/s_catalog_presets';
import SCatalogTags from '~/components/s_catalog_tags/s_catalog_tags';
import getProductsList from '~/api/products_list';
import getFilterData from '~/api/filter_data';
import './s_catalog_main.scss';

export default {
  name: 'SCatalogMain',

  props: ['title', 'hasPresets', 'presets', 'pageInfo', 'category'],

  components: {
    SCatalogTags,
    SCatalogPresets,
    SCatalogProductList,
    SCatalogFilter,
  },

  productNumberOnDesktop: 24,
  productNumberOnTablet: 16,
  productNumberOnMobile: 8,
  desktopEndpointResolution: 1200,
  tabletEndpointResolution: 900,
  mobileEndpointResolution: 650,

  data() {
    return {
      totalProducts: null,
      productList: [],
      windowWidth: null,
      filterListData: {},
      filterCheckboxData: {},
      filtersIdsData: {
        direction_ids: [],
        format_ids: [],
        level_ids: [],
        city_ids: [],
        organization_ids: [],
      },
      filtersCheckboxDataRequest: {},
      componentProductsKey: 10,
      componentFilterKey: 100,
      page: 1,
      productsPerPage: this.$options.productNumberOnDesktop,

      selectedFilters: [],

      currentOption: 'sort',
      options: [
        {
          label: 'Популярные',
          value: 'sort',
        },
        {
          label: 'Новые',
          value: '-id',
        },
        {
          label: 'Старые',
          value: 'id',
        },
        {
          label: 'По алфавиту А-Я',
          value: 'name',
        },
        {
          label: 'По алфавиту Я-А',
          value: '-name',
        },
      ],
    };
  },

  computed: {
    visibleFilters() {
      return this.windowWidth > this.$options.tabletEndpointResolution;
    },

    visibleFiltersIcon() {
      return this.windowWidth < this.$options.tabletEndpointResolution;
    },
  },

  watch: {
    page() {
      this.fetchProductsList();
    },

    productsPerPage() {
      this.fetchProductsList();
    },

    windowWidth() {
      if (this.windowWidth > this.$options.desktopEndpointResolution) {
        this.productsPerPage = this.$options.productNumberOnDesktop;
      }

      if (this.windowWidth < this.$options.desktopEndpointResolution) {
        this.productsPerPage = this.$options.productNumberOnTablet;
      }

      if (this.windowWidth < this.$options.mobileEndpointResolution) {
        this.productsPerPage = this.$options.productNumberOnMobile;
      }
    },
  },

  methods: {
    async fetchFilterData() {
      const filtersResponse = await getFilterData(this.pageInfo.components[1].methods[0].data);
      filtersResponse.forEach((filters) => {
        if (filters.type === 'list') {
          this.filterListData[filters.filter_by] = { ...filters };
        }

        if (filters.type === 'checkbox') {
          this.filtersCheckboxDataRequest[filters.filter_by] = false;
          this.filterCheckboxData[filters.filter_by] = { ...filters };
        }
      });

      this.componentFilterKey += 3;
    },

    async fetchProductsList() {
      const expandedMethod = { ...this.pageInfo.components[0].methods[0].data };
      expandedMethod.include = ['organization', 'levels', 'directions'];

      // Сюда будем вшивать категорию с пропа
      // this.category

      // Логика парсинга выбранных фильтров на бэк, для получения отфильрованный товаров
      Object.entries(this.filtersIdsData).forEach((filterData) => {
        if (filterData[1].length === 0) {
          delete expandedMethod.filter[filterData[0]];
        } else {
          const [key, value] = filterData;
          expandedMethod.filter[key] = value;
        }
      });

      Object.entries(this.filtersCheckboxDataRequest).forEach((checkboxData) => {
        const [key, value] = checkboxData;
        if (value) {
          expandedMethod.filter[key] = value;
        } else {
          delete expandedMethod.filter[[key]];
        }
      });

      expandedMethod.pagination = { page: this.page, page_size: this.productsPerPage };
      expandedMethod.sort = this.currentOption;
      const response = await getProductsList(expandedMethod);
      this.totalProducts = response.count;
      this.productList = response.data;
    },

    switchClick(item, isChecked) {
      this.$emit('switch-click', item, isChecked);
    },

    selectFilter(key, item, isChecked) {
      this.$emit('select-filter', key, item, isChecked);
    },

    changeSortOption(option) {
      this.options = [
        { label: this.options.find((elem) => elem.value === option).label, value: option },
        ...this.options.filter((elem) => elem.value !== option),
      ];
      this.currentOption = option;
    },

    clearRouteFilters() {
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
    },

    clearAllFilters() {
      this.clearRouteFilters();

      this.componentFilterKey += 1;
      this.componentMenuKey += 1;
    },

    deleteTag(tag) {
      this.selectedFilters = this.selectedFilters.filter((filter) => filter.name !== tag.name);
      this.filtersIdsData[tag.key] = this.filtersIdsData[tag.key].filter((id) => Number(id) !== tag.id);
      const found = this.filterListData[tag.key].values.find((value) => value.name === tag.name);
      this.$set(found, 'isChecked', false);

      this.componentFilterKey += 1;
    },

    filtersIconClickHandler() {
      this.filtersMenu = true;
    },

    handleResize() {
      this.windowWidth = window.innerWidth;
    },
  },

  mounted() {
    this.windowWidth = window.innerWidth;
    window.addEventListener('resize', this.handleResize);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },

  async fetch() {
    await this.fetchProductsList();
    await this.fetchFilterData();
  },
};
</script>
