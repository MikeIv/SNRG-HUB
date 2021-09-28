<template>
  <section class="s-program-reviews">
    <h2 class="s-program-reviews__title a-font_h2" v-html="title"></h2>
    <div class="s-program-reviews__swiper">
      <swiper :options="swiperOptionA">
        <swiper-slide
          v-for="(review, idx) in reviewsList.data"
          :key="idx"
          class="s-program-reviews__slide m-card-landing"
        >
          <!-- API не отдает дату отзыва. Поля физически нет, когда появится передать в subhead-->
          <MCardLanding
            :subhead="review.subhead"
            :userName="review.name.value"
            :userImage="`${baseUrl}${review.avatar_image.value}`"
            :text="review.description.value"
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
import getEntitiesSectionsDetail from '~/api/entitiesSectionsDetail';

export default {
  name: 's_program_reviews',

  components: {
    MCardLanding,
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      reviewsList: [],
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

      items: [
        {
          subhead: '14 сентября',
          userName: 'Екатерина Моисеева',
          userImage:
            // eslint-disable-next-line max-len
            'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&w=1200&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
          // eslint-disable-next-line max-len
          text: 'Благодаря этой программе я не только узнала по моей профессии больше, но и получила работающие советы и полезные ссылки для закрепления материала. Все материалы даются не только в формате видео, но и в презентациях, это важно, потому что у меня не всегда есть возможность смотреть видео, мало времени. А в презентациях вся информация кратко, после выпуска работает как шпаргалка)',
        },
      ],
    };
  },
  props: ['methods', 'title'],
  async fetch() {
    const expandedMethod = this.methods[0].data;
    const preData = await getEntitiesSectionsDetail(expandedMethod);
    this.reviewsList = preData.json.items;
  },
};
</script>
