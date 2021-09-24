<template>
  <section class="s-program-diploma">
    <h2 class="s-program-diploma__title a-font_h2" v-html="title"></h2>
    <div class="s-program-diploma__items">
      <swiper :options="swiperOptionProgramDiploma">
        <swiper-slide v-for="item in items" :key="item.id" class="s-program-diploma__slide">
          <MCardLanding :title="item.title" :text="item.text" :image="item.image" />
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

      items: [
        {
          title: 'Государственный диплом',
          text: 'о высшем образовании с присвоением степени бакалавра',
          image: 'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac',
        },
        {
          title: 'Государственный диплом',
          text: 'о высшем образовании с присвоением степени бакалавра',
          image: 'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac',
        },
        {
          title: 'Государственный диплом',
          text: 'о высшем образовании с присвоением степени бакалавра',
          image: 'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac',
        },
        {
          title: 'Государственный диплом',
          text: 'о высшем образовании с присвоением степени бакалавра',
          image: 'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac',
        },
      ],
      title: 'Образцы дипломов',
    };
  },
};
</script>
