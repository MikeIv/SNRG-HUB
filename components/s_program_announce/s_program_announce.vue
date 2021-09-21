<template>
  <section class="s-program-announce">
    <div class="l-default s-program-announce__wrapper">
      <h2 class="s-program-announce__title a-font_h2" v-html="title"></h2>
      <div class="s-program-announce__items">
        <swiper class="swiper" :options="swiperOption">
          <MCard
            v-for="item in items"
            :key="item.id"
            :type="item.type"
            :date="item.date"
            :title="item.title"
            :description="item.description"
            :link="item.link"
            :aButtonText="item.aButtonText"
            class="swiper-slide"
          />
        </swiper>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper } from 'vue-awesome-swiper';

import { MCard } from '@cwespb/synergyui';
import './s_program_announce.scss';

export default {
  name: 's_program_announce',

  components: {
    Swiper,
    MCard,
  },

  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },

  data() {
    return {
      baseUrl: process.env.NUXT_ENV_S3BACKET,
      swiperOption: {
        grabCursor: true,
        slidesPerView: 1.5,
        spaceBetween: 16,
        breakpoints: {
          768: {
            slidesPerView: 3.5,
          },
          576: {
            slidesPerView: 2.5,
          },
        },
      },

      title: 'Учиться бесплатно',
      items: [
        {
          type: 'announce',
          date: '22 июня в 15:00',
          title: 'JAVA для новичков. Программируем вендинговый автомат',
          description: 'Вебинар',
          link: 'synergy.ru',
          aButtonText: 'Подробнее',
        },
        {
          type: 'announce',
          date: '22 июня в 15:00',
          title: 'JAVA для новичков. Программируем вендинговый автомат',
          description: 'Вебинар',
          link: 'synergy.ru',
          aButtonText: 'Подробнее',
        },
        {
          type: 'announce',
          date: '22 июня в 15:00',
          title: 'JAVA для новичков. Программируем вендинговый автомат',
          description: 'Вебинар',
          link: 'synergy.ru',
          aButtonText: 'Подробнее',
        },
        {
          type: 'announce',
          date: '22 июня в 15:00',
          title: 'JAVA для новичков. Программируем вендинговый автомат',
          description: 'Вебинар',
          link: 'synergy.ru',
          aButtonText: 'Подробнее',
        },
      ],
    };
  },
};
</script>
