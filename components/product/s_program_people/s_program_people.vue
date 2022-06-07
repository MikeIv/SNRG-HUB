<template>
  <section class="s-program-people s-margin" v-if="sectionData">
    <div class="l-wide l-border-radius">
      <div class="s-program-people__wrapper">
        <h2 class="s-program-people__title a-font_h2" v-html="sectionData.title"></h2>
        <div class="s-program-people__slider">
          <swiper :options="swiperOptionProgramPeople">
            <swiper-slide v-for="people in sectionData.items" :key="people.id" class="s-program-people__slide">
              <m-card-landing :title="people.title" :text="people.description" :image="people.image" />
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

import { MCardLanding } from '@cwespb/synergyui';
import productSectionInfo from '~/api/productSectionInfo';
import './s_program_people.scss';

export default {
  name: 'SProgramPeople',

  components: {
    MCardLanding,
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      sectionData: null,
      baseUrl: process.env.NUXT_ENV_S3BACKET,
      swiperOptionProgramPeople: {
        slidesPerView: 'auto',
        spaceBetween: 20,
        loop: false,
        height: 'auto',
        direction: 'horizontal',
        resistance: true,
        resistanceRatio: 0,
        breakpoints: {
          100: {
            direction: 'vertical',
            allowTouchMove: false,
          },
          768: {
            spaceBetween: 24,
          },
          992: {
            slidesPerView: 3,
            direction: 'horizontal',
          },
        },
      },
    };
  },

  async fetch() {
    const requestData = { slug: this.$route.params.slug, key: 's-program-people' };
    this.sectionData = await productSectionInfo(requestData);
  },
};
</script>
