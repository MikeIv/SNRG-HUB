<template>
  <section class="s-partners">
    <!--    <div :class="this.$route.name === 'index' ? 'l-wide' : 's-partners__wrapper'">-->
    <!--      <h2-->
    <!--        class="s-partners__title s-program-timeline__title"-->
    <!--        :class="this.$route.name === 'index' ? 'a-font_h5' : 'a-font_h2'"-->
    <!--        v-html="title"-->
    <!--      ></h2>-->
    <!--      <div class="s-partners__items">-->
    <!--        <div class="s-partners__item" v-for="(company, idx) in companyList" :key="idx">-->
    <!--          <a-logo type="bordered" :link="`${baseUrl}${company.logo_image.value}`" />-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="l-wide">
      <div class="s-partners__box">
        <h2 class="s-partners__title" v-html="title"></h2>
        <div class="s-partners__swiper">
          <swiper
            ref="partnersFirstSwiper"
            :options="{
              ...swiperOptions,
              ...{
                autoplay: {
                  delay: 0,
                  disableOnInteraction: false,
                },
              },
            }"
          >
            <swiper-slide v-for="(company, idx) in companyList" :key="idx" class="s-partners__slide">
              <a-logo type="bordered" :link="`${baseUrl}${company.logo_image.value}`" />
            </swiper-slide>
          </swiper>
          <swiper
            ref="partnersSecondSwiper"
            :options="{
              ...swiperOptions,
              ...{
                autoplay: {
                  delay: 1,
                  reverseDirection: true,
                  disableOnInteraction: false,
                },
              },
            }"
          >
            <swiper-slide v-for="(company, idx) in companyList" :key="idx" class="s-partners__slide">
              <a-logo type="bordered" :link="`${baseUrl}${company.logo_image.value}`" />
            </swiper-slide>
          </swiper>
          <swiper
            ref="partnersThirdSwiper"
            :options="{
              ...swiperOptions,
              ...{
                autoplay: {
                  delay: 1,
                  disableOnInteraction: false,
                },
              },
            }"
          >
            <swiper-slide v-for="(company, idx) in companyList" :key="idx" class="s-partners__slide">
              <a-logo type="bordered" :link="`${baseUrl}${company.logo_image.value}`" />
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { ALogo } from '@cwespb/synergyui';

import getEntitiesSectionsDetail from '~/api/entitiesSectionsDetail';

import './s_partners.scss';

export default {
  name: 'SPartners',

  components: {
    ALogo,
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      companyList: [],
      baseUrl: process.env.NUXT_ENV_S3BACKET,
      swiperOptions: {
        spaceBetween: 12,
        autoHeight: false,
        loop: true,
        slidesPerView: 'auto',
        speed: 3000,
        grabCursor: true,
        mousewheelControl: true,
        keyboardControl: true,
      },
    };
  },

  props: ['methods', 'title'],
  async fetch() {
    const expandedMethod = this.methods[0].data;
    const preData = await getEntitiesSectionsDetail(expandedMethod);
    this.companyList = preData.json.items.data;
  },

  mounted() {
    this.$refs.partnersFirstSwiper.$swiper.autoplay.start();
    this.$refs.partnersSecondSwiper.$swiper.autoplay.start();
    this.$refs.partnersThirdSwiper.$swiper.autoplay.start();
  },
};
</script>
