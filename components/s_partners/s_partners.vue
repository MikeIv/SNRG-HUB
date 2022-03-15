<template>
  <section class="s-partners" :class="this.$route.name === 'index' ? 'main' : 'other'">
    <div v-if="this.$route.name === 'index'" class="l-wide">
      <div class="s-partners__box">
        <h2 class="s-partners__title main" v-html="title"></h2>
        <div class="s-partners__swiper" :key="key">
          <swiper
            v-for="index in swiperCount"
            :key="`${index}-${key}`"
            ref="partnersSwiper"
            :options="{
              ...swiperOptions,
              ...{
                autoplay: {
                  delay: 1,
                  reverseDirection: !!(index % 2),
                  disableOnInteraction: false,
                },
              },
            }"
          >
            <swiper-slide v-for="(company, idx) in chunkedList[index - 1]" :key="idx" class="s-partners__slide">
              <a-logo type="standart" :link="`${baseUrl}${company.logo_image.value}`" />
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
      swiperCount: 0,
      chunks: 7,
      chunkedList: [],
      baseUrl: process.env.NUXT_ENV_S3BACKET,
      swiperOptions: {
        spaceBetween: 12,
        autoHeight: false,
        loop: true,
        slidesPerView: 'auto',
        speed: 6000,
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
        const newChunk = array.slice(i, i + chunk);
        if (array.slice(i, i + chunk).length < 7 && array.slice(i, i + chunk).length > 3) {
          this.chunkedList.push([...newChunk, ...newChunk]);
        } else if (array.slice(i, i + chunk).length <= 3) {
          // eslint-disable-next-line max-len
          this.chunkedList.push([
            ...newChunk,
            ...newChunk,
            ...newChunk,
            ...newChunk,
            ...newChunk,
            ...newChunk,
            ...newChunk,
          ]);
        } else {
          this.chunkedList.push(newChunk);
        }
      }
    },
  },

  async mounted() {
    const expandedMethod = this.methods[0].data;
    const preData = await getEntitiesSectionsDetail(expandedMethod);
    this.companyList = preData.json.items.data;
    this.swiperCount = Math.ceil(this.companyList.length / this.chunks);
    this.chunkArray(this.companyList, this.chunks);
    this.key += 1;
  },
};
</script>
