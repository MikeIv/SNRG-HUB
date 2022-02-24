<template>
  <div>
    <div class="l-wide catalog-page">
      <s-catalog-section
        title="Программы обучения"
        :hasPresets="presets.length"
        :presets="presets"
        :products-per-page="24"
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
import SCatalogSection from '~/components/s_catalog_section/s_catalog_section';
import SQuiz from '~/components/s_quiz/s_quiz';
import getFiltersProductPresets from '~/api/filtersProductsPresets';
import './s_catalog.scss';

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
