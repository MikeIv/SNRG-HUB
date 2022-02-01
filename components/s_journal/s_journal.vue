<template>
  <div>
    <div class="l-wide catalog-page organizations-page">
      <s-journal-section
        title="Журнал"
        :hasPresets="presets.length"
        :presets="presets"
        :products-per-page="12"
        category="default"
        :defaultFilters="defaultFilters"
        :slugs="slugs"
        :categoryId="categoryId"
        :key="mainCatalogKey"
        :currentOption="currentOption"
        :options="options"
        :filtersMenu="filtersMenu"
        @slug="parseSlugToUrl"
        @clear-filters="clearAllFilters"
        @on-filter-click="filterClickHandler"
        @delete-filter-tag="filterClickHandler"
        @change-sort-options="changeSortOptions"
        @menu-toggle="menuToggle"
      />
    </div>
    <SQuiz :quizId="2" class="catalog-page__quiz" />
  </div>
</template>

<script>
import SJournalSection from '~/components/s_journal_section/s_journal_section';
import SQuiz from '~/components/s_quiz/s_quiz';
import getFiltersProductPresets from '~/api/filtersProductsPresets';
import '../s_catalog/s_catalog.scss';

export default {
  name: 'SJournal',
  components: {
    SJournalSection,
    SQuiz,
  },
  props: ['pageInfo', 'currentOption', 'options', 'filtersMenu'],

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
    menuToggle(value) {
      this.$emit('menu-toggle', value);
    },

    changeSortOptions(options, option) {
      this.$emit('change-sort-options', options, option);
    },

    filterClickHandler(filtersIdsData, filterListData) {
      Object.entries(filtersIdsData).forEach(([filterKey, filterIds]) => {
        if (filterIds.length === 1) {
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
      this.$router.push('/journal');
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
