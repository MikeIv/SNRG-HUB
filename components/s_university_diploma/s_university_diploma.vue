<template>
  <section class="s-university-diploma">
    <h2 class="s-university-diploma__title s-program-timeline__title a-font_h2" v-html="title"></h2>
    <div class="s-university-diploma__items">
      <swiper ref="awesomeSwiper" :options="swiperOptionUniversityDiploma">
        <MCardLanding v-for="item in items" :key="item.id" :image="item.image" class="swiper-slide" />
      </swiper>
    </div>
  </section>
</template>

<script>
import { MCardLanding } from '@cwespb/synergyui';
import './s_university_diploma.scss';

export default {
  name: 's_university_diploma',

  components: {
    MCardLanding,
  },

  data() {
    return {
      baseUrl: process.env.NUXT_ENV_S3BACKET,
      swiperOptionUniversityDiploma: {
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
          image:
            'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&w=1200&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
        },
        {
          image:
            'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&w=1200&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
        },
        {
          image:
            'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&w=1200&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
        },
        {
          image:
            'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&w=1200&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
        },
      ],
      title: 'Жизнь <span>университета</span>',
    };
  },
};
</script>
