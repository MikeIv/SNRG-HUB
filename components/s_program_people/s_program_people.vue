<template>
  <section class="s-program-people">
    <div class="s-program-people__wrapper">
      <h2 class="s-program-people__title a-font_h2" v-html="title"></h2>
      <div class="s-program-people__items">
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
import './s_program_people.scss';

export default {
  name: 's_program_people',

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
        slidesPerView: 3,
        spaceBetween: 24,
        loop: true,
        breakpoints: {
          768: {
            spaceBetween: 16,
            slidesPerView: 3,
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
