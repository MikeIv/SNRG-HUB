<template>
  <div>
    <div class="l-wide catalog-page organizations-page">
      <s-organization-section
        title="Учебные заведения"
        :hasPresets="presets.length"
        :presets="presets"
        :products-per-page="24"
        category="default"
        :defaultFilters="defaultFilters"
        :slugs="slugs"
        :categoryId="categoryId"
        :key="mainCatalogKey"
        @slug="parseSlugToUrl"
        @clear-filters="clearAllFilters"
        @on-filter-click="filterClickHandler"
        @delete-filter-tag="filterClickHandler"
      />
    </div>
    <SQuiz :quizId="2" class="catalog-page__quiz" />
  </div>
</template>

<script>
import SOrganizationSection from '~/components/s_organization_section/s_organization_section';
import SQuiz from '~/components/s_quiz/s_quiz';
import getFiltersProductPresets from '~/api/filtersProductsPresets';
import './s_organizations.scss';

export default {
  name: 'SOrganizations',
  components: {
    SOrganizationSection,
    SQuiz,
  },
  props: ['pageInfo'],

  data() {
    return {
      presets: [],
      slugs: [],
      categories: null,
      mainCatalogKey: 666,
      categoryId: null,
      defaultFilters: {},
    };
  },

  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler() {
        this.defaultFilters = {};
        this.slugs = [];
        this.categoryId = null;

        this.parseUrlToFilters();
        this.mainCatalogKey += 1;
      },
    },
  },

  methods: {
    filterClickHandler(filtersIdsData, filterListData) {
      Object.entries(filtersIdsData).forEach(([filterKey, filterIds]) => {
        if (filterIds.length === 1) {
          if (filterKey !== 'city_ids') {
            const found = filterListData[filterKey].values.find((value) => value.id === Number(filterIds[0]));
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

              window.history.pushState({}, null, `${window.location.pathname}${found.slug}/${newSearch}`);
            }
          }
        } else if (filterIds.length > 1) {
          let newPath = window.location.pathname;
          const slugs = window.location.pathname.split('/');
          slugs.splice(0, 2);

          slugs.forEach((slug) => {
            if (filterListData[filterKey].values.some((value) => value.slug === slug)) {
              newPath = newPath.replace(`/${slug}`, '');
            }
          });

          const queries = `${filterKey}=${typeof filterIds === 'string' ? filterIds : filterIds.join(',')}`;
          const newSearch = window.location.search
            .split('&')
            .filter((query) => !query.includes(filterKey))
            .join('&');

          window.history.pushState({}, null, `${newPath}${newSearch || '?'}${newSearch ? '&' : ''}${queries}`);
        } else {
          filterListData[filterKey].values.forEach((value) => {
            if (window.location.pathname.includes(value.slug)) {
              const freshPath = window.location.pathname.replace(`/${value.slug}`, '');
              window.history.pushState({}, null, `${freshPath}${window.location.search}`);
            }
          });
        }
      });

      // Логика для городов (надо будет заменить сепаратор)
      // Логика другая, потому что у городов нет слагов
      if (filtersIdsData.city_ids.length) {
        let newSearch = window.location.search
          .split('&')
          .filter((query) => !query.includes('city_ids'))
          .join('&');
        const queries = `city_ids=${
          typeof filtersIdsData.city_ids === 'string' ? filtersIdsData.city_ids : filtersIdsData.city_ids.join(',')
        }`;

        if (!window.location.search.includes('page')) {
          newSearch = `${newSearch}?page=1`;
        }

        window.history.pushState({}, null, `${window.location.pathname}${newSearch}&${queries}`);
      } else {
        const newSearch = window.location.search
          .split('&')
          .filter((query) => !query.includes('city_ids'))
          .join('&');
        window.history.pushState({}, null, `${window.location.pathname}${newSearch}`);
      }

      // Логика с добавлением значений чекбоков-свитчей в урл (временно убрана, можнт быть убрана насовсем)
      // Object.entries(this.filtersCheckboxDataRequest).forEach(([key, checked]) => {
      //   const newSearch = window.location.search
      //     .split('&')
      //     .filter((query) => !query.includes(key))
      //     .join('&');
      //   let queries = '';
      //   if (checked) {
      //     queries = `${key}`;
      //     window.history.pushState({}, null, `${window.location.pathname}${newSearch}&${queries}`);
      //   } else {
      //     window.history.pushState({}, null, `${window.location.pathname}${newSearch}`);
      //   }
      // });
    },

    parseUrlToFilters() {
      // Если есть слаги в руле при инициализации
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
      this.$router.push('/organizations');
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
        window.history.pushState({}, null, `${window.location.pathname}${filter.slug}/${newSearch}`);
      }
    },
  },

  async fetch() {
    await this.fetchFilterPresets();
  },
};
</script>
