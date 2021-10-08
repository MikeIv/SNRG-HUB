<template>
  <section class="s-partners">
    <div :class="this.$route.name === 'index' ? 'l-wide' : 's-partners__wrapper'">
      <h2
        class="s-partners__title s-program-timeline__title"
        :class="this.$route.name === 'index' ? 'a-font_h5' : 'a-font_h2'"
        v-html="title"
      ></h2>
      <div class="s-partners__items">
        <div class="s-partners__item" v-for="(company, idx) in companyList" :key="idx">
          <a-logo type="bordered" :link="`${baseUrl}${company.logo_image.value}`" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ALogo } from '@cwespb/synergyui';

import getEntitiesSectionsDetail from '~/api/entitiesSectionsDetail';

import './s_partners.scss';

export default {
  name: 'SPartners',

  components: {
    ALogo,
  },

  data() {
    return {
      companyList: [],
      baseUrl: process.env.NUXT_ENV_S3BACKET,
    };
  },

  props: ['methods', 'title'],
  async fetch() {
    const expandedMethod = this.methods[0].data;
    const preData = await getEntitiesSectionsDetail(expandedMethod);
    this.companyList = preData.json.items.data;
  },
};
</script>
