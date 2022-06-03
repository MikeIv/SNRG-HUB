<template>
  <section class="s-program-university s-margin" v-if="sectionData">
    <div class="l-wide l-border-radius">
      <div class="s-program-university__top">
        <h2 class="s-program-university__title a-font_h2" v-html="sectionData.title"></h2>
        <p class="s-program-university__introtext a-font_xxl" v-html="sectionData.subtitle"></p>
        <p class="s-program-university__description" v-html="sectionData.description"></p>
        <span class="s-program-university__img" v-if="sectionData.logoItems[0].base64">
          <img :src="sectionData.logoItems[0].base64" alt="" />
        </span>
      </div>
      <div class="s-program-university__factoids">
        <div class="s-program-university__factoids-item" v-for="(item, idx) in getAllItem" :key="idx">
          <AFactoids :title="item.description" :number="item.number" color="color_link" type="number" />
        </div>
        <div class="s-program-university__factoids-more" v-if="!flag && getAllItem.length > 6">
          <AButton size="large" bgColor="accent" label="Показать ещё" @click="flag = true"></AButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { AButton } from '@cwespb/synergyui';
import AFactoids from '@/components/_ui/A-factoids/A-factoids';
import './s_program_university.scss';
// import getOrganizationsDetail from '~/api/organizationsDetail';
import productSectionInfo from '~/api/productSectionInfo';

export default {
  name: 'SProgramUniversity',

  components: {
    AFactoids,
    AButton,
  },
  computed: {
    getAllItem() {
      if (this.flag) {
        return this.sectionData.factoidItems;
      }
      return this.sectionData.factoidItems.slice(0, 6);
    },
  },

  data() {
    return {
      programUniversityList: [],
      baseUrl: process.env.NUXT_ENV_S3BACKET,
      flag: false,
      sectionData: null,
    };
  },
  props: ['methods', 'productIds'],

  async fetch() {
    const requestData = { slug: this.$route.params.slug, key: 's-program-university' };
    this.sectionData = await productSectionInfo(requestData);
  },
};
</script>
