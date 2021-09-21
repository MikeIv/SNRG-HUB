<template>
  <section class="s-program-teacher-vertical">
    <div class="l-default">
      <div class="s-program-teacher-vertical__wrapper">
        <h2 class="s-program-teacher-vertical__title a-font_h2" v-html="title"></h2>
        <div class="s-program-teacher-vertical__items">
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
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper } from 'vue-awesome-swiper';

import { MCardLanding } from '@cwespb/synergyui';
import './s_program_teacher_vertical.scss';

export default {
  name: 's_program_vertical',

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

      items: [
        {
          title: 'Андрей Борю',
          text: 'В разработке более 12 лет, изначально программировал на php, потом освоил Golang, java, python. Последние несколько лет активно занимается devops. Работал в центральном вьетнамском офисе Лазады — крупнейшем азиатском маркетплейсе, и в офисе финтех-проекта в Литве',
          image:
            'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&w=1200&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
        },
        {
          title: 'Андрей Борю',
          text: 'В разработке более 12 лет, изначально программировал на php, потом освоил Golang, java, python. Последние несколько лет активно занимается devops. Работал в центральном вьетнамском офисе Лазады — крупнейшем азиатском маркетплейсе, и в офисе финтех-проекта в Литве',
          image:
            'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&w=1200&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
        },
        {
          title: 'Андрей Борю',
          text: 'В разработке более 12 лет, изначально программировал на php, потом освоил Golang, java, python. Последние несколько лет активно занимается devops. Работал в центральном вьетнамском офисе Лазады — крупнейшем азиатском маркетплейсе, и в офисе финтех-проекта в Литве',
          image:
            'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&w=1200&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
        },
        {
          title: 'Андрей Борю',
          text: 'В разработке более 12 лет, изначально программировал на php, потом освоил Golang, java, python. Последние несколько лет активно занимается devops. Работал в центральном вьетнамском офисе Лазады — крупнейшем азиатском маркетплейсе, и в офисе финтех-проекта в Литве',
          image:
            'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&w=1200&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
        },
      ],
      title: '<span>Преподаватели</span> курса',
    };
  },
};
</script>
