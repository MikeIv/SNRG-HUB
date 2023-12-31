<template>
  <div>
    <LazyHydrate :key="id" v-for="{ key, methods, title, id } in pageInfo.components" when-visible>
      <component
        :is="key"
        :methods="methods"
        :title="title"
        :products-per-page="16"
        :options="options"
        :filtersMenu="filtersMenu"
        :currentOption="currentOption"
        :with-breadcrumbs="true"
        :withPaddings="true"
        :productListUrl="productListUrl"
        :filterResponse="filterResponse"
        :defaultFilters="defaultFilters"
        :type="type"
        :routePath="routePath"
        :allCategories="allCategories"
        :entity_page="pageInfo.entity_page"
        @change-sort-options="changeSortOptions"
        @menu-toggle="menuToggle"
      ></component>
    </LazyHydrate>
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration';
import getFilterData from '~/api/filter_data';
import getCatalogCategoriesList from '~/api/getCatalogCategoriesList';

export default {
  layout: 'organization',

  data() {
    return {
      routePath: 'organization',
      filterResponse: [],
      defaultFilters: {},
      allCategories: [],
      type: 'main',
      productListUrl: 'api/v1/products/list',
      title: 'Organization page',
      filtersMenu: false,
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
          label: 'По алфавиту А-Я',
          value: 'name',
        },
        {
          label: 'По алфавиту Я-А',
          value: '-name',
        },
      ],
    };
  },

  computed: {
    pageInfo() {
      return this.$store.state.pageInfo;
    },
    pageMeta() {
      return this.$store.state.pageMeta;
    },
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
      this.allCategories = await getCatalogCategoriesList();
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
      this.filterResponse = await getFilterData();
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

  head() {
    return {
      title: this.pageMeta?.title,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.pageMeta?.keywords,
        },
        {
          hid: 'description',
          name: 'description',
          content: this.pageMeta?.description,
        },
        {
          hid: 'og:type',
          name: 'og:type',
          content: 'website',
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.pageMeta?.title,
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: 'Synergyeducation',
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.pageMeta?.description,
        },
      ],
      bodyAttrs: {
        class: 'bg-gray',
      },
    };
  },

  components: {
    LazyHydrate,
  },

  middleware: ['getPageInfo', 'parseUtms'],
};
</script>

<style lang="scss">
.organization-page {
  --layout-v-padding: 3.75rem; // 60px
  --layout-h-padding: 5rem; // 80px
  @media all and (max-width: 1199px) {
    --layout-h-padding: 1.875rem; // 30px
    --layout-v-padding: 2.5rem; // 40px
  }
  @media all and (max-width: 767px) {
    --layout-h-padding: 1rem; // 16px
    --layout-v-padding: 2rem; // 32px
  }
  @media screen and (max-width: 767px) {
    .l-default {
      --layout-padding: 0;
    }
  }
  .s-partners {
    position: relative;
    overflow: hidden;
    width: 100%;
  }
}
</style>
