<template>
  <div class="l-wide catalog-page">
    <s-catalog-main
      title="Программы обучения"
      :hasPresets="true"
      :presets="presets"
      :page-info="pageInfo"
      category="default"
      :defaultFilters="defaultFilters"
      :slugs="slugs"
      :page="page"
      :categoryId="categoryId"
      :key="mainCatalogKey"
      @slug="parseSlugToUrl"
      @page-change="pageChangeHandler"
      @clear-filters="clearAllFilters"
    />
  </div>
</template>

<script>
import SCatalogMain from '~/components/s_catalog_main/s_catalog_main';
import getFiltersProductPresets from '~/api/filtersProductsPresets';
import './s_catalog.scss';

export default {
  name: 'SCatalog',
  components: {
    SCatalogMain,
  },
  props: ['pageInfo'],

  data() {
    return {
      presets: [],
      slugs: [],
      categories: null,
      mainCatalogKey: 123,
      categoryId: null,
      page: 1,
      defaultFilters: {
        // direction_ids: [1],
        // format_ids: [22, 27],
      },
    };
  },

  async fetch() {
    await this.fetchFilterPresets();
  },

  // watch: {
  // page() {
  //   const newSearch = window.location.search
  //     .split('&')
  //     .filter((query) => !query.includes('page'))
  //     .join('&');
  //   window.history.pushState(
  //     {},
  //     null,
  //     `${window.location.pathname}?page=${this.page}${newSearch ? '&' : ''}${newSearch}`,
  //   );
  // },
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler() {
        console.log('route watcher');
        this.defaultFilters = {};
        this.slugs = [];
        this.categoryId = null;

        this.parseUrlToFilters();

        this.mainCatalogKey += 1;
        // this.clearRouteFilters();
        // this.parseQueryIntoFilters();
        // if (this.$route.params.pathMatch) {
        //   this.slugs = this.$route.params.pathMatch.split('/');
        //   console.log('slugs', this.slugs);
        // }
        //
        // // Если есть квери (direction_ids=1,2) в урле при инициализации
        // if (this.$route.query) {
        //   Object.entries(this.$route.query).forEach(([key, ids]) => {
        //     this.defaultFilters[key] = ids.split(',').map((id) => Number(id));
        //     console.log('defaultFilters', this.defaultFilters);
        //   });
        // }
      },
    },

    page() {
      console.log('page change');
    },
  },

  // },
  // Использую хак, чтобы watcher следил сразу за двумя объектами, чтобы не дублировать одинаковый код
  // Из коробки Vue 3 будет изящное решение
  // allFiltersData: {
  //   deep: true,
  //   handler() {
  //     Object.entries(this.filtersIdsData).forEach(([filterKey, filterIds]) => {
  //       if (filterIds.length === 1) {
  //         if (filterKey !== 'city_ids') {
  //           const found = this.filterListData[filterKey].values.find((value) => value.id === Number(filterIds[0]));
  //           if (!window.location.pathname.includes(found.slug)) {
  //             // Сюда мы попадаем, если у нас только один слаг в фильтре и должны
  //             // подчитстить ненужные квери, связанные с этим фильтром
  //             // например слаг dizain и остался direction_ids=3
  //             let newSearch = window.location.search
  //               .split('&')
  //               .filter((query) => !query.includes(filterKey))
  //               .join('&');
  //
  //             if (!window.location.search.includes('page')) {
  //               newSearch = `${newSearch}?page=1`;
  //             }
  //
  //             window.history.pushState({}, null, `${window.location.pathname}/${found.slug}${newSearch}`);
  //           }
  //         }
  //       } else if (filterIds.length > 1) {
  //         let newPath = window.location.pathname;
  //         const slugs = window.location.pathname.split('/');
  //         slugs.splice(0, 2);
  //
  //         slugs.forEach((slug) => {
  //           if (this.filterListData[filterKey].values.some((value) => value.slug === slug)) {
  //             newPath = newPath.replace(`/${slug}`, '');
  //           }
  //         });
  //
  //         const queries = `${filterKey}=${typeof filterIds === 'string' ? filterIds : filterIds.join(',')}`;
  //         const newSearch = window.location.search
  //           .split('&')
  //           .filter((query) => !query.includes(filterKey))
  //           .join('&');
  //
  //         window.history.pushState({}, null, `${newPath}${newSearch}&${queries}`);
  //       } else {
  //         this.filterListData[filterKey].values.forEach((value) => {
  //           if (window.location.pathname.includes(value.slug)) {
  //             const freshPath = window.location.pathname.replace(`/${value.slug}`, '');
  //             window.history.pushState({}, null, `${freshPath}${window.location.search}`);
  //           }
  //         });
  //       }
  //     });
  //
  //     // Логика для городов (надо будет заменить сепаратор)
  //     if (this.filtersIdsData.city_ids.length) {
  //       const newSearch = window.location.search
  //         .split('&')
  //         .filter((query) => !query.includes('city_ids'))
  //         .join('&');
  //       const queries = `city_ids=${
  //         typeof this.filtersIdsData.city_ids === 'string'
  //           ? this.filtersIdsData.city_ids
  //           : this.filtersIdsData.city_ids.join(',')
  //       }`;
  //
  //       window.history.pushState({}, null, `${window.location.pathname}${newSearch}&${queries}`);
  //     } else {
  //       const newSearch = window.location.search
  //         .split('&')
  //         .filter((query) => !query.includes('city_ids'))
  //         .join('&');
  //       window.history.pushState({}, null, `${window.location.pathname}${newSearch}`);
  //     }
  //
  //     // Логика с добавлением значений чекбоков-свитчей в урл
  //     Object.entries(this.filtersCheckboxDataRequest).forEach(([key, checked]) => {
  //       const newSearch = window.location.search
  //         .split('&')
  //         .filter((query) => !query.includes(key))
  //         .join('&');
  //       let queries = '';
  //       if (checked) {
  //         queries = `${key}`;
  //         window.history.pushState({}, null, `${window.location.pathname}${newSearch}&${queries}`);
  //       } else {
  //         window.history.pushState({}, null, `${window.location.pathname}${newSearch}`);
  //       }
  //     });
  //
  //     this.fetchProductsList();
  //     this.componentProductsKey += 1;
  //   },
  // },
  // },

  // computed: {
  // Создаю компьютед, чтобы watch следил сразу за двумя данными
  // allFiltersData() {
  //   const { filtersIdsData, filtersCheckboxDataRequest } = this;
  //   return {
  //     filtersIdsData,
  //     filtersCheckboxDataRequest,
  //   };
  // },
  // },

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

  methods: {
    pageChangeHandler(page) {
      this.page = page;
    },

    parseUrlToFilters() {
      console.log('parse url', this.$route);

      if (this.$route.params.pathMatch) {
        this.slugs = this.$route.params.pathMatch.split('/');
      }

      // Если есть квери (direction_ids=1,2) в урле при инициализации
      if (this.$route.query) {
        Object.entries(this.$route.query).forEach(([key, ids]) => {
          if (key === 'category_ids') {
            this.categoryId = ids;
          } else {
            this.defaultFilters[key] = ids.split(',').map((id) => Number(id));
          }
        });
      }
    },

    clearAllFilters() {
      this.$router.push('/catalog');
    },

    async fetchFilterPresets() {
      this.presets = await getFiltersProductPresets();
    },

    parseSlugToUrl(filter) {
      if (process.client) {
        const newSearch = window.location.search
          .split('&')
          .filter((query) => !query.includes(filter.key))
          .join('&');
        console.log('search!', window.location.search, newSearch);
        window.history.pushState({}, null, `${window.location.pathname}/${filter.slug}${newSearch}`);
      }
    },
    // parseQueryIntoFilters() {
    //   if (this.$route.params.pathMatch) {
    //     this.slugs = this.$route.params.pathMatch.split('/');
    //     Object.values(this.filterListData).forEach((filterList) => {
    //       filterList.values.forEach((value) => {
    //         this.slugs.forEach((slug) => {
    //           if (value.slug === slug) {
    //             this.$set(value, 'isChecked', true);
    //             this.filtersIdsData[filterList.filter_by].push(value.id);
    //             const newFilter = { ...value, key: filterList.filter_by };
    //             this.selectedFilters.push(newFilter);
    //           }
    //         });
    //       });
    //     });
    //   }
    //
    //   Object.entries(this.$route.query).forEach(([key, ids]) => {
    //     if (key !== 'page' && key !== 'is_employment' && key !== 'is_installment' && key !== 'category_ids') {
    //       this.filtersIdsData[key] = typeof ids === 'string' ? ids.split(',') : ids;
    //
    //       ids.split(',').forEach((id) => {
    //         const found = this.filterListData[key].values.find((value) => value.id === Number(id));
    //         this.$set(found, 'isChecked', true);
    //         const newFilter = { ...found, key };
    //         this.selectedFilters.push(newFilter);
    //       });
    //     } else if (key === 'is_employment' || key === 'is_installment') {
    //       this.filtersCheckboxDataRequest[key] = true;
    //       this.filterCheckboxData[key].isChecked = true;
    //     }
    //   });
    // },

    // async fetchProductsList() {
    // const expandedMethod = { ...this.pageInfo.components[0].methods[0].data };
    //
    // if (process.browser && window.location.search.includes('category_ids')) {
    //   const category = window.location.search
    //     .split('&')
    //     .filter((query) => query.includes('category_ids'))[0]
    //     .split('=')[1];
    //   this.categories = category;
    // }
    //
    // if (this.categories) {
    //   expandedMethod.filter.category_ids = this.categories;
    // } else {
    //   delete expandedMethod.filter.category_ids;
    // }
    // const response = await getProductsList(expandedMethod);
    // },

    // clearAllFilters() {
    //   this.clearRouteFilters();
    //
    //   this.categories = null;
    //   window.history.pushState({}, null, '/catalog?page=1');
    //
    //   this.componentFilterKey += 1;
    //   this.componentMenuKey += 1;
    // },
  },

  // created() {
  //   if (process.client) {
  //     console.log('qq', this.$route);
  //
  //     if (window.location.search.includes('page')) {
  //       const newSearch = window.location.search
  //         .split('&')
  //         .filter((query) => !query.includes('page'))
  //         .join('&');
  //       this.page = Number(this.$route.query.page);
  //       window.history.pushState(
  //         {},
  //         null,
  //         `/catalog?page=${this.page}${newSearch ? '&' : ''}${newSearch ? newSearch.split('?')[1] : ''}`,
  //       );
  //     } else {
  //       window.history.pushState(
  //         {},
  //         null,
  //         `/catalog?page=1${window.location.search ? '&' : ''}${
  //           window.location.search ? window.location.search.split('?')[1] : ''
  //         }`,
  //       );
  //     }
  //   }
  // },
};
</script>
