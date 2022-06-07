<template>
  <section v-if="sectionData" class="s-university-score s-margin">
    <div class="l-wide l-border-radius">
      <h2 class="s-university-score__title a-font_h2" v-html="sectionData.title" />
      <div class="s-university-score__items">
        <a-factoid
          v-for="item in sectionData.items"
          :key="item.id"
          type="line"
          :title="item.title"
          :lineNumber="item.lineNumber"
          color="color_link"
        />
      </div>
      <div class="s-university-score__image" v-if="imageSrc">
        <img :src="imageSrc" alt="img" />
      </div>
    </div>
  </section>
</template>

<script>
import { AFactoid } from '@cwespb/synergyui';
import getOrganizationSectionInfo from '~/api/organizationSectionInfo';
import './s_university_scores.scss';

export default {
  name: 'SUniversityScores',

  components: {
    AFactoid,
  },
  data() {
    return {
      sectionData: null,
      imageSrc:
        // eslint-disable-next-line max-len
        'data:image/svg+xml;base64, PHN2ZyB3aWR0aD0iMjY0IiBoZWlnaHQ9IjIxNiIgdmlld0JveD0iMCAwIDI2NCAyMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0yNDUuNDQzIDIyMi42NkwxMjEuOTU1IDEwOC4wMTRMMjQ1LjQ0MyAtNi42MjkzOUwyNjQgLTEzNy4wODJMMCAxMDcuOTg2TDI2NCAzNTMuMDgxTDI0NS40NDMgMjIyLjY2WiIgZmlsbD0iI0ZGMDA0MCIvPgo8L3N2Zz4K',
    };
  },

  async fetch() {
    const requestData = { slug: this.$route.params.slug, key: 's-university-scores' };
    this.sectionData = await getOrganizationSectionInfo(requestData);
  },
};
</script>
