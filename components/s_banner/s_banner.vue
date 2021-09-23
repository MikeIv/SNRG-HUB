<template>
  <section class="l-wide">
    <h2 class="s_banner__h2 a-font_h5">{{ title }}</h2>
    <h2 class="s_banner__h2 a-font_h5">{{ methods }}</h2>
    <nuxt-link :to="redirectUrl" class="s_banner__link">
      <m-banner
        class="s_banner"
        type="narrow"
        bgColor="secondary"
        leftCol="active"
        topTxt="topTxt"
        titleTxt="titleTxt"
        secondTxt="secondTxt"
        textCol="active"
        color="custom"
      />
    </nuxt-link>
  </section>
</template>

<script>
import { MBanner } from '@cwespb/synergyui';
import getBannersDetail from '~/api/bannersDetail';
import './s_banner.scss';

export default {
  name: 'SBanner',

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
  props: ['methods', 'title', 'view_type'],
  methods: {
    getWindowWidth() {
      this.windowWidth = document.documentElement.clientWidth;
    },
  },
  async fetch() {
    const expandedBanners = this.methods.data;
    this.bannersDetail = await getBannersDetail(expandedBanners);
  },
  mounted() {
    this.$nextTick(function () {
      window.addEventListener('resize', this.getWindowWidth);
      // Init
      this.getWindowWidth();
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth);
  },
  computed: {
    cardsSet() {
      let cardsList = 0;
      if (this.windowWidth > 991) {
        cardsList = 6;
      } else if (this.windowWidth < 992) {
        cardsList = 4;
      }
      return cardsList;
    },
  },
};
</script>
