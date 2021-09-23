<template>
  <div class="l-default">
    <section class="s-program-timeline">
      <div class="s-program-timeline__header">
        <h2 class="s-program-timeline__title a-font_h2" v-html="title"></h2>
        <div class="s-program-timeline__factoids">
          <AFactoid
            v-for="factoid in factoids"
            :key="factoid.id"
            :type="factoid.type"
            :title="factoid.title"
            :subtitle="factoid.subtitle"
          />
        </div>
      </div>
      <div class="s-program-timeline__swiper">
        <swiper ref="awesomeSwiper" :options="swiperOptionA">
          <swiper-slide v-for="item in items" :key="item.id" class="s-program-timeline__slide m-card-landing">
            <MCardLanding :title="item.title" :text="item.text" :image="item.image" />
          </swiper-slide>
        </swiper>
      </div>
      <div class="s-program-timeline__items">
        <swiper class="swiper" :options="swiperOption">
          <MCardLanding
            v-for="item in items"
            :key="item.id"
            :title="item.title"
            :text="item.text"
            :image="item.image"
            class="swiper-slide"
          />
        </swiper>
      </div>
    </section>
  </div>
</template>

<script>
import { Swiper } from 'vue-awesome-swiper';

import { AFactoid, MCardLanding } from '@cwespb/synergyui';
import './s_program_timeline.scss';

export default {
  name: 's_program_timeline',

  components: {
    Swiper,
    AFactoid,
    MCardLanding,
  },

  computed: {
    swiper() {
      return this.$refs.awesomeSwiper.swiper;
    },
  },

  data() {
    return {
      baseUrl: process.env.NUXT_ENV_S3BACKET,
      swiperOption: {
        grabCursor: true,
        slidesPerView: 'auto',
        spaceBetween: 20,
        resistance: true,
        resistanceRatio: 0,
        breakpoints: {
          768: {
            spaceBetween: 12,
          },
        },
      },
      swiperOptionA: {
        grabCursor: true,
        slidesPerView: 'auto',
        spaceBetween: 20,
        loop: true,
        resistance: true,
        resistanceRatio: 0,
        breakpoints: {
          768: {
            spaceBetween: 12,
          },
        },
      },

      title: 'Как проходит <span>обучение</span>',
      factoids: [
        {
          title: '6 месяцев',
          subtitle: 'Длительность',
          type: 'default',
        },
        {
          title: 'командный кейс',
          subtitle: 'Дипломный проект',
          type: 'default',
        },
      ],
      items: [
        {
          title: 'Изучаете тему',
          text: 'Смотрите обучающие видео и задаёте вопросы',
          image:
            'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&w=1200&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
        },
        {
          title: 'Изучаете тему',
          text: 'Смотрите обучающие видео и задаёте вопросы',
          image:
            'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&w=1200&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
        },
        {
          title: 'Изучаете тему',
          text: 'Смотрите обучающие видео и задаёте вопросы',
          image:
            'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&w=1200&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
        },
        {
          title: 'Изучаете тему',
          text: 'Смотрите обучающие видео и задаёте вопросы',
          image:
            'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&w=1200&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
        },
      ],
    };
  },
};
</script>
