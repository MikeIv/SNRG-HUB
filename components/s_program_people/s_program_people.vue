<template>
  <section class="s-program-people">
    <div class="s-program-people__wrapper">
      <h2 class="s-program-people__title a-font_h2" v-html="title"></h2>
      <div class="s-program-people__slider">
        <swiper :options="swiperOptionProgramPeople">
          <swiper-slide v-for="people in programPeopleList" :key="people.id" class="s-program-people__slide">
            <m-card-landing :title="people.title" :text="people.text" :image="people.image" />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

import { MCardLanding } from '@cwespb/synergyui';
import './s_program_people.scss';

import getEntitiesSectionsDetail from '~/api/entitiesSectionsDetail';

export default {
  name: 's_program_people',

  components: {
    MCardLanding,
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      programPeopleList: [],
      baseUrl: process.env.NUXT_ENV_S3BACKET,
      swiperOptionProgramPeople: {
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
    };
  },

  props: ['methods', 'title'],
  async fetch() {
    const expandedMethod = this.methods[0].data;
    const preData = await getEntitiesSectionsDetail(expandedMethod);
    this.programPeopleList = preData.json.items.data.map((item) => ({
      title: item.title.value,
      text: item.description.value,
      image: item.preview_image && item.preview_image.value ? this.baseUrl + item.preview_image.value : '',
    }));
  },
};
</script>
