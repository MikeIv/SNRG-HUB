<template>
  <div class="catalog-page__section catalog-page__section-lp">
    <swiper class="catalog-presets__tags" :options="$options.swiperOption">
      <swiper-slide v-for="preset in presets" :key="preset.id" class="catalog-presets__swiper-slide">
        <a-tag
          @aTagClick="selectPreset(preset)"
          @aTagDelete="activePreset = null"
          :label="preset.name"
          :status="activePreset && activePreset.name === preset.name ? 'selected' : 'default'"
        />
      </swiper-slide>
    </swiper>

    <a-popup :visible="popup" @close="popup = false">
      <div class="catalog-page__section-lp__popup">
        <s-program-start :methods="methodsStart" />
        <s-program-content :methods="methodsContent" title="Программа обучения" />
        <s-program-teachers :slug="productSlug" title="<span>Преподаватель</span> курса" />
        <s-program-skills :methods="methodsSkills" title="Чему <span>вы научитесь</span>" />
        <s-program-form />
      </div>
    </a-popup>

    <div v-if="filtersMenu">
      <div class="catalog-page__menu" v-if="filterListData">
        <div v-show="!isFilterExpanded">
          <a-title title="Фильтры" :showIcon="false" @clickClose="filtersMenuClose" class="catalog-page__menu-header" />
        </div>
        <div class="catalog-page__menu-contents" ref="menuContent">
          <div v-show="isFilterExpanded" :key="componentExpandedMenuKey">
            <a-title
              :title="filtersTitle[currentExpandedFilter]"
              :showIcon="true"
              @clickClose="filtersMenuClose"
              @click="isFilterExpanded = false"
              class="catalog-page__menu-header"
            />
            <m-filter
              title=""
              passedBtnText=""
              :hasSearch="filterListData[currentExpandedFilter].search"
              :items="filterListData[currentExpandedFilter]"
              :visibleCount="1000"
              class="catalog-page__menu-filter_mfilter"
              @item-click="selectFilter(currentExpandedFilter, ...arguments)"
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
              :class="{ 'catalog-page__menu-filter-expanded': filters[1].length > 7 }"
              @click="filters[1].length > 7 ? expandedFilterClickHandler(filters[0]) : null"
            >
              <h3 class="a-font_h7">{{ filtersTitle[filters[0]] }}</h3>
              <i v-if="filters[1].length > 7" class="si-chevron-right catalog-page__menu-filter-icon" />
            </div>
            <div v-if="filters[1].length < 7" class="catalog-page__menu-filter_controls">
              <a-control
                v-for="filter in filters[1]"
                :title="filter.abbreviation_name ? filter.abbreviation_name : filter.name"
                :key="`${filter.name}${filter.id}`"
                :checked="filter.isChecked"
                :labelText="filter.abbreviation_name ? filter.name : filter.abbreviation_name"
                labelPosition="left"
                class="catalog-page__menu-filter_control"
                typeBtn="checkbox"
                typeCtrl="checkbox"
                @input="selectControlFilter(filters[0], filter, ...arguments)"
              />
            </div>
          </div>
          <div v-show="!isFilterExpanded">
            <a-control
              v-for="[key, filters] in Object.entries(filterCheckboxData)"
              class="catalog-page__menu-filter_control catalog-page__menu-filter_switch"
              :key="key"
              :title="filters.name"
              typeBtn="checkbox"
              typeCtrl="switch"
              :checked="filters.isChecked"
              labelPosition="left"
              @input="switchClick(filters, ...arguments)"
            />
            <div class="catalog-page__menu-button">
              <a-button label="Показать предложения" bgColor="accent" @click="filtersMenuClose" />
            </div>
          </div>
        </div>
      </div>
      <div class="catalog-page__menu-backdrop" @click="filtersMenuClose" />
    </div>
    <div class="catalog-page__content">
      <div class="catalog-filter__wrapper" :key="componentFilterKey">
        <m-filter
          v-for="[key, filters] in Object.entries(filterListData)"
          class="catalog-filter__filter"
          :hasSearch="filters.search"
          :key="key"
          :title="filtersTitle[key]"
          :passedBtnText="filtersText[key]"
          :items="filters"
          @item-click="selectFilter(key, ...arguments)"
        />
        <a-control
          v-for="[key, filters] in Object.entries(filterCheckboxData)"
          class="catalog-filter__checkbox"
          :key="key"
          :title="filters.name"
          :checked="filters.isChecked"
          typeBtn="checkbox"
          typeCtrl="switch"
          labelPosition="left"
          @input="switchClick(filters, ...arguments)"
        />
      </div>
      <div v-if="!activePreset" class="catalog-product-list-wrapper" :key="componentProductsKey">
        <template>
          <i
            class="si-filter a-font_button catalog-page__filters-icon catalog-page__filters-icon-lp"
            tabindex="0"
            @click="filtersIconClickHandler"
          >
            <span class="a-font_button">Фильтры</span>
          </i>
        </template>
        <div class="catalog-product-list" v-for="preset in presets" :key="preset.id">
          <h2 class="a-font_h2 catalog-product-list__title">
            {{ preset.name }}
            <sup class="catalog-page__header-total a-font_L"> {{ totalProducts[preset.slug] }} программ</sup>
          </h2>
          <div class="catalog-product-list__wrapper" v-if="productList[preset.slug]">
            <h3 class="catalog-product-list__wrapper-sorry" v-if="!productList[preset.slug].length">
              К сожалению, ничего нет
            </h3>
            <div
              class="catalog-product-list__item-wrapper-section catalog-product-list__item"
              v-for="product in productList[preset.slug]"
              :key="product.id"
              @click="openPopupHandler(product)"
            >
              <m-card
                type="program"
                :description="product.included.levels[0].name"
                :title="product.name"
                :verticalImgSrc="`${baseURL}/${product.preview_image}`"
                :bottomText="product.included.organization.abbreviation_name"
                :iconSrc="`${baseURL}${product.included.organization.logo}`"
                @organization-click="onOrganizationClick(product)"
              />
            </div>
          </div>
          <a-button
            class="catalog-product-list__button"
            v-if="totalProducts[preset.slug] > 10 && productsPerPage[preset.slug] < totalProducts[preset.slug]"
            bgColor="ghost-primary"
            :label="`Показать еще ${
              totalProducts[preset.slug] - productsPerPage[preset.slug] < 10
                ? totalProducts[preset.slug] - productsPerPage[preset.slug]
                : 10
            } программ из ${totalProducts[preset.slug] - productsPerPage[preset.slug]}`"
            size="large"
            @click="onMoreProductsClickHandler(preset)"
          />
        </div>
      </div>

      <div v-if="activePreset" class="catalog-product-list" :key="componentProductsKey">
        <template>
          <i
            class="si-filter a-font_button catalog-page__filters-icon catalog-page__filters-icon-lp"
            tabindex="0"
            @click="filtersIconClickHandler"
          >
            <span class="a-font_button">Фильтры</span>
          </i>
        </template>
        <h2 class="a-font_h2 catalog-product-list__title">
          {{ activePreset.name }}
          <sup class="catalog-page__header-total a-font_L"> {{ totalProducts[activePreset.slug] }} программ</sup>
        </h2>
        <div class="catalog-product-list__wrapper" v-if="productList[activePreset.slug]">
          <h3 class="catalog-product-list__wrapper-sorry" v-if="!productList[activePreset.slug].length">
            К сожалению, ничего нет
          </h3>
          <div
            class="catalog-product-list__item-wrapper-section catalog-product-list__item"
            v-for="product in productList[activePreset.slug]"
            :key="product.id"
            @click="openPopupHandler(product)"
          >
            <m-card
              type="program"
              :description="product.included.levels[0].name"
              :title="product.name"
              :verticalImgSrc="`${baseURL}/${product.preview_image}`"
              :bottomText="product.included.organization.abbreviation_name"
              :iconSrc="`${baseURL}${product.included.organization.logo}`"
              @organization-click="onOrganizationClick(product)"
            />
          </div>
        </div>
        <a-button
          class="catalog-product-list__button"
          v-if="
            totalProducts[activePreset.slug] > 10 &&
            productsPerPage[activePreset.slug] < totalProducts[activePreset.slug]
          "
          bgColor="ghost-primary"
          :label="`Показать еще ${
            totalProducts[activePreset.slug] - productsPerPage[activePreset.slug] < 10
              ? totalProducts[activePreset.slug] - productsPerPage[activePreset.slug]
              : 10
          } программ из ${totalProducts[activePreset.slug] - productsPerPage[activePreset.slug]}`"
          size="large"
          @click="onMoreProductsClickHandler(activePreset)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import {
  ATag, AButton, MFilter, MCard, ATitle, AControl, APopup,
} from '@cwespb/synergyui';
import getProductsList from '~/api/products_list';
import './s_catalog_landing.scss';
import SProgramStart from '~/components/s_program_start/s_program_start';
import SProgramContent from '~/components/s_program_content/s_program_content';
import SProgramTeachers from '~/components/s_program_teachers/s_program_teachers';
import SProgramSkills from '~/components/s_program_skills/s_program_skills';
import SProgramForm from '~/components/s_program_form/s_program_form';

export default {
  name: 'SCatalogSection',

  props: ['filters'],

  components: {
    SProgramStart,
    SProgramContent,
    SProgramTeachers,
    SProgramSkills,
    SProgramForm,
    ATag,
    ATitle,
    AControl,
    AButton,
    MCard,
    MFilter,
    APopup,
    Swiper,
    SwiperSlide,
  },

  swiperOption: {
    slidesPerView: 'auto',
    spaceBetween: 8,
  },

  data() {
    return {
      popup: false,
      currentProduct: null,
      methodsStart: [{}],
      methodsContent: [{}],
      methodsSkills: [{}],
      productSlug: null,

      baseURL: process.env.NUXT_ENV_S3BACKET,
      totalProducts: {},
      productList: {},
      productsPerPage: {},
      filterListData: {},
      filterCheckboxData: {},
      filtersIdsData: {
        direction_ids: [],
        format_ids: [],
        level_ids: [],
        city_ids: [],
        organization_ids: [],
      },
      page: {},
      filtersCheckboxDataRequest: {},
      filtersMenu: false,
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

      presets: [],
      activePreset: null,

      isFilterExpanded: false,
      currentExpandedFilter: 'direction_ids',
      componentExpandedMenuKey: 3000,
    };
  },

  watch: {
    filtersMenu() {
      this.hideYScroll();
    },

    filtersIdsData: {
      deep: true,
      handler() {
        this.componentProductsKey += 3;
        this.fetchProductsList();
      },
    },

    filtersCheckboxDataRequest: {
      deep: true,
      handler() {
        this.componentProductsKey += 3;
        this.fetchProductsList();
      },
    },
  },

  methods: {
    openPopupHandler(product) {
      this.productSlug = product.slug;
      this.methodsStart[0] = {
        data: {
          filter: {
            slug: product.slug,
          },

          include: ['formats', 'levels', 'directions', 'organization', 'organization.city', 'persons'],
        },
      };

      this.methodsContent[0] = {
        data: {
          filter: {
            entity_id: product.id,
            entity_type: 'product',
            section_id: 12,
          },
        },
      };

      this.methodsSkills[0] = {
        data: {
          filter: {
            entity_id: product.id,
            entity_type: 'product',
            section_id: 10,
          },
        },
      };

      this.popup = true;
    },

    onOrganizationClick(product) {
      this.$router.push(`/organization/${product.included.organization.slug}`);
    },

    expandedFilterClickHandler(filterKey) {
      this.$refs.menuContent.scrollIntoView(true);
      this.componentExpandedMenuKey += 1;
      this.currentExpandedFilter = filterKey;
      this.isFilterExpanded = true;
    },

    hideYScroll() {
      const htmlWrapper = document.querySelector('html');

      if (this.filtersMenu === true) {
        htmlWrapper.style.overflowY = 'hidden';
      } else {
        htmlWrapper.style.overflowY = 'visible';
      }
    },

    filtersMenuClose() {
      this.filtersMenu = false;
      this.isFilterExpanded = false;
    },

    onMoreProductsClickHandler(preset) {
      this.productsPerPage[preset.slug] = this.productsPerPage[preset.slug]
        ? this.productsPerPage[preset.slug] + 10
        : 20;

      this.fetchProductsList();
    },

    selectPreset(preset) {
      this.activePreset = preset;
    },

    async fetchFilterData() {
      Object.entries(this.filters).forEach(([key, filterData]) => {
        if (key === 'level') {
          this.presets = filterData;
          this.presets.forEach((preset) => {
            this.productsPerPage[preset.slug] = 10;
          });
        } else {
          filterData.forEach((filter) => {
            if (filter.type === 'list') {
              if (this.filterListData[`${key}_ids`] === undefined) {
                this.filterListData[`${key}_ids`] = [filter];
              } else {
                this.filterListData[`${key}_ids`] = [...this.filterListData[`${key}_ids`], filter];
              }
            }

            if (filter.type === 'checkbox') {
              if (this.filterCheckboxData[`${key}_ids`] === undefined) {
                this.filterCheckboxData[`${key}_ids`] = [filter];
              } else {
                this.filterCheckboxData[`${key}_ids`] = [...this.filterCheckboxData[`${key}_ids`], filter];
              }
            }
          });
        }
      });
    },

    async fetchProductsList() {
      // eslint-disable-next-line no-restricted-syntax
      for (const preset of this.presets) {
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

        expandedMethod.filter.level_ids = [preset.id];

        // Логика парсинга чекбоксов, для получения отфильрованный товаров
        Object.entries(this.filtersCheckboxDataRequest).forEach((checkboxData) => {
          const [key, value] = checkboxData;
          if (value) {
            expandedMethod.filter[key] = value;
          } else {
            delete expandedMethod.filter[[key]];
          }
        });

        expandedMethod.pagination = {
          page: 1,
          page_size: this.productsPerPage[preset.slug] === undefined ? 10 : this.productsPerPage[preset.slug],
        };

        // eslint-disable-next-line no-await-in-loop
        const response = await getProductsList(expandedMethod);
        this.totalProducts[preset.slug] = response.count;
        this.productList[preset.slug] = response.data;
      }

      this.componentProductsKey += 3;
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

      this.page = {};
      this.componentProductsKey += 3;
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

      this.page = {};
      this.componentProductsKey += 3;
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

      this.page = {};
      this.componentProductsKey += 3;
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
