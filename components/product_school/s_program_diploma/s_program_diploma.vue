<template>
  <section class="s-program-diploma">
    <h2 class="s-program-diploma__title a-font_h2">{{ title }}</h2>
    <div class="s-program-diploma__items">
      <swiper :options="swiperOptionProgramDiploma">
        <swiper-slide
          v-for="(diploma, idx) in diplomaList"
          :key="idx"
          class="s-program-diploma__slide s-program-diploma__slide-product"
        >
          <MCardLanding :title="diploma.title" :image="diploma.img" />
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { MCardLanding } from '@cwespb/synergyui';
import './s_program_diploma.scss';

export default {
  name: 's_program_diploma',

  components: {
    MCardLanding,
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      title: 'Документы',
      diplomaList: [
        {
          img: '/school/documents/1.png',
          title: 'Свидетельство о госсударсвенной аккредитации',
          description: '',
        },
        {
          img: '/school/documents/2.png',
          title: 'Лицензия на право оказывать образовательные услугиитации',
          description: '',
        },
        {
          img: '/school/documents/3.png',
          title: 'Приложение к лицензии на осуществнление образовательной деятельности',
          description: '',
        },
        {
          img: '/school/documents/4.png',
          title: 'Приложение к свидетельству о госсударсвенной аккредитации',
          description: '',
        },
      ],
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
};
</script>
