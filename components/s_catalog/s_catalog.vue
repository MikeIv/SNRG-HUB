<template>
  <div class="l-wide catalog-page">
    <s-catalog-menu
      :filtersMenu="filtersMenu"
      :filterListData="filterListData"
      :filterCheckboxData="filterCheckboxData"
      :selectedFilters="selectedFilters"
      :totalProducts="totalProducts"
      :maxVisibleControls="$options.maxVisibleControls"
      @menu-toggle="menuToggle"
      @delete-tag="deleteTag"
      @clear-all-filters="clearAllFilters"
      @select-menu-filter="selectFilter"
      @switch-menu-click="switchClick"
    />
    <s-catalog-main
      title="Программы обучения"
      :total-products="totalProducts"
      :hasPresets="true"
      :presets="presets"
      :page-info="pageInfo"
      category="default"
      @select-filter="selectFilter"
      @switch-click="switchClick"
    />
    <!--    <div class="catalog-page__content">-->
    <!--      <s-catalog-filter-->
    <!--        v-show="visibleFilters"-->
    <!--        @select-filter="selectFilter"-->
    <!--        @switch-click="switchClick"-->
    <!--        :filterListData="Object.entries(filterListData)"-->
    <!--        :filterCheckboxData="filterCheckboxData"-->
    <!--        :filtersCheckboxDataRequest="filtersCheckboxDataRequest"-->
    <!--        :key="componentFilterKey"-->
    <!--      />-->
    <!--      <s-catalog-product-list-->
    <!--        :productList="productList"-->
    <!--        :totalProducts="totalProducts"-->
    <!--        :page="page"-->
    <!--        :productsPerPage="productsPerPage"-->
    <!--        :windowWidth="windowWidth"-->
    <!--        @page="pageChange"-->
    <!--        :key="componentProductsKey"-->
    <!--      >-->
    <!--        <div class="catalog-page__filters">-->
    <!--          <div class="catalog-page__filters-tags" v-if="!visibleFiltersIcon">-->
    <!--            <a-tag-->
    <!--              v-if="selectedFilters.length"-->
    <!--              label="Очистить все"-->
    <!--              status="delete"-->
    <!--              @aTagDelete="clearAllFilters"-->
    <!--              @aTagClick="clearAllFilters"-->
    <!--            />-->
    <!--            <a-tag-->
    <!--              v-for="tag in selectedFilters"-->
    <!--              :key="`${tag.name}${tag.id}`"-->
    <!--              :label="tag.key === 'organization_ids' ? tag.abbreviation_name : tag.name"-->
    <!--              status="selected"-->
    <!--              @aTagDelete="deleteTag(tag)"-->
    <!--            />-->
    <!--          </div>-->
    <!--          <template v-if="productList.length">-->
    <!--            <a-select :options="options" class="catalog-page__select" @change="changeSortOption" />-->
    <!--            <i-->
    <!--              v-if="visibleFiltersIcon"-->
    <!--              class="si-filter a-font_button catalog-page__filters-icon"-->
    <!--              tabindex="0"-->
    <!--              @click="filtersIconClickHandler"-->
    <!--            >-->
    <!--              <span class="a-font_button">Фильтры</span>-->
    <!--            </i>-->
    <!--          </template>-->
    <!--        </div>-->
    <!--      </s-catalog-product-list>-->
    <!--    </div>-->
  </div>
</template>

<script>
import { ATag, ASelect } from '@cwespb/synergyui';
import SCatalogFilter from '~/components/s_catalog_filter/s_catalog_filter';
import SCatalogProductList from '~/components/s_catalog_product_list/s_catalog_product_list';
import SCatalogMenu from '~/components/s_catalog_menu/s_catalog_menu';
import SCatalogMain from '~/components/s_catalog_main/s_catalog_main';
import getProductsList from '~/api/products_list';
import getFilterData from '~/api/filter_data';
import getFiltersProductPresets from '~/api/filtersProductsPresets';
import './s_catalog.scss';

