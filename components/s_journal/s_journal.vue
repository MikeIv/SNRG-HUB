<template>
  <div>
    <div class="l-wide catalog-page s-margin l-border-radius">
      <s-catalog-section
        title="Журнал"
        :hasPresets="presets.length"
        :presets="presets"
        :products-per-page="24"
        :key="mainCatalogKey"
        :currentOption="currentOption"
        :options="options"
        :filtersMenu="filtersMenu"
        :filterResponse="filterResponse"
        :defaultFilters="defaultFilters"
        :with-breadcrumbs="true"
        :productListUrl="productListUrl"
        :type="type"
        :routePath="routePath"
        :allCategories="allCategories"
        @change-sort-options="changeSortOptions"
        @menu-toggle="menuToggle"
      />
    </div>
    <SQuiz :quizId="2" class="catalog-page__quiz" />
  </div>
</template>

<script>
import SCatalogSection from '~/components/s_catalog_section/s_catalog_section';
import SQuiz from '~/components/s_quiz/s_quiz';
import getFiltersProductPresets from '~/api/filtersProductsPresets';
import getArticlesFilters from '~/api/articlesFilters';
// import getCatalogCategoriesList from '~/api/getCatalogCategoriesList';
import '../s_catalog/s_catalog.scss';

export default {
  name: 'SCatalog',
  components: {
    SCatalogSection,
    SQuiz,
  },
  props: ['currentOption', 'options', 'filtersMenu'],

  data() {
    return {
      presets: [],
      allCategories: [],
      mainCatalogKey: 666,
      filterResponse: [],
      defaultFilters: {},
      type: 'journal',
      productListUrl: 'api/v1/articles/list',
      routePath: 'journal',
    };
  },

  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler() {
        this.defaultFilters = {};
        this.parseUrlToFilters();
      },
    },
  },

  methods: {
    parseUrlToFilters() {
      // Если есть квери (direction_ids=1,2) в урле при инициализации
      if (this.$route.query) {
        Object.entries(this.$route.query).forEach(([key, ids]) => {
          if (key !== 'page') {
            this.defaultFilters[key] = ids.split(',').map((id) => Number(id));
          }
        });
      }
    },

    async fetchCategoriesData() {
      // this.allCategories = await getCatalogCategoriesList();
      this.allCategories = [];
    },

    async fetchFilterData() {
      this.filterResponse = await getArticlesFilters();
    },

    menuToggle(value) {
      this.$emit('menu-toggle', value);
    },

    changeSortOptions(options, option) {
      this.$emit('change-sort-options', options, option);
    },

    async fetchFilterPresets() {
      this.presets = await getFiltersProductPresets();
    },
  },

  async fetch() {
    await this.fetchFilterPresets();
    await this.fetchFilterData();
    await this.fetchCategoriesData();
  },
};
</script>
