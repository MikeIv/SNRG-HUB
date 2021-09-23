<template>
  <section class="s-program-announce">
    <h2 class="s-program-announce__title a-font_h2" v-html="title"></h2>
    <div class="s-program-announce__swiper">
      <swiper :options="swiperOptionProgramAnnounce">
        <swiper-slide v-for="item in items" :key="item.id" class="s-program-announce__slide m-card-vertical">
          <nuxt-link to="/">
            <m-card
              :title="item.title"
              :type="item.type"
              :description="item.description"
              :link="item.link"
              :aButtonText="item.aButtonText"
            />
          </nuxt-link>
        </swiper-slide>
      </swiper>
      <a-button
        class="swiper-button-prev m-card-vertical__button s-program-announce__button"
        size="medium"
        bg-color="ghost-primary"
        only-icon="square"
        iconType="si-chevron-left"
        slot="button-prev"
      ></a-button>
      <a-button
        class="swiper-button-next m-card-vertical__button s-program-announce__button"
        size="medium"
        bg-color="ghost-primary"
        only-icon="square"
        iconType="si-chevron-right"
        slot="button-next"
      ></a-button>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';

import { MCard, AButton } from '@cwespb/synergyui';
import './s_program_announce.scss';

export default {
  name: 's_program_announce',

  components: {
    MCard,
    AButton,
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      swiperOptionProgramAnnounce: {
        grabCursor: true,
        slidesPerView: 'auto',
        spaceBetween: 16,
        resistance: true,
        resistanceRatio: 0,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          576: {
            spaceBetween: 10,
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
