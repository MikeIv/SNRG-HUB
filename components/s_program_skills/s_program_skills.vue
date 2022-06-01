<template>
  <section v-if="sectionData" class="s-program-skills s-margin">
    <div class="l-wide l-border-radius">
      <h2 class="s-program-skills__title a-font_h2" v-html="sectionData.title" />
      <div class="s-program-skills__items">
        <AListElement v-for="(item, index) in sectionData.items" :key="index" :type="item.type" :label="item.value" />
      </div>
    </div>
  </section>
</template>

<script>
import { AListElement } from '@cwespb/synergyui';
import productSectionInfo from '~/api/productSectionInfo';
import './s_program_skills.scss';

export default {
  name: 'SProgramSkills',

  components: {
    AListElement,
  },

  data() {
    return {
      sectionData: null,
    };
  },

  async fetch() {
    const requestData = { slug: this.$route.params.slug, key: 's-program-skills' };
    this.sectionData = await productSectionInfo(requestData);
  },
};
</script>
