<template>
  <div>
    <div class="l-wide catalog-page organizations-page s-margin l-border-radius">
      <s-organization-section
        title="Учебные заведения"
        :hasPresets="presets.length"
        :presets="presets"
        :products-per-page="24"
        category="default"
        :key="mainCatalogKey"
        :currentOption="currentOption"
        :options="options"
        :filtersMenu="filtersMenu"
        @change-sort-options="changeSortOptions"
        @menu-toggle="menuToggle"
      />
    </div>
    <SQuiz :quizId="2" class="catalog-page__quiz" />
  </div>
</template>

<script>
import SOrganizationSection from '~/components/s_organization_section/s_organization_section';
import SQuiz from '~/components/s_quiz/s_quiz';
import '../s_catalog/s_catalog.scss';
import getFiltersProductPresets from '~/api/filtersProductsPresets';

export default {
  name: 'SOrganizations',
  components: {
    SOrganizationSection,
    SQuiz,
  },
  props: ['pageInfo', 'currentOption', 'options', 'filtersMenu'],

  data() {
    return {
      presets: [],
      mainCatalogKey: 666,
    };
  },

  methods: {
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
  },
};
</script>
