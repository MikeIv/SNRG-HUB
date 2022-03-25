<template>
  <div class="s-margin" v-if="filterResponse">
    <div class="catalog-page__section l-wide">
      <a-breadcrumbs v-if="withBreadcrumbs" :breadcrumbs="breadcrumbs" class="catalog-page__breadcrumbs" />
      <h2 class="a-font_h2" v-if="title">
        {{ title }}
        <sup class="catalog-page__header-total a-font_L">
          {{ totalProducts }}
          {{ type === 'organizations' ? 'заведений' : type === 'journal' ? 'публикаций' : 'программ' }}</sup
        >
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
          :subcategories="subcategories"
          :categories="categories"
          :subcategoriesTitle="subcategoriesTitle"
          :topicTitle="topicTitle"
          :routePath="routePath"
          @select-filter="selectFilter"
          @switch-click="switchClick"
        />
        <s-catalog-product-list
          :productList="productList"
          :totalProducts="totalProducts"
          :page="page"
          :productsPerPage="productsPerPage"
          :key="componentProductsKey"
          :type="type"
          @page="page = $event"
        >
          <s-catalog-tags
            :selectedFilters="selectedFilters"
            :productList="productList"
            :options="options"
            :subcategoriesTitle="subcategoriesTitle"
            :topicTitle="topicTitle"
            :categories="categories"
            :subcategories="subcategories"
            @clear-all-filters="clearAllFilters"
            @delete-tag="deleteTag"
            @filters-icon-click="filtersIconClickHandler"
            @change-sort-option="changeSortOption"
          />
        </s-catalog-product-list>
      </div>
    </div>
  </div>
</template>

<script>
import SCatalogFilter from '~/components/s_catalog_filter/s_catalog_filter';
import SCatalogProductList from '~/components/s_catalog_product_list/s_catalog_product_list';
import SCatalogPresets from '~/components/s_catalog_presets/s_catalog_presets';
import SCatalogTags from '~/components/s_catalog_tags/s_catalog_tags';
import SCatalogMenu from '~/components/s_catalog_menu/s_catalog_menu';
import ABreadcrumbs from '~/components/_ui/a_breadcrumbs/a_breadcrumbs';
import getProductsList from '~/api/products_list';
import './s_catalog_section.scss';