export default {
  name: 'SCatalog',
  components: {
    SCatalogMain,
    SCatalogMenu,
    SCatalogProductList,
    SCatalogFilter,
    ATag,
    ASelect,
  },
  props: ['pageInfo'],

  productNumberOnDesktop: 24,
  productNumberOnTablet: 16,
  productNumberOnMobile: 8,
  desktopEndpointResolution: 1200,
  tabletEndpointResolution: 900,
  mobileEndpointResolution: 650,
  maxVisibleControls: 7,

  data() {
    return {
      totalProducts: [],
      productList: [],
      selectedFilters: [],
      page: 1,
      productsPerPage: this.$options.productNumberOnDesktop,
      windowWidth: null,
      presets: [],

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
      componentFilterKey: 1,
      componentProductsKey: 100,

      slugs: [],

      categories: null,
    };
  },

  watch: {
    currentOption() {
      this.fetchProductsList();
    },

    page() {
      const newSearch = window.location.search
        .split('&')
        .filter((query) => !query.includes('page'))
        .join('&');
      window.history.pushState(
        {},
        null,
        `${window.location.pathname}?page=${this.page}${newSearch ? '&' : ''}${newSearch}`,
      );

      this.fetchProductsList();
    },

    productsPerPage() {
      this.fetchProductsList();
    },

    $route: {
      deep: true,
      handler() {
        this.clearRouteFilters();
        this.parseQueryIntoFilters();
      },
    },

    // Использую хак, чтобы watcher следил сразу за двумя объектами, чтобы не дублировать одинаковый код
    // Из коробки Vue 3 будет изящное решение
    allFiltersData: {
      deep: true,
      handler() {
        Object.entries(this.filtersIdsData).forEach(([filterKey, filterIds]) => {
          if (filterIds.length === 1) {
            if (filterKey !== 'city_ids') {
              const found = this.filterListData[filterKey].values.find((value) => value.id === Number(filterIds[0]));
              if (!window.location.pathname.includes(found.slug)) {
                // Сюда мы попадаем, если у нас только один слаг в фильтре и должны
                // подчитстить ненужные квери, связанные с этим фильтром
                // например слаг dizain и остался direction_ids=3
                let newSearch = window.location.search
                  .split('&')
                  .filter((query) => !query.includes(filterKey))
                  .join('&');

                if (!window.location.search.includes('page')) {
                  newSearch = `${newSearch}?page=1`;
                }

                window.history.pushState({}, null, `${window.location.pathname}/${found.slug}${newSearch}`);
              }
            }
          } else if (filterIds.length > 1) {
            let newPath = window.location.pathname;
            const slugs = window.location.pathname.split('/');
            slugs.splice(0, 2);

            slugs.forEach((slug) => {
              if (this.filterListData[filterKey].values.some((value) => value.slug === slug)) {
                newPath = newPath.replace(`/${slug}`, '');
              }
            });

            const queries = `${filterKey}=${typeof filterIds === 'string' ? filterIds : filterIds.join(',')}`;
            const newSearch = window.location.search
              .split('&')
              .filter((query) => !query.includes(filterKey))
              .join('&');

            window.history.pushState({}, null, `${newPath}${newSearch}&${queries}`);
          } else {
            this.filterListData[filterKey].values.forEach((value) => {
              if (window.location.pathname.includes(value.slug)) {
                const freshPath = window.location.pathname.replace(`/${value.slug}`, '');
                window.history.pushState({}, null, `${freshPath}${window.location.search}`);
              }
            });
          }
        });

        // Логика для городов (надо будет заменить сепаратор)
        if (this.filtersIdsData.city_ids.length) {
          const newSearch = window.location.search
            .split('&')
            .filter((query) => !query.includes('city_ids'))
            .join('&');
          const queries = `city_ids=${
            typeof this.filtersIdsData.city_ids === 'string'
              ? this.filtersIdsData.city_ids
              : this.filtersIdsData.city_ids.join(',')
          }`;

          window.history.pushState({}, null, `${window.location.pathname}${newSearch}&${queries}`);
        } else {
          const newSearch = window.location.search
            .split('&')
            .filter((query) => !query.includes('city_ids'))
            .join('&');
          window.history.pushState({}, null, `${window.location.pathname}${newSearch}`);
        }

        // Логика с добавлением значений чекбоков-свитчей в урл
        Object.entries(this.filtersCheckboxDataRequest).forEach(([key, checked]) => {
          const newSearch = window.location.search
            .split('&')
            .filter((query) => !query.includes(key))
            .join('&');
          let queries = '';
          if (checked) {
            queries = `${key}`;
            window.history.pushState({}, null, `${window.location.pathname}${newSearch}&${queries}`);
          } else {
            window.history.pushState({}, null, `${window.location.pathname}${newSearch}`);
          }
        });

        this.fetchProductsList();
        this.componentProductsKey += 1;
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
    // Создаю компьютед, чтобы watch следил сразу за двумя данными
    allFiltersData() {
      const { filtersIdsData, filtersCheckboxDataRequest } = this;
      return {
        filtersIdsData,
        filtersCheckboxDataRequest,
      };
    },

    visibleFilters() {
      return this.windowWidth > this.$options.tabletEndpointResolution;
    },

    visibleFiltersIcon() {
      return this.windowWidth < this.$options.tabletEndpointResolution;
    },
  },

  methods: {
    parseQueryIntoFilters() {
      if (this.$route.params.pathMatch) {
        this.slugs = this.$route.params.pathMatch.split('/');
        Object.values(this.filterListData).forEach((filterList) => {
          filterList.values.forEach((value) => {
            this.slugs.forEach((slug) => {
              if (value.slug === slug) {
                this.$set(value, 'isChecked', true);
                this.filtersIdsData[filterList.filter_by].push(value.id);
                const newFilter = { ...value, key: filterList.filter_by };
                this.selectedFilters.push(newFilter);
              }
            });
          });
        });
      }

      Object.entries(this.$route.query).forEach(([key, ids]) => {
        if (key !== 'page' && key !== 'is_employment' && key !== 'is_installment' && key !== 'category_ids') {
          this.filtersIdsData[key] = typeof ids === 'string' ? ids.split(',') : ids;

          ids.split(',').forEach((id) => {
            const found = this.filterListData[key].values.find((value) => value.id === Number(id));
            this.$set(found, 'isChecked', true);
            const newFilter = { ...found, key };
            this.selectedFilters.push(newFilter);
          });
        } else if (key === 'is_employment' || key === 'is_installment') {
          this.filtersCheckboxDataRequest[key] = true;
          this.filterCheckboxData[key].isChecked = true;
        }
      });
    },

    changeSortOption(option) {
      this.options = [
        { label: this.options.find((elem) => elem.value === option).label, value: option },
        ...this.options.filter((elem) => elem.value !== option),
      ];
      this.currentOption = option;
    },

    async fetchFilterPresets() {
      this.presets = await getFiltersProductPresets();
    },

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

      this.parseQueryIntoFilters();
      this.componentFilterKey += 3;
    },

    async fetchProductsList() {
      const expandedMethod = { ...this.pageInfo.components[0].methods[0].data };
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

      if (process.browser && window.location.search.includes('category_ids')) {
        const category = window.location.search
          .split('&')
          .filter((query) => query.includes('category_ids'))[0]
          .split('=')[1];
        this.categories = category;
      }

      if (this.categories) {
        expandedMethod.filter.category_ids = this.categories;
      } else {
        delete expandedMethod.filter.category_ids;
      }

      expandedMethod.pagination = { page: this.page, page_size: this.productsPerPage };
      expandedMethod.sort = this.currentOption;
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
      this.filtersIdsData[tag.key] = this.filtersIdsData[tag.key].filter((id) => Number(id) !== tag.id);
      const found = this.filterListData[tag.key].values.find((value) => value.name === tag.name);
      this.$set(found, 'isChecked', false);
      // Меняяем уникальный ключ s-catalog-filter, заставляя его перерендерится
      this.componentFilterKey += 1;
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

      this.categories = null;
      window.history.pushState({}, null, '/catalog?page=1');

      this.componentFilterKey += 1;
      this.componentMenuKey += 1;
    },

    switchClick(item, isChecked) {
      const selectedSwitch = { ...item, isChecked };
      this.page = 1;
      this.filterCheckboxData[selectedSwitch.filter_by].isChecked = selectedSwitch.isChecked;
      this.filtersCheckboxDataRequest[selectedSwitch.filter_by] = selectedSwitch.isChecked;
    },

    selectFilter(key, item, isChecked) {
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
        this.filtersIdsData[key] = this.filtersIdsData[key].filter((id) => Number(id) !== item.id);
      }
    },

    filtersIconClickHandler() {
      this.filtersMenu = true;
    },

    menuControlSelect(filter) {
      this.selectedFilters.push(filter);
    },

    menuToggle(value) {
      this.filtersMenu = value;
    },
  },

  created() {
    if (process.client) {
      if (window.location.search.includes('page')) {
        const newSearch = window.location.search
          .split('&')
          .filter((query) => !query.includes('page'))
          .join('&');
        this.page = Number(this.$route.query.page);
        window.history.pushState(
          {},
          null,
          `/catalog?page=${this.page}${newSearch ? '&' : ''}${newSearch ? newSearch.split('?')[1] : ''}`,
        );
      } else {
        window.history.pushState(
          {},
          null,
          `/catalog?page=1${window.location.search ? '&' : ''}${
            window.location.search ? window.location.search.split('?')[1] : ''
          }`,
        );
      }
    }
  },

  async fetch() {
    await this.fetchProductsList();
    await this.fetchFilterData();
    await this.fetchFilterPresets();
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
