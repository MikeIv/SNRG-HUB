<template>
  <div class="catalog-page__section">
    <swiper class="catalog-presets__tags" :options="$options.swiperOption" v-if="hasPresets">
      <swiper-slide v-for="(preset, index) in presets" :key="index" class="catalog-presets__swiper-slide">
        <nuxt-link :to="`${buildPresetUrl(preset.filter)}`">
          <a-tag :label="preset.name" :class="{ 'catalog-presets__tags_active': isPresetMatched(preset.filter) }" />
        </nuxt-link>
      </swiper-slide>
    </swiper>
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
      <div class="catalog-filter__wrapper" :key="componentFilterKey">
        <m-filter
          v-for="[key, filters] in Object.entries(filterListData)"
          class="catalog-filter__filter"
          :key="key"
          :title="filtersTitle[key]"
          :passedBtnText="filtersText[key]"
          :items="filters"
          @item-click="selectFilter(key, ...arguments)"
        />
        <!--        <a-control-->
        <!--          v-for="filter in filterCheckboxData"-->
        <!--          class="catalog-filter__checkbox"-->
        <!--          :key="filter.filter_by"-->
        <!--          :title="filter.title"-->
        <!--          :checked="filter.isChecked"-->
        <!--          typeBtn="checkbox"-->
        <!--          typeCtrl="switch"-->
        <!--          labelPosition="left"-->
        <!--          @input="switchClick(filter, ...arguments)"-->
        <!--        />-->
      </div>
      <div class="catalog-product-list">
        <div class="catalog-product-list__wrapper" v-if="productList">
          <div class="catalog-page__filters">
            <div class="catalog-page__filters-tags">
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
              <i
                class="si-filter a-font_button catalog-page__filters-icon"
                tabindex="0"
                @click="filtersIconClickHandler"
              >
                <span class="a-font_button">Фильтры</span>
              </i>
            </template>
          </div>
          <h3 v-if="!productList.length">К сожалению, ничего нет</h3>
          <nuxt-link
            v-for="product in productList"
            :to="`/product/${product.slug}`"
            :key="product.id"
            :class="
              $route.name === 'organization-slug'
                ? 'catalog-product-list__item-wrapper-section'
                : 'catalog-product-list__item-wrapper'
            "
          >
            <m-card
              type="program"
              class="catalog-product-list__item"
              :description="product.included.levels[0].name"
              :title="product.name"
              :verticalImgSrc="`${baseURL}/${product.preview_image}`"
              :bottomText="product.included.organization.abbreviation_name"
              :iconSrc="`${baseURL}${product.included.organization.logo}`"
              @organization-click="onOrganizationClick(product)"
            />
          </nuxt-link>
        </div>
        <m-pagination
          v-if="productList"
          :currentPage="page"
          @change-current-page="page = $event"
          @next="page = $event"
          @prev="page = $event"
          :totalItems="Number(totalProducts)"
          :perPage="productsPerPage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import {
  ATag, MFilter, MCard, MPagination,
} from '@cwespb/synergyui';
import SCatalogMenu from '~/components/s_catalog_menu/s_catalog_menu';
import getProductsList from '~/api/products_list';
import './s_catalog_landing.scss';

