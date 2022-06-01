<template>
  <section class="s-program-skills s-margin l-wide l-border-radius">
    <h2 class="s-program-skills__title a-font_h2" v-html="sectionData.title"></h2>
    <div class="s-program-skills__items">
      <AListElement v-for="(item, index) in sectionData.items" :key="index" :type="item.type" :label="item.value" />
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

  async mounted() {
    const requestData = { slug: this.$route.params.slug, key: 's-program-skills' };
    this.sectionData = await productSectionInfo(requestData);
  },
};
</script>
