<template>
  <div>
    <noscript
      ><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WPTVBRG" height="0" width="0"></iframe
    ></noscript>
    <SHeader
      @search="search = $event"
      :catalog="true"
      :options="options"
      @change-sort-option="changeSortOptions"
      @menu-toggle="menuToggle"
    />
    <SProductSearch v-if="search" :search="search" />
    <div>
      <div class="l-wide catalog-page">
        <s-catalog-section
          title="Учебные заведения"
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
    <LazyHydrate when-visible>
      <SFooter />
    </LazyHydrate>
    <MobileButton />
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration';
import SCatalogSection from '~/components/s_catalog_section/s_catalog_section';
import SHeader from '~/components/s_header/s_header';
import SProductSearch from '~/components/s_product_search/s_product_search';
import MobileButton from '~/components/mobile_button/mobile_button';
import SQuiz from '~/components/s_quiz/s_quiz';
import getOrganizationsCatalogFilter from '~/api/organizationsCatalogFilter';
// import getCatalogCategoriesList from '~/api/getCatalogCategoriesList';

export default {
  layout: 'empty',

  data() {
    return {
      routePath: 'organizations',
      productListUrl: 'api/v1/organizations/list',
      filterResponse: [],
      defaultFilters: {},
      allCategories: [],
      mainCatalogKey: 1,
      type: 'organizations',
      search: '',
      filtersMenu: false,
      currentOption: '-id',
      options: [
        {
          label: 'Новые',
          value: '-id',
        },
        {
          label: 'По алфавиту А-Я',
          value: 'name',
        },
        {
          label: 'По алфавиту Я-А',
          value: '-name',
        },
        {
          label: 'По адресу +',
          value: 'address',
        },
        {
          label: 'По адресу -',
          value: '-address',
        },
      ],
    };
  },

  head() {
    return {
      link: [
        {
          rel: 'canonical',
          href: `${this.$config.SITE_URL}${this.$route.path}`,
        },
      ],
    };
  },

  components: {
    SQuiz,
    SHeader,
    SProductSearch,
    SFooter: () => import('~/components/s_footer/s_footer'),
    LazyHydrate,
    SCatalogSection,
    MobileButton,
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
    async fetchCategoriesData() {
      // this.allCategories = await getCatalogCategoriesList();
      this.allCategories = [];
    },

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

    async fetchFilterData() {
      this.filterResponse = await getOrganizationsCatalogFilter();
    },

    clearFilters() {
      this.filtersMenu = false;
    },

    menuToggle(value) {
      this.filtersMenu = value;
    },

    changeSortOptions(options, option) {
      this.options = options;
      this.currentOption = option;
    },
  },

  async fetch() {
    await this.fetchFilterData();
    await this.fetchCategoriesData();
  },
};
</script>
