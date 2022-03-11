<template>
  <section class="s-partners" :class="this.$route.name === 'index' ? 'main' : 'other'">
    <div v-if="this.$route.name === 'index'" class="l-wide">
      <div class="s-partners__box">
        <h2 class="s-partners__title main" v-html="title"></h2>
        <div class="s-partners__swiper" :key="key">
          <swiper
            :key="`${key}-first`"
            ref="partnersSwiper"
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
          <swiper
            :key="`${key}-second`"
            ref="partnersSwiper"
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
            :key="`${key}-third`"
            ref="partnersSwiper"
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
    <div v-else class="s-partners__wrapper">
      <h2 class="s-partners__title s-program-timeline__title other a-font_h2" v-html="title"></h2>
      <div class="s-partners__items">
        <div class="s-partners__item" v-for="(company, idx) in companyList" :key="idx">
          <a-logo type="bordered" :link="`${baseUrl}${company.logo_image.value}`" />
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
      chunkedCompanyList: [],
      baseUrl: process.env.NUXT_ENV_S3BACKET,
      swiperOptions: {
        spaceBetween: 12,
        autoHeight: false,
        loop: true,
        slidesPerView: 'auto',
        speed: 2000,
        grabCursor: true,
        mousewheelControl: true,
        keyboardControl: true,
      },
      key: 1000,
    };
  },

  props: ['methods', 'title'],

  methods: {
    chunkArray(array, chunk) {
      for (let i = 0; i < array.length; i += chunk) {
        this.chunkedCompanyList.push(array.slice(i, i + chunk));
      }
      console.log('this.companyList', array);
      console.log('this.chunkedCompanyList', this.chunkedCompanyList);
    },
  },

  async mounted() {
    const expandedMethod = this.methods[0].data;
    const preData = await getEntitiesSectionsDetail(expandedMethod);
    this.companyList = preData.json.items.data;
    this.chunkArray(this.companyList, 7);
    this.key += 1;
  },
};
</script>
