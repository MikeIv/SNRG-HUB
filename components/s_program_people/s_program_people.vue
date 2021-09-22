<template>
  <section class="s-program-people">
    <div class="l-default">
      <div class="s-program-people__wrapper">
        <h2 class="s-program-people__title a-font_h2" v-html="title"></h2>
        <div class="s-program-people__slider">
          <swiper ref="awesomeSwiper" :options="swiperOptionA">
            <swiper-slide v-for="item in items" :key="item.id" class="s-program-people__slide m-card-landing">
              <nuxt-link to="/">
                <m-card-landing :title="item.title" :text="item.text" :image="item.image" />
              </nuxt-link>
            </swiper-slide>
          </swiper>
        </div>
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
      swiperOptionA: {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: false,
        direction: 'vertical',
        height: 'auto',
        resistance: true,
        resistanceRatio: 0,
        breakpoints: {
          576: {
            spaceBetween: 16,
            slidesPerView: 'auto',
            direction: 'horizontal',
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
      computed: {
        swiper() {
          return this.$refs.awesomeSwiper.swiper;
        },
      },
      title: 'Кому подойдет <span>этот курс</span>',
      items: [
        {
          title: 'Новичкам',
          text:
            // eslint-disable-next-line max-len
            'Вы освоите все необходимые знания для написания структурированного кода, изучите основы работы с базами данных',
          image:
            // eslint-disable-next-line max-len
            'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&w=1200&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
        },
        {
          title: 'Новичкам',
          text:
            // eslint-disable-next-line max-len
            'Вы освоите все необходимые знания для написания структурированного кода, изучите основы работы с базами данных',
          image:
            // eslint-disable-next-line max-len
            'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&w=1200&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
        },
        {
          title: 'Новичкам',
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