export default {
  name: 'SCatalogSection',

  props: [
    'title',
    'hasPresets',
    'presets',
    'productsPerPage',
    'currentOption',
    'options',
    'filtersMenu',
    'filterResponse',
    'withBreadcrumbs',
    'withPaddings',
    'defaultFilters',
    'productListUrl',
    'type',
    'routePath',
    'allCategories',
    'entity_page',
  ],

  components: {
    ABreadcrumbs,
    SCatalogTags,
    SCatalogPresets,
    SCatalogProductList,
    SCatalogFilter,
    SCatalogMenu,
  },

  data() {
    return {
      breadcrumbs: [
        { label: 'Главная', href: '/' },
        {
          label: 'Программы обучения',
          href: `/${this.routePath}${this.$route?.params?.slug ? `/${this.$route?.params?.slug}` : ''}`,
        },
      ],
      totalProducts: null,
      productList: [],
      filterListData: {},
      filterCheckboxData: {},
      filtersIdsData: {
        format_ids: [],
        level_ids: [],
        city_ids: [],
        organization_ids: [],
        publication_type_ids: [],
        reader_type_ids: [],
        article_author_ids: [],
      },
      filtersCheckboxDataRequest: {
        is_employment: false,
        is_installment: false,
        is_military_center: false,
        is_hostel: false,
      },
      page: 1,
      componentProductsKey: 10,
      componentFilterKey: 100,
      componentMenuKey: 1000,

      selectedFilters: [],

      subcategories: [],
      subcategoriesTitle: null,
      topicTitle: null,
      categoryId: null,
      subcategoryId: null,
    };
  },

  computed: {
    categories() {
      return this.allCategories?.filter((category) => category.level === 1) || [];
    },
  },

  watch: {
    currentOption() {
      this.fetchProductsList();
    },

    page() {
      const query = { ...this.$route.query };
      query.page = this.page;
      this.$router.push({ query });
      this.fetchProductsList();
    },

    productsPerPage() {
      this.fetchProductsList();
    },

    filtersIdsData: {
      deep: true,
      handler() {
        const query = {};
        query.page = this.page;
        Object.entries(this.filtersIdsData).forEach(([key, ids]) => {
          if (ids.length) {
            query[key] = ids.join(',');
          } else {
            delete query[key];
          }
        });
        this.$router.push({ query });

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

    allCategories: {
      deep: true,
      handler() {
        this.fetchCategoriesList();
      },
    },

    filterResponse: {
      deep: true,
      immediate: true,
      handler() {
        if (
          !this.filterListData?.level_ids?.values?.length
          && !this.filterListData?.publication_type_ids?.values?.length
        ) {
          this.parseFilterData();
        }
      },
    },

    selectedFilters: {
      deep: true,
      handler() {
        this.componentMenuKey += 123;
      },
    },
  },

  methods: {
    parseFilterData() {
      this.filterResponse?.forEach((filters) => {
        if (this.defaultFilters) {
          Object.entries(this.defaultFilters).forEach(([key, ids]) => {
            if (filters.filter_by === key && ids.length) {
              ids.forEach((id) => {
                const found = filters.values.find((value) => value.id === id);
                this.$set(found, 'isChecked', true);
                this.selectedFilters.push({ ...found, key });
                this.filtersIdsData[key].push(id);
              });
            }
          });
        }

        if (filters.filter_by !== 'direction_ids' && filters.filter_by !== 'subject_ids') {
          if (filters.type === 'list') {
            if (this.entity_page) {
              if (filters.filter_by !== 'organization_ids') {
                this.filterListData[filters.filter_by] = { ...filters };
              }
            } else {
              this.filterListData[filters.filter_by] = { ...filters };
            }
          }

          if (filters.type === 'checkbox') {
            this.filterCheckboxData[filters.filter_by] = { ...filters };
          }
        }
      });
    },

    async fetchCategoriesList() {
      const slugs = this.$route.params?.pathMatch?.split('/').slice(0, -1);

      if (slugs && slugs[0]) {
        const foundCategory = this.categories.find((category) => category.slug === slugs[0]);
        if (foundCategory) {
          this.subcategories = this.allCategories.filter((cat) => cat.parent_id === foundCategory.id);
          this.subcategoriesTitle = foundCategory.name;
          this.categoryId = foundCategory.id;

          if (!this.breadcrumbs.find((breadcrumb) => breadcrumb.label === foundCategory.name)) {
            this.breadcrumbs.push({
              label: foundCategory.name,
              href: `/${this.routePath}${this.$route?.params?.slug ? `/${this.$route?.params?.slug}` : ''}/${slugs[0]}`,
            });
          }
        }
      }

      if (slugs && slugs[1]) {
        const foundCategory = this.allCategories.find((category) => category.slug === slugs[1]);
        if (foundCategory) {
          this.topicTitle = foundCategory.name;
          this.subcategoryId = foundCategory.id;
          if (!this.breadcrumbs.find((breadcrumb) => breadcrumb.label === foundCategory.name)) {
            this.breadcrumbs.push({
              label: foundCategory.name,
              href: `/${this.routePath}${this.$route?.params?.slug ? `/${this.$route?.params?.slug}` : ''}/${
                slugs[0]
              }/${slugs[1]}`,
            });
          }
        }
      }

      await this.fetchFilterData();
    },

    async fetchFilterData() {
      this.getCityInfo();
      await this.fetchProductsList();

      this.componentFilterKey += 3;
    },

    async fetchProductsList() {
      const expandedMethod = {
        filter: { published: true },
      };

      if (this.type === 'main') {
        expandedMethod.include = ['organization', 'levels', 'directions'];
      }

      if (this.type === 'journal') {
        expandedMethod.include = ['publicationTypes', 'journalContent', 'articleAuthors', 'tags'];
      }

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

      if (this.entity_page) {
        const filterKey = `${this.entity_page.type}_ids`;
        expandedMethod.filter[filterKey] = [this.entity_page.id];
      }

      if (this.subcategoryId) {
        expandedMethod.filter.new_category_all_ids = [this.subcategoryId];
      } else if (this.categoryId) {
        expandedMethod.filter.new_category_all_ids = [this.categoryId];
      }

      expandedMethod.pagination = { page: this.page, page_size: this.productsPerPage };
      expandedMethod.sort = this.currentOption;

      const response = await getProductsList(expandedMethod, this.productListUrl);
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

      this.componentFilterKey += 1;
      this.componentMenuKey += 1;
      this.page = 1;
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
    },

    deleteTag(tag) {
      this.selectedFilters = this.selectedFilters.filter((filter) => filter.name !== tag.name);
      this.filtersIdsData[tag.key] = this.filtersIdsData[tag.key].filter((id) => Number(id) !== tag.id);
      const found = this.filterListData[tag.key].values.find((value) => value.name === tag.name);
      this.$set(found, 'isChecked', false);

      this.componentFilterKey += 1;
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
          // const onlineFormatFilter=this.filterListData?.format_ids?.values?.find((value) => value.name === 'Онлайн');
          this.$set(foundCity, 'isChecked', true);
          // this.$set(onlineFormatFilter, 'isChecked', true);
          // if (!this.selectedFilters.filter((selectedFilter) => selectedFilter.id === onlineFormatFilter.id).length) {
          // this.selectedFilters.push({ ...onlineFormatFilter, key: 'format_ids' });
          // this.filtersIdsData.format_ids.push(onlineFormatFilter.id);
          // }

          if (!this.selectedFilters.filter((selectedFilter) => selectedFilter.id === foundCity.id).length) {
            this.selectedFilters.push({ ...foundCity, key: 'city_ids' });
            this.filtersIdsData.city_ids.push(foundCity.id);
          }
        }
      }
    },
  },

  created() {
    if (this.$route.query.page) {
      this.page = Number(this.$route.query.page);
    }
  },

  async mounted() {
    await this.fetchCategoriesList();
    this.getCityInfo();
  },
};
</script>
