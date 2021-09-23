<template>
  <section class="l-wide">
    <nuxt-link :to="`${baseURL}/${bannersDetail.link}`" class="s_banner__link">
      <m-banner
        class="s_banner"
        :type="bannersDetail.banner_type"
        :bgColor="bannersDetail.color_bg"
        :topTxt="bannersDetail.description"
        :titleTxt="bannersDetail.name"
        :secondTxt="bannersDetail.name_second"
        :color="bannersDetail.color_text"
        :ImgSrc="`${baseURL}/${bannersDetail.image}`"
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
      bannersDetail: {},
      baseURL: process.env.NUXT_ENV_S3BACKET,
      windowWidth: 0,
      redirectUrl: '#',
    };
  },
  props: ['methods', 'title'],
  methods: {},
  async fetch() {
    let [expandedMethod] = this.methods;
    expandedMethod = { ...expandedMethod.data };
    this.bannersDetail = await getBannersDetail(expandedMethod);
  },
  mounted() {},
  computed: {},
};
</script>
