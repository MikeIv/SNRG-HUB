<template>
  <div class="catalog-page__wrapper">
    <h2 class="a-font_h2">
      Программы обучения
      <sup class="catalog-page__header-total a-font_L"> {{ totalProducts.length }} программ</sup>
    </h2>
    <swiper class="catalog-page__main-tags" :options="swiperOption">
      <swiper-slide v-for="tag in main_tags" :key="tag.label" class="catalog-page__swiper-slide">
        <a-tag :label="tag.label" :status="tag.status" />
      </swiper-slide>
    </swiper>
    <template v-if="filtersMenu">
      <div class="catalog-page__menu">
        <template v-if="!isFilterExpanded">
          <a-title title="Фильтры" :showIcon="false" @clickClose="filtersMenuClose" class="catalog-page__menu-header" />
          <div v-if="selectedFilters.length" class="catalog-page__menu-tags catalog-page__filters-tags">
            <a-tag
              v-for="tag in selectedFilters"
              :key="tag.id"
              :label="tag.title"
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
        <div class="catalog-page__menu-contents" v-if="filterData">
          <div v-if="isFilterExpanded">
            <a-title
              :title="filtersKeys[currentExpandedFilter]"
              :showIcon="true"
              @clickClose="filtersMenuClose"
              @click="isFilterExpanded = false"
              class="catalog-page__menu-header"
            />
            <a-control
              v-for="filter in filterData[currentExpandedFilter]"
              :title="filter.title"
              :key="filter.id"
              labelPosition="left"
              class="catalog-page__menu-filter_control"
              typeBtn="checkbox"
              typeCtrl="checkbox"
              @change-control="menuControlSelect(filter)"
            />
          </div>
          <div
            v-else
            class="catalog-page__menu-filters"
            v-for="(filterProp, filterKey) in filterData"
            :key="filtersKeys[filterKey]"
          >
            <div
              class="catalog-page__menu-filter"
              :class="{ 'catalog-page__menu-filter-expanded': filterProp.length > 7 }"
              @click="expandedFilterClickHandler(filterKey, filterProp)"
            >
              <h3 class="a-font_h3">{{ filtersKeys[filterKey] }}</h3>
              <i v-if="filterProp.length > 7" class="si-chevron-right catalog-page__menu-filter-icon" />
            </div>
            <div v-if="filterProp.length < 7" class="catalog-page__menu-filter_controls">
              <a-control
                v-for="filter in filterProp"
                :title="filter.title"
                :key="filter.id"
                labelPosition="left"
                class="catalog-page__menu-filter_control"
                typeBtn="checkbox"
                typeCtrl="checkbox"
                @change-control="menuControlSelect(filter)"
              />
            </div>
          </div>
          <div class="catalog-page__menu-button">
            <a-button :label="menuButtonLabel" bgColor="accent" />
          </div>
        </div>
      </div>
      <div class="catalog-page__menu-backdrop" @click="filtersMenuClose" />
    </template>

    <div class="catalog-page__content">
      <s-catalog-filter
        :methods="pageInfo.components[0].methods"
        v-if="visibleFilters"
        @select-filter="selectFilter"
        :filterData="filterData"
        :filtersKeys="filtersKeys"
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
              :key="tag.id"
              :label="tag.title"
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
              <span>Фильтры</span>
            </i>
          </template>
        </div>
      </s-catalog-product-list>
    </div>
  </div>
</template>

<script>
import {
  ATag, ASelect, AControl, ATitle, AButton,
} from '@cwespb/synergyui';
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import SCatalogFilter from '~/components/s_catalog_filter/s_catalog_filter';
import SCatalogProductList from '~/components/s_catalog_product_list/s_catalog_product_list';
import getProductsList from '~/api/products_list';
import getFilterData from '~/api/filter_data';
import '@cwespb/synergyui/lib/synergyui.css';
import './s_catalog.scss';
import 'swiper/css/swiper.min.css';

