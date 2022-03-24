<template>
  <section class="s-university-life s-padding">
    <div class="l-wide">
      <h2 class="s-university-life__title s-university-life__title a-font_h2" v-html="title"></h2>
      <div class="s-university-life__items">
        <swiper :options="swiperOptionlifeUniversity">
          <swiper-slide
            v-for="(item, idx) in lifeUniversityList.data"
            :key="idx"
            class="s-university-life__slide m-card-landing"
          >
            <MCardLanding :image="`${baseUrl}${item.preview_image.value}`" />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { MCardLanding } from '@cwespb/synergyui';
import './s_university_life.scss';

import getEntitiesSectionsDetail from '~/api/entitiesSectionsDetail';

export default {
  name: 's_university_life',

  components: {
    MCardLanding,
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      lifeUniversityList: [],
      baseUrl: process.env.NUXT_ENV_S3BACKET,
      swiperOptionlifeUniversity: {
        grabCursor: true,
        slidesPerView: 'auto',
        spaceBetween: 24,
        resistance: true,
        resistanceRatio: 0,
        breakpoints: {
          768: {
            spaceBetween: 20,
          },
        },
      },
    };
  },
  props: ['methods', 'title'],
  async fetch() {
    const expandedMethod = this.methods[0].data;
    const preData = await getEntitiesSectionsDetail(expandedMethod);
    this.lifeUniversityList = preData.json.items;
  },
};
</script>
