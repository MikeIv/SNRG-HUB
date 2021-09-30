<template>
  <section class="s-program-events">
    <h2 class="s-program-events__title a-font_h2" v-html="title"></h2>
    <div class="s-program-events__swiper">
      <swiper :options="swiperOptionProgramAnnounce">
        <swiper-slide v-for="item in items" :key="item.id" class="s-program-events__slide m-card-vertical">
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
        class="swiper-button-prev m-card-vertical__button s-program-events__button"
        size="medium"
        bg-color="ghost-primary"
        only-icon="square"
        iconType="si-chevron-left"
        slot="button-prev"
      ></a-button>
      <a-button
        class="swiper-button-next m-card-vertical__button s-program-events__button"
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
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

import { MCard, AButton } from '@cwespb/synergyui';
import './s_program_events.scss';

export default {
  name: 's_program_events',

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