export default {
  name: 'SCatalog',
  components: {
    SCatalogProductList,
    SCatalogFilter,
    ATag,
    ASelect,
    AControl,
    ATitle,
    AButton,
    Swiper,
    SwiperSlide,
  },
  props: ['pageInfo'],

  productNumberOnDesktop: 9, // 24
  productNumberOnTablet: 4, // 16
  productNumberOnMobile: 2, // 8
  desktopEndpointResolution: 1200,
  tabletEndpointResolution: 900,
  mobileEndpointResolution: 600,

  data() {
    return {
      totalProducts: [],
      productList: [],
      selectedFilters: [],
      page: 1,
      productsPerPage: this.$options.productNumberOnDesktop,
      windowWidth: null,
      // Todo: передать все фильтры из родителя в компонент фильтра и здесь менять на фолз при удалении
      main_tags: [
        { status: 'default', label: 'UX/UI  дизайнер' },
        { status: 'default', label: 'JS-разработчик' },
        { status: 'default', label: 'Верстальщик' },
        { status: 'default', label: 'Проджект-менеджер' },
        { status: 'default', label: 'Менеджер по продажам' },
        { status: 'default', label: 'Веб-дизайнер' },
        { status: 'default', label: 'Аналитик' },
      ],
      filterData: [],
      options: [
        {
          label: 'Популярные',
          value: 'popular',
        },
        {
          label: 'label2',
          value: 'value2',
        },
        {
          label: 'label3',
          value: 'value3',
        },
      ],
      filtersKeys: {
        directions: 'Направления',
        formats: 'Формат',
        levels: 'Уровень образования',
        subjects: 'Профессии',
      },
      filtersIdsData: {
        directions: [],
        formats: [],
        levels: [],
        subjects: [],
      },
      filtersMenu: false,
      isFilterExpanded: false,
      currentExpandedFilter: null,

      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 8,
      },
    };
  },

  directives: {
    swiper: directive,
  },

  watch: {
    page() {
      this.$router.push({ path: this.$route.path, query: { page: this.page } });
      this.fetchProductsList();
    },

    productsPerPage() {
      this.fetchProductsList();
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
      return `Показать ${this.totalProducts.length} предложений`;
    },
  },

  methods: {
    async fetchProductsList() {
      const expandedMethod = { ...this.pageInfo.components[1].methods[0] };
      expandedMethod.include = ['organization', 'levels', 'directions'];
      this.totalProducts = await getProductsList(expandedMethod);
      expandedMethod.pagination = { page: this.page, page_size: this.productsPerPage };
      this.productList = await getProductsList(expandedMethod);
    },

    async fetchFilterData() {
      this.filterData = await getFilterData(this.pageInfo.components[0].methods[0].data);
      // Todo Убрать после изменения бэка
      // this.filterData.directions.forEach((el) => {
      //   el.title = el.name;
      //   if (el.id < 5) {
      //     el.isChecked = true;
      //   }
      // });
      //
      // this.filterData.levels.forEach((el) => {
      //   el.title = el.name;
      //   el.isChecked = false;
      // });
      //
      // this.filterData.formats.forEach((el) => {
      //   el.title = el.name;
      //   el.isChecked = false;
      // });
      //
      // this.filterData.subjects.forEach((el) => {
      //   el.title = el.name;
      //   el.isChecked = false;
      // });

      console.log(this.filterData);
      // Todo поменять после смены бэка
      // Если с бэка приходят уже отмеченные фильтры, то я сразу заполняю
      // массив selectedFilters и показываю тэги
      Object.values(this.filterData).forEach((filterKey) => {
        filterKey.forEach((filter) => {
          if (filter.isChecked) {
            this.selectedFilters.push(filter);
          }
        });
      });
    },

    handleResize() {
      this.windowWidth = window.innerWidth;
    },

    pageChange(page) {
      this.page = page;
    },

    deleteTag(tag) {
      this.selectedFilters = this.selectedFilters.filter((filter) => filter.title !== tag.title);
    },

    clearAllFilters() {
      console.log(this.selectedFilters);
      // this.selectedFilters.forEach((filter) => (filter.isChecked = false));
      this.selectedFilters = [];
      console.log(this.selectedFilters.length);
    },

    selectFilter(filter) {
      console.log('clickedItem', filter);
      // Todo this.selectedFilters.push(filter);
      // здесь я буду получать объект менять значение isChecked в filterData
      if (filter) {
        this.selectedFilters.push(filter);
      }
      // console.log(this.selectedFilters);
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
      // Возможно метод надо оъеденить с методом выбора фильтров на десктопе
      this.selectedFilters.push(filter);
      console.log(filter);
    },

    expandedFilterClickHandler(filterKey, filterProp) {
      if (filterProp.length > 6) {
        this.currentExpandedFilter = filterKey;
        this.isFilterExpanded = true;
        console.log(filterKey);
        console.log(this.filtersKeys[filterKey]);
      }
    },
  },

  created() {
    if (this.$route.query.page) {
      this.page = Number(this.$route.query.page);
    } else {
      this.$router.push({ path: this.$route.path, query: { page: 1 } });
    }
  },

  mounted() {
    this.fetchProductsList();
    this.fetchFilterData();
    this.windowWidth = window.innerWidth;
    window.addEventListener('resize', this.handleResize);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>
