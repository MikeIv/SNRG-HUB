<template>
  <section class="l-wide">
    <h2 class="s_banner__h2 a-font_h5">{{ title }}</h2>
    <h2 class="s_banner__h2 a-font_h5">{{ methods }}</h2>
    <h2 class="s_banner__h2 a-font_h5">{{ bannersDetail }}</h2>
    <template v-for="product in bannersDetail">
      <nuxt-link :to="redirectUrl" class="s_banner__link" :key="product.id">
        <m-banner
          class="s_banner"
          type="narrow"
          bgColor="secondary"
          leftCol="active"
          topTxt="topTxt"
          :titleTxt="product.name"
          secondTxt="secondTxt"
          textCol="active"
          color="custom"
        />
      </nuxt-link>
    </template>
  </section>
</template>

<script>
import { MBanner } from '@cwespb/synergyui';
import getBannersDetail from '~/api/bannersDetail';
import './s_banner.scss';

export default {
  name: 'banner_main_page',

  components: {
    MBanner,
  },

  data() {
    return {
      bannersDetail: [],
      baseURL: process.env.NUXT_ENV_S3BACKET,
      windowWidth: 0,
      redirectUrl: '#',
    };
  },
  props: ['methods', 'title'],
  methods: {},
  // async fetch() {
  //   this.bannersDetail = await getBannersDetail(this.methods.data);
  // },
  mounted() {},

  computed: {},
};
</script>
