<template>
  <div class="catalog-page__wrapper">
    <h2 class="a-font_h2">
      Программы обучения
      <sup class="catalog-page__header-total a-font_L"> {{ totalProducts }} программ</sup>
    </h2>
    <swiper class="catalog-page__main-tags" ref="awesomeSwiper" :options="swiperOption" v-if="totalProducts">
      <swiper-slide v-for="tag in main_tags" :key="tag.label" class="catalog-page__swiper-slide">
        <a-tag :label="tag.label" :status="tag.status" />
      </swiper-slide>
    </swiper>
    <div v-show="filtersMenu">
      <div class="catalog-page__menu">
        <template v-if="!isFilterExpanded">
          <a-title title="Фильтры" :showIcon="false" @clickClose="filtersMenuClose" class="catalog-page__menu-header" />
          <div v-if="selectedFilters.length" class="catalog-page__menu-tags catalog-page__filters-tags">
            <a-tag
              v-for="tag in selectedFilters"
              :key="`${tag.name}${tag.id}`"
              :label="tag.name"
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
        </template>
        <div class="catalog-page__menu-contents">
          <div v-if="isFilterExpanded">
            <a-title
              :title="filterListData[currentExpandedFilter].title"
              :showIcon="true"
              @clickClose="filtersMenuClose"
              @click="isFilterExpanded = false"
              class="catalog-page__menu-header"
            />
            <a-control
              v-for="filter in filterListData[currentExpandedFilter].values"
              :title="filter.name"
              :key="`${filter.name}${filter.id}`"
              labelPosition="left"
              class="catalog-page__menu-filter_control"
              typeBtn="checkbox"
              typeCtrl="checkbox"
              @input="selectFilter(filterListData[currentExpandedFilter].filter_by, filter, ...arguments)"
            />
          </div>
          <div
            v-else
            class="catalog-page__menu-filters"
            v-for="filters in Object.entries(filterListData)"
            :key="filters[0]"
          >
            <div
              class="catalog-page__menu-filter"
              :class="{ 'catalog-page__menu-filter-expanded': filters[1].values.length > $options.maxVisibleControls }"
              @click="expandedFilterClickHandler(filters[0])"
            >
              <h3 class="a-font_h7">{{ filters[1].title }}</h3>
              <i
                v-if="filters[1].values.length > $options.maxVisibleControls"
                class="si-chevron-right catalog-page__menu-filter-icon"
              />
            </div>
            <div
              v-if="filters[1].values.length < $options.maxVisibleControls"
              class="catalog-page__menu-filter_controls"
            >
              <a-control
                v-for="filter in filters[1].values"
                :title="filter.name"
                :key="`${filter.name}${filter.id}`"
                :checked="filter.isChecked"
                labelPosition="left"
                class="catalog-page__menu-filter_control"
                typeBtn="checkbox"
                typeCtrl="checkbox"
                @input="selectFilter(filters[0], filter, ...arguments)"
              />
            </div>
          </div>
          <div class="catalog-page__menu-button">
            <a-button :label="menuButtonLabel" bgColor="accent" @onClickBtn="filtersMenuClose" />
          </div>
        </div>
      </div>
      <div class="catalog-page__menu-backdrop" @click="filtersMenuClose" />
    </div>
    <div class="catalog-page__content">
      <s-catalog-filter
        v-show="visibleFilters"
        @select-filter="selectFilter"
        @switch-click="switchClick"
        :filterListData="Object.entries(filterListData)"
        :filterCheckboxData="filterCheckboxData"
        :key="componentFilterKey"
      />
      <s-catalog-product-list
        v-if="productList"
        :productList="productList"
        :totalProducts="totalProducts"
        :page="page"
        :productsPerPage="productsPerPage"
        :windowWidth="windowWidth"
        :selectedFilters="selectedFilters"
        @page="pageChange"
        @delete-tag="deleteTag"
        :key="componentProductsKey"
      >
        <div class="catalog-page__filters">
          <div class="catalog-page__filters-tags" v-if="!visibleFiltersIcon">
            <a-tag
              v-if="selectedFilters.length"
              label="Очистить все"
              status="delete"
              @aTagDelete="clearAllFilters"
              @aTagClick="clearAllFilters"
            />
            <a-tag
              v-for="tag in selectedFilters"
              :key="`${tag.name}${tag.id}`"
              :label="tag.name"
              status="selected"
              @aTagDelete="deleteTag(tag)"
            />
          </div>
          <template v-if="productList.length">
            <a-select :options="options" class="catalog-page__select" />
            <i
              v-if="visibleFiltersIcon"
              class="si-filter a-font_button catalog-page__filters-icon"
              tabindex="0"
              @click="filtersIconClickHandler"
            >
              <span class="a-font_button">Фильтры</span>
            </i>
          </template>
        </div>
      </s-catalog-product-list>
    </div>
  </div>
