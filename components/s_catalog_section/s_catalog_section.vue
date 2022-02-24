<template>
  <div :class="this.$route.name === 'organization-slug' ? 'catalog-page__section' : ''">
    <h2 class="a-font_h2" v-if="title">
      {{ title }}
      <sup class="catalog-page__header-total a-font_L"> {{ totalProducts }} программ</sup>
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
      :subjects="subjects"
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
        :subjects="subjects"
        :key="componentFilterKey"
        :subcategories="subcategories"
        :categories="categories"
        :subcategoriesTitle="subcategoriesTitle"
        :topicTitle="topicTitle"
        @select-filter="selectFilter"
        @switch-click="switchClick"
      />
      <s-catalog-product-list
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
      </s-catalog-product-list>
    </div>
  </div>
</template>

<script>
import SCatalogFilter from '~/components/s_catalog_filter/s_catalog_filter';
import SCatalogProductList from '~/components/s_catalog_product_list/s_catalog_product_list';
import SCatalogPresets from '~/components/s_catalog_presets/s_catalog_presets';
import SCatalogTags from '~/components/s_catalog_tags/s_catalog_tags';
import SCatalogMenu from '~/components/s_catalog_menu/s_catalog_menu';
import getProductsList from '~/api/products_list';
import getFilterData from '~/api/filter_data';
import getCatalogCategoriesList from '~/api/getCatalogCategoriesList';
import './s_catalog_section.scss';

