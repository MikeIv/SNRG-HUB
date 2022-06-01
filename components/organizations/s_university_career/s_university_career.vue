<template>
  <section v-if="sectionData" class="s-university-career s-margin">
    <div class="l-wide l-border-radius">
      <div class="s-university-career__wrap">
        <h2 class="s-university-career__title a-font_h2" v-html="sectionData.title" />
        <div class="s-university-career__items">
          <AFactoids
            v-for="(factoid, index) in sectionData.items"
            :key="index"
            :type="factoid.type"
            :title="factoid.title"
            :lineNumber="factoid.lineNumber"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AFactoids from '@/components/_ui/A-factoids/A-factoids';
import './s_university_career.scss';
import getOrganizationSectionInfo from '~/api/organizationSectionInfo';

export default {
  name: 'SUniversityCareer',

  components: {
    AFactoids,
  },

  data() {
    return {
      sectionData: null,
    };
  },

  async fetch() {
    const requestData = { slug: this.$route.params.slug, key: 's-university-career' };
    this.sectionData = await getOrganizationSectionInfo(requestData);
  },
};
</script>
