<template>
  <div class="l-wide catalog-page">
    <h2 class="a-font_h2">
      Программы обучения
      <sup class="catalog-page__header-total a-font_L"> {{ totalProducts }} программ</sup>
    </h2>
    <swiper class="catalog-page__main-tags" :options="swiperOption" v-if="totalProducts">
      <swiper-slide v-for="tag in main_tags" :key="tag.label" class="catalog-page__swiper-slide">
        <a-tag :label="tag.label" :status="tag.status" />
      </swiper-slide>
    </swiper>
    <div v-show="filtersMenu">
      <div class="catalog-page__menu" :key="componentMenuKey">
        <div v-show="!isFilterExpanded">
          <a-title title="Фильтры" :showIcon="false" @clickClose="filtersMenuClose" class="catalog-page__menu-header" />
          <div v-if="selectedFilters.length" class="catalog-page__menu-tags catalog-page__filters-tags">
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
        <div class="catalog-page__menu-contents">
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
              :class="{ 'catalog-page__menu-filter-expanded': filters[1].values.length > $options.maxVisibleControls }"
              @click="
                filters[1].values.length > $options.maxVisibleControls ? expandedFilterClickHandler(filters[0]) : null
              "
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
                :title="filter.abbreviation_name ? filter.abbreviation_name : filter.name"
                :key="`${filter.name}${filter.id}`"
                :checked="filter.isChecked"
                :labelText="filter.abbreviation_name ? filter.name : filter.abbreviation_name"
                labelPosition="left"
                class="catalog-page__menu-filter_control"
                typeBtn="checkbox"
                typeCtrl="checkbox"
                @input="selectFilter(filters[0], filter, ...arguments)"
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
              labelPosition="left"
              @input="switchClick(filter, ...arguments)"
            />
            <div class="catalog-page__menu-button">
              <a-button :label="menuButtonLabel" bgColor="accent" @onClickBtn="filtersMenuClose" />
            </div>
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
        :filtersCheckboxDataRequest="filtersCheckboxDataRequest"
        :key="componentFilterKey"
      />
      <s-catalog-product-list
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
              :label="tag.key === 'organization_ids' ? tag.abbreviation_name : tag.name"
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
import { ATag, ASelect, ATitle, AButton, AControl, MFilter } from '@cwespb/synergyui';
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import SCatalogFilter from '~/components/s_catalog_filter/s_catalog_filter';
import SCatalogProductList from '~/components/s_catalog_product_list/s_catalog_product_list';
import getProductsList from '~/api/products_list';
import getFilterData from '~/api/filter_data';
import './s_catalog.scss';

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
    MFilter,
    Swiper,
    SwiperSlide,
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
      filtersCheckboxDataRequest: {},
      filtersMenu: false,
      isFilterExpanded: false,
      currentExpandedFilter: 'direction_ids',
      componentFilterKey: 1,
      componentProductsKey: 100,
      componentExpandedMenuKey: 1000,
      componentMenuKey: 3000,

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
        this.componentProductsKey += 1;
        this.fetchProductsList();
      },
    },

    filtersCheckboxDataRequest: {
      deep: true,
      handler() {
        this.componentProductsKey += 1;
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
      }

      if (this.windowWidth < this.$options.desktopEndpointResolution) {
        this.productsPerPage = this.$options.productNumberOnTablet;
      }

      if (this.windowWidth < this.$options.mobileEndpointResolution) {
        this.productsPerPage = this.$options.productNumberOnMobile;
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
  },

  methods: {
    async fetchFilterData() {
      const filtersResponse = await getFilterData(this.pageInfo.components[0].methods[0].data);
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
    },

    async fetchProductsList() {
      const expandedMethod = { ...this.pageInfo.components[1].methods[0].data };
      expandedMethod.include = ['organization', 'levels', 'directions'];
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
      this.selectedFilters = this.selectedFilters.filter((filter) => filter.name !== tag.name);
      this.filtersIdsData[tag.key] = this.filtersIdsData[tag.key].filter((id) => id !== tag.id);
      const found = this.filterListData[tag.key].values.find((value) => value.name === tag.name);
      this.$set(found, 'isChecked', false);
      console.log('filters', this.selectedFilters);
      // Меняяем уникальный ключ s-catalog-filter, заставляя его перерендерится
      this.componentFilterKey += 1;
    },

    clearAllFilters() {
      this.selectedFilters.forEach((selected) => {
        const found = this.filterListData[selected.key].values.find((value) => value.name === selected.name);
        this.$set(found, 'isChecked', false);
      });
      this.$set(this.filtersCheckboxDataRequest, 'is_employment', false);
      this.$set(this.filtersCheckboxDataRequest, 'is_installment', false);
      this.componentMenuKey += 1;
      this.selectedFilters = [];
      Object.values(this.filtersIdsData).forEach((filterIds) => filterIds.splice(0, filterIds.length));
      this.componentFilterKey += 1;
    },

    switchClick(item, isChecked) {
      const selectedSwitch = { ...item, isChecked };
      this.page = 1;
      this.filtersCheckboxDataRequest[selectedSwitch.filter_by] = selectedSwitch.isChecked;
    },

    selectFilter(key, item, isChecked) {
      // const found = this.filterListData[key].values.find((value) => value.name === item.name);
      // this.$set(found, 'isChecked', item.isChecked);
      this.page = 1;
      const selectedItem = { ...item, key };
      if (isChecked !== undefined) {
        selectedItem.isChecked = isChecked;
      }

      if (selectedItem.isChecked) {
        this.selectedFilters.push(selectedItem);
        this.filtersIdsData[key].push(selectedItem.id);
      } else {
        this.selectedFilters = this.selectedFilters.filter((filter) => filter.name !== item.name);
        this.filtersIdsData[key] = this.filtersIdsData[key].filter((id) => id !== item.id);
      }

      console.log('filters', this.selectedFilters);
    },

    filtersIconClickHandler() {
      this.filtersMenu = true;
    },

    filtersMenuClose() {
      this.filtersMenu = false;
      this.isFilterExpanded = false;
    },

    menuControlSelect(filter) {
      this.selectedFilters.push(filter);
    },

    expandedFilterClickHandler(filterKey) {
      this.componentExpandedMenuKey += 1;
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
    await this.fetchProductsList();
    await this.fetchFilterData();
  },

  mounted() {
    this.windowWidth = window.innerWidth;
    window.addEventListener('resize', this.handleResize);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>
