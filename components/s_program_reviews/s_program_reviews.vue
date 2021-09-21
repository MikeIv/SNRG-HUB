<template>
  <section class="s-program-reviews">
    <div class="l-default">
      <div class="s-program-reviews__wrapper">
        <h2 class="s-program-reviews__title a-font_h2" v-html="title"></h2>
        <div class="s-program-reviews__items">
          <swiper class="swiper" :options="swiperOption">
            <MCardLanding
              v-for="item in items"
              :key="item.id"
              :subhead="item.subhead"
              :userName="item.userName"
              :userImage="item.userImage"
              :text="item.text"
              class="swiper-slide"
            />
          </swiper>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper } from 'vue-awesome-swiper';

import { MCardLanding } from '@cwespb/synergyui';
import './s_program_reviews.scss';

export default {
  name: 's_program_reviews',

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
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          768: {
            spaceBetween: 20,
            slidesPerView: 2,
          },
          360: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
        },
      },

      items: [
        {
          subhead: '14 сентября',
          userName: 'Екатерина Моисеева',
          userImage:
            'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&w=1200&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
          text: 'Благодаря этой программе я не только узнала по моей профессии больше, но и получила работающие советы и полезные ссылки для закрепления материала. Все материалы даются не только в формате видео, но и в презентациях, это важно, потому что у меня не всегда есть возможность смотреть видео, мало времени. А в презентациях вся информация кратко, после выпуска работает как шпаргалка)',
        },
        {
          subhead: '14 сентября',
          userName: 'Екатерина Моисеева',
          userImage:
            'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&w=1200&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
          text: 'Благодаря этой программе я не только узнала по моей профессии больше, но и получила работающие советы и полезные ссылки для закрепления материала. Все материалы даются не только в формате видео, но и в презентациях, это важно, потому что у меня не всегда есть возможность смотреть видео, мало времени. А в презентациях вся информация кратко, после выпуска работает как шпаргалка)',
        },
        {
          subhead: '14 сентября',
          userName: 'Екатерина Моисеева',
          userImage:
            'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&w=1200&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
          text: 'Благодаря этой программе я не только узнала по моей профессии больше, но и получила работающие советы и полезные ссылки для закрепления материала. Все материалы даются не только в формате видео, но и в презентациях, это важно, потому что у меня не всегда есть возможность смотреть видео, мало времени. А в презентациях вся информация кратко, после выпуска работает как шпаргалка)',
        },
        {
          subhead: '14 сентября',
          userName: 'Екатерина Моисеева',
          userImage:
            'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&w=1200&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
          text: 'Благодаря этой программе я не только узнала по моей профессии больше, но и получила работающие советы и полезные ссылки для закрепления материала. Все материалы даются не только в формате видео, но и в презентациях, это важно, потому что у меня не всегда есть возможность смотреть видео, мало времени. А в презентациях вся информация кратко, после выпуска работает как шпаргалка)',
        },
      ],
      title: 'Отзывы студентов',
    };
  },
};
</script>
