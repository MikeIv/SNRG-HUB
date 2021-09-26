<template>
  <section class="s-program-timeline">
    <div class="s-program-timeline__header">
      <h2 class="s-program-timeline__title a-font_h2" v-html="title"></h2>
      <div class="s-program-timeline__factoids" v-if="factoids">
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
      <swiper :options="swiperOptionA">
        <swiper-slide
          v-for="item in programTimelineList"
          :key="item.id"
          class="s-program-timeline__slide m-card-landing">
          <MCardLanding :title="item.title" :text="item.text" :image="item.image" />
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

import { AFactoid, MCardLanding } from '@cwespb/synergyui';
import './s_program_timeline.scss';

import getEntitiesSectionsDetail from '~/api/entitiesSectionsDetail';

export default {
  name: 's_program_timeline',

  components: {
    AFactoid,
    MCardLanding,
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      programTimelineList: [],
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
        resistance: true,
        resistanceRatio: 0,
        breakpoints: {
          768: {
            spaceBetween: 12,
          },
        },
      },

      // factoids: [
      //   {
      //     title: '6 месяцев',
      //     subtitle: 'Длительность',
      //     type: 'default',
      //   },
      //   {
      //     title: 'командный кейс',
      //     subtitle: 'Дипломный проект',
      //     type: 'default',
      //   },
      // ],

    };
  },

  props: ['methods', 'title'],
  async fetch() {
    const expandedMethod = this.methods[0].data;
    const preData = await getEntitiesSectionsDetail(expandedMethod);
    this.programTimelineList = preData.json.items.data.map((item) => ({
      title: item.title.value,
      text: item.description.value,
      // Todo: Проверка на пустоту preview_image - сейчас значение пустое
      // image: item.preview_image.value ? item.preview_image.value : '',
    }));
  },
};
</script>
