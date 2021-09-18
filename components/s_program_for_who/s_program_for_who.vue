<template>
  <section class="s-program-for-who">
    <div class="s-program-for-who__wrapper">
      <h2 class="s-program-for-who__title a-font_h2" v-html="title"></h2>
      <div class="s-program-for-who__items">
        <swiper class="swiper" :options="swiperOption">
          <MCardLanding
            v-for="item in items"
            :key="item.id"
            :subhead="item.subhead"
            :text="item.text"
            :image="item.image"
            class="swiper-slide"
          />
        </swiper>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper } from 'vue-awesome-swiper';

import { MCardLanding } from '@cwespb/synergyui';
import './s_program_for_who.scss';

export default {
  name: 's_program_for_who',

  components: {
    Swiper,
    MCardLanding,
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
        slidesPerView: 4,
        spaceBetween: 30,
        loop: true,
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          768: {
            spaceBetween: 30,
            slidesPerView: 2.5,
          },
          360: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
        },
      },

      title: 'Кому подойдет <span>этот курс</span>',
      items: [
        {
          subhead: 'Новичкам',
          text:
            // eslint-disable-next-line max-len
            'Вы освоите все необходимые знания для написания структурированного кода, изучите основы работы с базами данных',
          image:
            // eslint-disable-next-line max-len
            'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&w=1200&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
        },
        {
          subhead: 'Новичкам',
          text:
            // eslint-disable-next-line max-len
            'Вы освоите все необходимые знания для написания структурированного кода, изучите основы работы с базами данных',
          image:
            // eslint-disable-next-line max-len
            'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&w=1200&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
        },
        {
          subhead: 'Новичкам',
          text:
            // eslint-disable-next-line max-len
            'Вы освоите все необходимые знания для написания структурированного кода, изучите основы работы с базами данных',
          image:
            // eslint-disable-next-line max-len
            'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&w=1200&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
        },
      ],
    };
  },
};
</script>
