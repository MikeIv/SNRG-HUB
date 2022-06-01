<template>
  <LazyHydrate when-visible>
    <div>
      <!--    <LazyHydrate :key="id" v-for="{ key, methods, title, id } in pageInfo.components" when-visible>-->
      <!--      <component-->
      <!--        :is="key"-->
      <!--        :methods="methods"-->
      <!--        :title="title"-->
      <!--        :products-per-page="16"-->
      <!--        :options="options"-->
      <!--        :filtersMenu="filtersMenu"-->
      <!--        :currentOption="currentOption"-->
      <!--        :with-breadcrumbs="true"-->
      <!--        :withPaddings="true"-->
      <!--        :productListUrl="productListUrl"-->
      <!--        :filterResponse="filterResponse"-->
      <!--        :defaultFilters="defaultFilters"-->
      <!--        :type="type"-->
      <!--        :routePath="routePath"-->
      <!--        :allCategories="allCategories"-->
      <!--        :entity_page="pageInfo.entity_page"-->
      <!--        @change-sort-options="changeSortOptions"-->
      <!--        @menu-toggle="menuToggle"-->
      <!--      ></component>-->
      <!--    </LazyHydrate>-->

      <s-university-start :organizationData="organizationData" />
      <s-university-career />
      <s-university-scores />
      <s-university-statistics />
      <s-program-timeline />
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
      <s-program-skills />
      <s-program-teachers />
      <s-program-questions />
    </div>
  </LazyHydrate>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration';
import SUniversityStart from '~/components/organizations/s_university_start/s_university_start';
import SUniversityScores from '~/components/organizations/s_university_scores/s_university_scores';
import SUniversityStatistics from '~/components/organizations/s_university_statistics/s_university_statistics';
import SProgramTimeline from '~/components/organizations/s_program_timeline/s_program_timeline';
import SCatalogSection from '~/components/s_catalog_section/s_catalog_section/';
import SProgramSkills from '~/components/product/s_program_skills/s_program_skills';
import SProgramTeachers from '~/components/s_program_teachers/s_program_teachers';
import SProgramQuestions from '~/components/organizations/s_program_questions/s_program_questions';
import SUniversityCareer from '~/components/organizations/s_university_career/s_university_career';
import getFilterData from '~/api/filter_data';
import getCatalogCategoriesList from '~/api/getCatalogCategoriesList';
import getOrganizationInfo from '~/api/organizationInfo';

export default {
  layout: 'organization',

  components: {
    SProgramTeachers,
    SProgramSkills,
    SCatalogSection,
    SUniversityStatistics,
    SProgramTimeline,
    SUniversityScores,
    SUniversityStart,
    SProgramQuestions,
    SUniversityCareer,
    LazyHydrate,
  },

  data() {
    return {
      organizationData: {},
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
      const requestData = { slug: this.$route.params.slug };
      const organizationResponse = await getOrganizationInfo(requestData);
      this.organizationData = organizationResponse.attributes;
      this.entity_page = { id: organizationResponse.id, type: this.routePath };
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
