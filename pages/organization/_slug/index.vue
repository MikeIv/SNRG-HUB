<template>
  <div>
    <LazyHydrate when-visible>
      <s-university-start :organizationData="organizationData" :organizationCity="organizationCity" />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <s-university-scores />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <s-university-statistics />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <s-program-timeline />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <s-catalog-section
        title="Каталог продуктов для организации"
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
        :entity_page="entity_page"
        @change-sort-options="changeSortOptions"
        @menu-toggle="menuToggle"
      />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <s-program-skills />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <s-program-teachers :slug="$route.params.slug" />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <s-university-career />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <s-program-diploma />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <s-university-life />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <s-partners />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <s-contacts-address :organizationData="this.organizationData" />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <s-program-questions />
    </LazyHydrate>
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration';
import SUniversityStart from '~/components/organizations/s_university_start/s_university_start';
import SUniversityScores from '~/components/organizations/s_university_scores/s_university_scores';
import SUniversityStatistics from '~/components/organizations/s_university_statistics/s_university_statistics';
import SProgramTimeline from '~/components/organizations/s_program_timeline/s_program_timeline';
import SCatalogSection from '~/components/s_catalog_section/s_catalog_section/';
import SProgramTeachers from '~/components/product/s_program_teachers/s_program_teachers';
import SProgramSkills from '~/components/product/s_program_skills/s_program_skills';
import SProgramQuestions from '~/components/organizations/s_program_questions/s_program_questions';
import SUniversityCareer from '~/components/organizations/s_university_career/s_university_career';
import SPartners from '~/components/s_partners/s_partners';
import SProgramDiploma from '~/components/organizations/s_program_diploma/s_program_diploma';
import SUniversityLife from '~/components/organizations/s_university_life/s_university_life';
import SContactsAddress from '~/components/s_contacts_address/s_contacts_address';
import getFilterData from '~/api/filter_data';
import getCatalogCategoriesList from '~/api/getCatalogCategoriesList';
import getOrganizationInfo from '~/api/organizationInfo';

export default {
  layout: 'organization',

  components: {
    SContactsAddress,
    SProgramTeachers,
    SProgramSkills,
    SCatalogSection,
    SUniversityStatistics,
    SProgramTimeline,
    SUniversityScores,
    SUniversityStart,
    SProgramQuestions,
    SUniversityCareer,
    SProgramDiploma,
    SUniversityLife,
    SPartners,
    LazyHydrate,
  },

  data() {
    return {
      organizationData: {},
      organizationCity: {},
      routePath: 'organization',
      filterResponse: [],
      defaultFilters: {},
      allCategories: [],
      type: 'main',
      entity_page: {},
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
    async getOrganizationData() {
      const requestData = { slug: this.$route.params.slug || '' };
      const organizationResponse = await getOrganizationInfo(requestData);
      this.organizationData = organizationResponse.data[0].attributes;
      // eslint-disable-next-line prefer-destructuring
      this.organizationCity = organizationResponse.included[0];
      this.entity_page = { id: organizationResponse.data[0].id, type: this.routePath };
    },

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
    await this.getOrganizationData();
    await this.fetchFilterData();
    await this.fetchCategoriesData();
  },
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