</template>

<script>
import { ATag, ASelect, ATitle, AButton, AControl } from '@cwespb/synergyui';
import { directive } from 'vue-awesome-swiper';
import SCatalogFilter from '~/components/s_catalog_filter/s_catalog_filter';
import SCatalogProductList from '~/components/s_catalog_product_list/s_catalog_product_list';
import getProductsList from '~/api/products_list';
import getFilterData from '~/api/filter_data';
import './s_catalog.scss';
import 'swiper/css/swiper.min.css';

export default {
  name: 'SCatalog',
  components: {
    SCatalogProductList,
    SCatalogFilter,
    ATag,
    ASelect,
    ATitle,
    AButton,
    AControl,
  },
  props: ['pageInfo'],

  productNumberOnDesktop: 24,
  productNumberOnTablet: 16,
  productNumberOnMobile: 8,
  desktopEndpointResolution: 1200,
  tabletEndpointResolution: 900,
  mobileEndpointResolution: 650,
  maxVisibleControls: 7,

  directives: {
    swiper: directive,
  },

  data() {
    return {
      totalProducts: [],
      productList: [],
      selectedFilters: [],
      page: 1,
      productsPerPage: this.$options.productNumberOnDesktop,
      windowWidth: null,
      main_tags: [
        { status: 'default', label: 'UX/UI  дизайнер' },
        { status: 'default', label: 'JS-разработчик' },
        { status: 'default', label: 'Верстальщик' },
        { status: 'default', label: 'Проджект-менеджер' },
        { status: 'default', label: 'Менеджер по продажам' },
        { status: 'default', label: 'Веб-дизайнер' },
        { status: 'default', label: 'Аналитик' },
      ],
      options: [
        {
          label: 'Популярные',
          value: 'popular',
        },
        {
          label: 'Новые',
          value: 'new',
        },
      ],

      filterListData: {},
      filterCheckboxData: [],
      filtersIdsData: {
        direction_ids: [],
        format_ids: [],
        level_ids: [],
        city_ids: [],
        organization_ids: [],
      },
      filtersCheckboxDataRequest: {
        is_employment: false,
        is_installment: false,
      },
      filtersMenu: false,
      isFilterExpanded: false,
      currentExpandedFilter: null,
      componentFilterKey: 1,
      componentProductsKey: 100,

      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 8,
      },
    };
  },

  watch: {
    page() {
      this.$router.push({ path: this.$route.path, query: { page: this.page } });
      this.fetchProductsList();
    },

    productsPerPage() {
      this.fetchProductsList();
    },

    filtersIdsData: {
      deep: true,
      handler() {
        console.log('changed filtersIdsData');
        this.fetchProductsList();
      },
    },

    filtersCheckboxDataRequest: {
      deep: true,
      handler() {
        console.log('changed filtersCheckboxDataRequest');
        this.fetchProductsList();
      },
    },

    filtersMenu() {
      document.body.style.cssText = `
        overflow: ${this.filtersMenu ? 'hidden' : ''};
        height: ${this.filtersMenu ? '100vh' : ''};
      `;
    },

    windowWidth() {
      if (this.windowWidth > this.$options.desktopEndpointResolution) {
        this.productsPerPage = this.$options.productNumberOnDesktop;
        this.componentProductsKey += 1;
      }

      if (this.windowWidth < this.$options.desktopEndpointResolution) {
        this.productsPerPage = this.$options.productNumberOnTablet;
        this.componentProductsKey += 1;
      }

      if (this.windowWidth < this.$options.mobileEndpointResolution) {
        this.productsPerPage = this.$options.productNumberOnMobile;
        this.page = 1;
        this.componentProductsKey += 1;
        this.clearAllFilters();
      }
    },
  },

  computed: {
    visibleFilters() {
      return this.windowWidth > this.$options.tabletEndpointResolution;
    },

    visibleFiltersIcon() {
      return this.windowWidth < this.$options.tabletEndpointResolution;
    },

    menuButtonLabel() {
      return `Показать ${this.totalProducts} предложений`;
    },

    swiper() {
      return this.$refs.awesomeSwiper.swiper;
    },
  },

  methods: {
    async fetchFilterData() {
      const filtersResponse = await getFilterData(this.pageInfo.components[0].methods[0].data);
      console.log('RESPONSE FILTER:', filtersResponse);
      filtersResponse.forEach((filters) => {
        if (filters.type === 'list') {
          this.filterListData[filters.filter_by] = { ...filters };
          this.filtersIdsData[filters.filter_by] = [];
        }
        if (filters.type === 'checkbox') {
          this.filtersCheckboxDataRequest[filters.filter_by] = false;
          this.filterCheckboxData.push(filters);
        }
      });
      console.log('MY-FILTER-LIST:', this.filterListData);
    },

    async fetchProductsList() {
      const expandedMethod = { ...this.pageInfo.components[1].methods[0].data };
      expandedMethod.include = ['organization', 'levels', 'directions'];
      // Todo
      Object.entries(this.filtersIdsData).forEach((filterData) => {
        if (filterData[1].length !== 0) {
          expandedMethod.filter[filterData[0]] = filterData[1];
        }
      });

      Object.entries(this.filtersCheckboxDataRequest).forEach((checkboxData) => {
        expandedMethod.filter[checkboxData[0]] = checkboxData[1];
      });

      console.log('requestBody to server', expandedMethod);

      expandedMethod.pagination = { page: this.page, page_size: this.productsPerPage };
      const response = await getProductsList(expandedMethod);
      this.totalProducts = response.count;
      this.productList = response.data;
    },

    handleResize() {
      this.windowWidth = window.innerWidth;
    },

    pageChange(page) {
      this.page = page;
    },

    deleteTag(tag) {
      // Todo, убирать из filtersIdsData айди элемента, чтобы отправлялся запрос на бэк
      this.selectedFilters = this.selectedFilters.filter((filter) => filter.name !== tag.name);
      const found = this.filterListData[tag.key].values.find((value) => value.name === tag.name);
      this.$set(found, 'isChecked', false);

      // Меняяем уникальный ключ s-catalog-filter, заставляя его перерендерится
      this.componentFilterKey += 1;
    },

    clearAllFilters() {
      this.selectedFilters.forEach((selected) => {
        const found = this.filterListData[selected.key].values.find((value) => value.name === selected.name);
        this.$set(found, 'isChecked', false);
      });
      this.selectedFilters = [];
      Object.values(this.filtersIdsData).forEach((filterIds) => filterIds.splice(0, filterIds.length));
      this.componentFilterKey += 1;
    },

    switchClick(selectedSwitch) {
      this.filtersCheckboxDataRequest[selectedSwitch.filter_by] = selectedSwitch.isChecked;
    },

    selectFilter(key, item, isChecked) {
      const selectedItem = { ...item, key };
      if (isChecked) {
        selectedItem.isChecked = isChecked;
      }
      console.log(key);
      if (selectedItem.isChecked) {
        this.selectedFilters.push(selectedItem);
        this.filtersIdsData[key].push(selectedItem.id);
      } else {
        this.selectedFilters = this.selectedFilters.filter((filter) => filter.id !== item.id);
        this.filtersIdsData[key] = this.filtersIdsData[key].filter((id) => id !== item.id);
      }
      console.log('this.filtersIdsDat select control', this.filtersIdsData);
    },

    filtersIconClickHandler() {
      this.filtersMenu = true;
    },

    filtersMenuClose() {
      this.filtersMenu = false;
      this.isFilterExpanded = false;
      this.currentExpandedFilter = null;
    },

    menuControlSelect(filter) {
      this.selectedFilters.push(filter);
    },

    expandedFilterClickHandler(filterKey) {
      this.currentExpandedFilter = filterKey;
      this.isFilterExpanded = true;
    },
  },

  created() {
    if (this.$route.query.page) {
      this.page = Number(this.$route.query.page);
    } else {
      this.$router.push({ path: this.$route.path, query: { page: 1 } });
    }
  },

  async fetch() {
    // await this.fetchFilterData();
  },

  mounted() {
    this.fetchProductsList();
    this.fetchFilterData(); // Убрать отсюда, это для отладки
    this.windowWidth = window.innerWidth;
    window.addEventListener('resize', this.handleResize);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>
