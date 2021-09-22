<template>
  <div class="l-default">
    <section class="s_program_diploma">
      <h2 class="s_program_diploma__title a-font_h2" v-html="title"></h2>
      <div class="s_program_diploma__items">
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

import { MCardLanding } from '@cwespb/synergyui';
import './s_program_diploma.scss';

export default {
  name: 's_program_diploma',

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
          image:
            'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&w=1200&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
        },
        {
          title: 'Государственный диплом',
          text: 'о высшем образовании с присвоением степени бакалавра',
          image:
            'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&w=1200&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
        },
        {
          title: 'Государственный диплом',
          text: 'о высшем образовании с присвоением степени бакалавра',
          image:
            'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&w=1200&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
        },
        {
          title: 'Государственный диплом',
          text: 'о высшем образовании с присвоением степени бакалавра',
          image:
            'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&w=1200&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
        },
      ],
      title: 'Образцы дипломов',
    };
  },
};
</script>
