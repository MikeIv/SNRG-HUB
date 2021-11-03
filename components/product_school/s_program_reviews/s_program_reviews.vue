<template>
  <section class="s-program-reviews">
    <h2 class="s-program-reviews__title a-font_h2" v-html="title"></h2>
    <div class="s-program-reviews__swiper">
      <swiper :options="swiperOptionA">
        <swiper-slide v-for="(review, idx) in reviewsList" :key="idx" class="s-program-reviews__slide m-card-landing">
          <!-- API не отдает дату отзыва. Поля физически нет, когда появится передать в subhead-->
          <MCardLanding
            :subhead="review.subhead"
            :userName="review.name"
            :userImage="review.img"
            :text="review.description"
          />
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { MCardLanding } from '@cwespb/synergyui';
import './s_program_reviews.scss';

export default {
  name: 's_program_reviews',

  components: {
    MCardLanding,
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      title: 'Отзывы учеников и родителей',
      reviewsList: [
        {
          subhead: '14 сентября',
          img: '/school/avatar.svg',
          name: 'Екатерина Моисеева',
          description:
            // eslint-disable-next-line max-len
            'Благодаря этой программе я не только узнала по моей профессии больше, но и получила работающие советы и полезные ссылки для закрепления материала. Все материалы даются не только в формате видео, но и в презентациях, это важно, потому что у меня не всегда есть возможность смотреть видео, мало времени. А в презентациях вся информация кратко, после выпуска работает как шпаргалка) ',
        },
        {
          subhead: '14 сентября',
          img: '/school/avatar.svg',
          name: 'Екатерина Моисеева',
          description:
            // eslint-disable-next-line max-len
            'Благодаря этой программе я не только узнала по моей профессии больше, но и получила работающие советы и полезные ссылки для закрепления материала. Все материалы даются не только в формате видео, но и в презентациях, это важно, потому что у меня не всегда есть возможность смотреть видео, мало времени. А в презентациях вся информация кратко, после выпуска работает как шпаргалка) ',
        },
        {
          subhead: '14 сентября',
          img: '/school/avatar.svg',
          name: 'Екатерина Моисеева',
          description:
            // eslint-disable-next-line max-len
            'Благодаря этой программе я не только узнала по моей профессии больше, но и получила работающие советы и полезные ссылки для закрепления материала. Все материалы даются не только в формате видео, но и в презентациях, это важно, потому что у меня не всегда есть возможность смотреть видео, мало времени. А в презентациях вся информация кратко, после выпуска работает как шпаргалка) ',
        },
      ],
      baseUrl: process.env.NUXT_ENV_S3BACKET,
      swiperOptionA: {
        grabCursor: true,
        slidesPerView: 'auto',
        spaceBetween: 24,
        resistance: true,
        resistanceRatio: 0,
        breakpoints: {
          360: {
            spaceBetween: 16,
          },
          768: {
            spaceBetween: 20,
          },
        },
      },
    };
  },
};
</script>
