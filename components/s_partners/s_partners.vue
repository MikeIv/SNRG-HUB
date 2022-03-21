<template>
  <section class="s-partners" :class="this.$route.name === 'index' ? 'main' : 'other'">
    <div v-if="this.$route.name === 'index' && companyList.length <= 21" class="l-wide">
      <div class="s-partners__box">
        <h2 class="s-partners__title main" v-html="title"></h2>
        <div class="s-partners__swiper" :key="key">
          <swiper
            v-if="chunkedList[0] && chunkedList[0].length >= 7"
            class="noSwipingClass"
            ref="partnersSwiper1"
            :options="swiperOptions"
          >
            <swiper-slide v-for="(company, idx) in chunkedList[0]" :key="idx" class="s-partners__slide">
              <a-logo type="standart" :link="`${baseUrl}${company.logo_image.value}`" />
            </swiper-slide>
          </swiper>
          <swiper
            v-if="chunkedList[1] && chunkedList[1].length >= 7"
            class="noSwipingClass"
            ref="partnersSwiper2"
            :options="swiperOptions"
            dir="rtl"
          >
            <swiper-slide v-for="(company, idx) in chunkedList[1]" :key="idx" class="s-partners__slide">
              <a-logo type="standart" :link="`${baseUrl}${company.logo_image.value}`" />
            </swiper-slide>
          </swiper>
          <swiper
            v-if="chunkedList[2] && chunkedList[2].length >= 7"
            class="noSwipingClass"
            ref="partnersSwiper3"
            :options="swiperOptions"
          >
            <swiper-slide v-for="(company, idx) in chunkedList[2]" :key="idx" class="s-partners__slide">
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
        grabCursor: false,
        keyboard: false,
        mousewheel: false,
        noSwiping: true,
        noSwipingClass: 'noSwipingClass',
        autoplay: {
          delay: 1,
          disableOnInteraction: false,
        },
      },
      key: 1000,
    };
  },

  props: ['methods', 'title'],

  async mounted() {
    const expandedMethod = this.methods[0].data;
    const preData = await getEntitiesSectionsDetail(expandedMethod);
    this.companyList = preData.json.items.data;
    if (this.companyList.length > 0) {
      this.chunkedList.push(this.companyList.slice(0, 7));
      this.chunkedList.push(this.companyList.slice(7, 14));
      this.chunkedList.push(this.companyList.slice(14));
    }
  },
};
</script>