export default {
  name: 'SCatalogSection',

  props: [
    'title',
    'hasPresets',
    'presets',
    'category',
    'defaultFilters',
    'slugs',
    'categoryId',
    'productsPerPage',
    'entity_page',
    'currentOption',
    'options',
    'filtersMenu',
  ],

  components: {
    SCatalogTags,
    SCatalogPresets,
    SCatalogProductList,
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
        direction_ids: [],
        format_ids: [],
        level_ids: [],
        city_ids: [],
        organization_ids: [],
        subject_ids: [],
      },
      filtersCheckboxDataRequest: {
        is_employment: false,
        is_installment: false,
      },
      page: 1,
      componentProductsKey: 10,
      componentFilterKey: 100,
      componentMenuKey: 1000,

      selectedFilters: [],
      subjects: [],

      allCategories: [],
      subcategories: [],
      subcategoriesTitle: null,
      topicTitle: null,
    };
  },

  computed: {
    categories() {
      return this.allCategories.filter((category) => category.level === 1);
    },
  },

  watch: {
    $route: {
      handler() {},
      deep: true,
    },

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
      deep: true,
      handler() {
        this.pageMain = 1;
        this.componentProductsKey += 3;
        this.fetchProductsList();
      },
    },
  },

  methods: {
    async fetchCategoriesList() {
      await getCatalogCategoriesList().then((response) => {
        this.allCategories = response;

        const slugs = this.$route.params?.pathMatch?.split('/').slice(0, -1);

        if (slugs && slugs[0]) {
          const foundCategory = this.categories.find((category) => category.slug === slugs[0]);
          this.subcategories = this.allCategories.filter((cat) => cat.parent_id === foundCategory.id);
          this.subcategoriesTitle = foundCategory.name;
        }

        if (slugs && slugs[1]) {
          const foundCategory = this.allCategories.find((category) => category.slug === slugs[1]);
          this.topicTitle = foundCategory.name;
        }
      });
    },

    async fetchFilterData() {
      const filtersResponse = await getFilterData();

      filtersResponse.forEach((filters) => {
        // Если мы передаем дефолтные фильтры, то мы выбираем фильтры, тэги и отправляем на бэк
        if (this.defaultFilters) {
          Object.entries(this.defaultFilters).forEach(([key, ids]) => {
            if (filters.filter_by === key && ids.length) {
              if (ids.length === 1) {
                const found = filters.values.find((value) => value.id === ids[0]);
                this.$set(found, 'isChecked', true);
                const newFilter = { ...found, key };
                this.selectedFilters.push(newFilter);
                this.filtersIdsData[key].push(ids[0]);
                this.$emit('slug', newFilter);
              } else {
                ids.forEach((id) => {
                  const found = filters.values.find((value) => value.id === id);
                  this.$set(found, 'isChecked', true);
                  this.selectedFilters.push({ ...found, key });
                  this.filtersIdsData[key].push(id);
                });
              }
            }
          });
        }

        if (filters.type === 'list') {
          if (this.entity_page) {
            if (`${this.entity_page.type}_ids` !== filters.filter_by) {
              this.filterListData[filters.filter_by] = { ...filters };
            }
          } else {
            this.filterListData[filters.filter_by] = { ...filters };
          }
        }

        if (filters.type === 'checkbox') {
          this.filterCheckboxData[filters.filter_by] = { ...filters };
        }

        // Todo с бэка будет приходить еще один тип в будущем
        // нужно будет добавить сюда проверку
      });

      // Если нам приходят слаги с урла, то тоже находим их фильтры, выбираем и отправляем на бэк
      if (this.slugs) {
        Object.values(this.filterListData).forEach((filterList) => {
          if (filterList.filter_by !== 'subject_ids') {
            filterList.values.forEach((value) => {
              this.slugs.forEach((slug) => {
                if (value.slug === slug) {
                  this.$set(value, 'isChecked', true);
                  this.filtersIdsData[filterList.filter_by].push(value.id);
                  const newFilter = { ...value, key: filterList.filter_by };
                  this.selectedFilters.push(newFilter);
                  if (this.filtersIdsData.direction_ids.length) {
                    const found = this.filterListData.direction_ids.values.find(
                      (val) => val.id === this.filtersIdsData.direction_ids[0],
                    );
                    found.subjects.forEach((subject) => {
                      this.subjects.push(subject.id);
                    });
                  }
                }
              });
            });
          }
        });
      }

      this.getCityInfo();

      this.componentFilterKey += 3;
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

        if (selectedItem.key === 'direction_ids') {
          this.selectedFilters = this.selectedFilters.filter((selectedFilter) => selectedFilter.key !== 'subject_ids');
          this.filtersIdsData.subject_ids = [];

          selectedItem.subjects.forEach((subject) => {
            this.subjects.push(subject.id);
          });

          this.filterListData.subject_ids.values.forEach((value) => {
            this.$set(value, 'isChecked', false);
          });
        }
      } else {
        this.selectedFilters = this.selectedFilters.filter((filter) => filter.name !== item.name);
        this.filtersIdsData[key] = this.filtersIdsData[key].filter((id) => Number(id) !== item.id);

        if (selectedItem.key === 'direction_ids') {
          selectedItem.subjects.forEach((subject) => {
            this.subjects = this.subjects.filter((sub) => sub !== subject.id);
          });
        }
      }

      if (this.filtersIdsData.direction_ids.length === 0) {
        this.filtersIdsData.subject_ids = [];
        this.selectedFilters = this.selectedFilters.filter((selectedFilter) => selectedFilter.key !== 'subject_ids');
      }

      this.componentFilterKey += 1;
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

      if (tag.key === 'direction_ids') {
        tag.subjects.forEach((subject) => {
          this.subjects = this.subjects.filter((sub) => sub !== subject.id);
        });
      }

      if (this.filtersIdsData.direction_ids.length === 0) {
        this.filtersIdsData.subject_ids = [];
        this.selectedFilters = this.selectedFilters.filter((selectedFilter) => selectedFilter.key !== 'subject_ids');
      }

      this.componentFilterKey += 1;
      this.$emit('delete-filter-tag', this.filtersIdsData, this.filterListData);
    },

    filtersIconClickHandler() {
      this.$emit('menu-toggle', true);
    },

    getCityInfo() {
      if (process.client) {
        const city = JSON.parse(window.localStorage.getItem('cityInfo'));
        let foundCity;
        if (city) {
          foundCity = this.filterListData?.city_ids?.values?.find((value) => value.name === city.name);
        }
        if (foundCity) {
          this.$set(foundCity, 'isChecked', true);
          if (!this.selectedFilters.filter((selectedFilter) => selectedFilter.id === foundCity.id).length) {
            this.selectedFilters.push({ ...foundCity, key: 'city_ids' });
            this.filtersIdsData.city_ids.push(foundCity.id);
          }
        }
      }
    },
  },

  async fetch() {
    await this.fetchFilterData();
    await this.fetchProductsList();
    await this.fetchCategoriesList();
  },

  created() {
    if (this.$route.query.page) {
      this.page = Number(this.$route.query.page);
    }
  },

  mounted() {
    this.getCityInfo();
  },
};
</script>
