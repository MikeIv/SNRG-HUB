<template>
  <section class="l-wide" :class="{ banners: bannersDetail.length > 1 }">
    <template v-for="item in bannersDetail">
      <nuxt-link
        :to="`${item.link}`"
        class="s_banner__link"
        :key="item.id"
        :class="{ multibanner: bannersDetail.length > 1 }"
      >
        <m-banner
          class="s_banner"
          :type="item.banner_type"
          :bgColor="item.color_bg_list"
          :topTxt="item.description"
          :titleTxt="item.name"
          :secondTxt="item.name_second"
          :color="item.color_text_list"
          :ImgSrc="`${baseURL}/${item.image}`"
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
  name: 'SBanner',

  components: {
    MBanner,
  },
  data() {
    return {
      bannersDetail: [],
      bannersConcatArray: [],
      baseURL: process.env.NUXT_ENV_S3BACKET,
    };
  },
  props: ['methods'],
  async fetch() {
    this.methods.forEach((item) => {
      const obj = { ...item.data };
      this.bannersConcatArray.push(obj);
    });

    this.bannersConcatArray.forEach(async (item) => {
      const obj = await getBannersDetail(item);
      this.bannersDetail.push(obj);
    });
  },
};
</script>
