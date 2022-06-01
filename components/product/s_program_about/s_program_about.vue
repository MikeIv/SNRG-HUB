<template>
  <section class="s-program-about s-margin">
    fgvdglfdk
    <div class="l-wide l-border-radius">
      <div class="s-program-about__row">
        <h2 class="s-program-about__title a-font_h2" v-html="sectionData.title"></h2>
        <p class="s-program-about__description a-font_xl" v-html="programAboutDescription.value"></p>
      </div>
      <div class="s-program-about__triggers">
        <AFactoids
          v-for="item in programAboutList"
          :key="item.id"
          :type="item.type"
          :title="item.title"
          :number="item.number"
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
  name: 'sProgramAbout',

  components: {
    AFactoids,
  },

  data() {
    return {
      sectionData: {},
      baseUrl: process.env.NUXT_ENV_S3BACKET,
    };
  },

  async fetch() {
    const requestData = { slug: this.$route.params.slug, key: 's-program-about' };
    this.sectionData = await productSectionInfo(requestData);
  },
};
</script>
