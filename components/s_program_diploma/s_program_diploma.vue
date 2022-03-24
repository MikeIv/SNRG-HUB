<template>
  <section class="s-program-diploma s-padding">
    <div class="l-wide">
      <h2 class="s-program-diploma__title a-font_h2" v-html="title"></h2>
      <div class="s-program-diploma__items">
        <swiper :options="swiperOptionProgramDiploma">
          <swiper-slide v-for="(diploma, idx) in diplomaList.data" :key="idx" class="s-program-diploma__slide">
            <MCardLanding
              :title="diploma.title.value"
              :text="diploma.description.value"
              :image="`${baseUrl}${diploma.preview_image.value}`"
            />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { MCardLanding } from '@cwespb/synergyui';
import './s_program_diploma.scss';
import getEntitiesSectionsDetail from '~/api/entitiesSectionsDetail';

export default {
  name: 's_program_diploma',

  components: {
    MCardLanding,
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      diplomaList: [],
      baseUrl: process.env.NUXT_ENV_S3BACKET,
      swiperOptionProgramDiploma: {
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
    this.diplomaList = preData.json.items;
  },
};
</script>
