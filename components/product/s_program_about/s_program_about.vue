<template>
  <section class="s-program-about s-margin" v-if="sectionData">
    <div class="l-wide l-border-radius">
      <div class="s-program-about__row">
        <h2 class="s-program-about__title a-font_h2" v-html="sectionData.title"></h2>
        <p class="s-program-about__description a-font_xl" v-html="sectionData.description"></p>
      </div>
      <div class="s-program-about__triggers">
        <AFactoids
          v-for="item in sectionData.items"
          :key="item.id"
          :type="item.type"
          :title="item.description"
          :number="item.title"
          :image="item.image"
          class="s-program-about__triggers-item"
        />
      </div>
    </div>
  </section>
</template>

<script>
import AFactoids from '@/components/_ui/A-factoids/A-factoids';
import './s_program_about.scss';
import productSectionInfo from '~/api/productSectionInfo';

export default {
  name: 'SProgramAbout',

  components: {
    AFactoids,
  },

  data() {
    return {
      sectionData: null,
    };
  },

  async fetch() {
    const requestData = { slug: this.$route.params.slug, key: 's-program-about' };
    this.sectionData = await productSectionInfo(requestData);
    console.log('----', this.sectionData);
  },
};
</script>