export default {
  name: 'SCatalogSection',

  props: ['hasPresets', 'presets', 'productsPerPage', 'filters'],

  components: {
    SCatalogMenu,
    ATag,
    MCard,
    MPagination,
    MFilter,
    Swiper,
    SwiperSlide,
  },

  swiperOption: {
    slidesPerView: 'auto',
    spaceBetween: 8,
  },

  data() {
    return {
      baseURL: process.env.NUXT_ENV_S3BACKET,
      totalProducts: null,
      productList: [],
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
      filtersMenu: false,
      page: 1,
      componentProductsKey: 10,
      componentFilterKey: 100,
      componentMenuKey: 1000,

      selectedFilters: [],

      filtersText: {
        direction_ids: 'Все направления',
        format_ids: 'Все форматы',
        level_ids: 'Все уровни',
        city_ids: 'Все города',
        organization_ids: 'Все заведения',
      },
      filtersTitle: {
        direction_ids: 'Направления',
        format_ids: 'Форматы',
        level_ids: 'Уровень образования',
        city_ids: 'Город',
        organization_ids: 'Учебные заведения',
      },
      switchControl: {
        is_employment: false,
        is_installment: false,
      },
    };
  },

  watch: {
    page() {
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
      deep: true,
      handler() {
        this.pageMain = 1;
        this.componentProductsKey += 3;
        this.fetchProductsList();
      },
    },
  },

  methods: {
    buildPresetUrl(preset) {
      let url = '/catalog?page=1';
      Object.entries(preset).forEach(([key, ids]) => {
        if (key !== 'published') {
          url = url.concat(`&${key}=${ids}`);
        }
      });
      return url;
    },

    isPresetMatched(preset) {
      const matchedArray = [];

      Object.entries(this.filtersIdsData).forEach(([key, ids]) => {
        if (Object.keys(preset).includes(key)) {
          const filterIds = ids.map((id) => Number(id)).sort((a, b) => a - b);
          if (filterIds.toString() === preset[key].toString()) {
            matchedArray.push(true);
          } else {
            matchedArray.push(false);
          }
        } else if (ids.length) {
          matchedArray.push(false);
        }
      });

      return !matchedArray.includes(false);
    },

    async fetchFilterData() {
      Object.entries(this.filters).forEach(([key, filterData]) => {
        // Todo: убрать после изменения бэка
        if (key !== 'cities') {
          this.filterListData[`${key.slice(0, -1)}_ids`] = filterData;
        }
      });

      //   if (filters.type === 'list') {
      //     this.filterListData[filters.filter_by] = { ...filters };
      //   }
      //
      //   if (filters.type === 'checkbox') {
      //     this.filtersCheckboxDataRequest[filters.filter_by] = false;
      //     this.filterCheckboxData[filters.filter_by] = { ...filters };
      //   }

      console.log('@@', Object.entries(this.filterListData));
    },

    async fetchProductsList() {
      const expandedMethod = {
        filter: { published: true },
      };

      expandedMethod.include = ['organization', 'levels', 'directions'];

      // Логика парсинга выбранных фильтров на бэк, для получения отфильрованный товаров
      Object.entries(this.filtersIdsData).forEach((filterData) => {
        if (filterData[1].length === 0) {
          delete expandedMethod.filter[filterData[0]];
        } else {
          const [key, value] = filterData;
          expandedMethod.filter[key] = value;
        }
      });

      // Логика парсинга чекбоксов, для получения отфильрованный товаров
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
    },

    selectControlFilter(key, item, isChecked) {
      const selectedItem = { ...item, key, isChecked };

      if (selectedItem.isChecked) {
        this.selectedFilters.push(selectedItem);
        this.filtersIdsData[key].push(selectedItem.id);
        const found = this.filterListData[selectedItem.key].find((value) => value.name === selectedItem.name);
        this.$set(found, 'isChecked', true);
      } else {
        this.selectedFilters = this.selectedFilters.filter((filter) => filter.name !== item.name);
        this.filtersIdsData[key] = this.filtersIdsData[key].filter((id) => Number(id) !== item.id);
        const found = this.filterListData[selectedItem.key].find((value) => value.name === selectedItem.name);
        this.$set(found, 'isChecked', false);
      }

      this.page = 1;
    },

    menuToggle(value) {
      this.filtersMenu = value;
    },

    clearAllFilters() {
      this.selectedFilters.forEach((selected) => {
        const found = this.filterListData[selected.key].find((value) => value.name === selected.name);
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
    },

    deleteTag(tag) {
      this.selectedFilters = this.selectedFilters.filter((filter) => filter.name !== tag.name);
      this.filtersIdsData[tag.key] = this.filtersIdsData[tag.key].filter((id) => Number(id) !== tag.id);
      const found = this.filterListData[tag.key].find((value) => value.name === tag.name);
      this.$set(found, 'isChecked', false);

      this.componentFilterKey += 1;
    },

    filtersIconClickHandler() {
      this.filtersMenu = true;
    },
  },

  async fetch() {
    await this.fetchFilterData();
    await this.fetchProductsList();
  },
};
</script>
