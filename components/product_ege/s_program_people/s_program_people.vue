<template>
  <section class="s-program-people">
    <div class="s-program-people__wrapper">
      <h2 class="s-program-people__title a-font_h2" v-html="title"></h2>
      <div class="s-program-people__slider">
        <swiper :options="swiperOptionProgramPeople" v-if="!isMobile">
          <swiper-slide v-for="people in programPeopleList" :key="people.id" class="s-program-people__slide">
            <m-card-landing :title="people.title" :text="people.text" :image="people.image" />
          </swiper-slide>
        </swiper>
        <div v-else class="s-program-people__items">
          <div v-for="people in programPeopleList" :key="people.id" class="s-program-people__slide">
            <m-card-landing :title="people.title" :text="people.text" :image="people.image" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

import { MCardLanding } from '@cwespb/synergyui';
import './s_program_people.scss';

export default {
  name: 's_program_people',

  components: {
    MCardLanding,
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      windowWidth: 0,
      isMobile: false,
      title: '',
      programPeopleList: [],
      swiperOptionProgramPeople: {},
      baseUrl: process.env.NUXT_ENV_S3BACKET,
    };
  },

  props: ['methods', 'dataObject'],

  mounted() {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('DOMContentLoaded', this.handleResize);
    this.handleResize();
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('DOMContentLoaded', this.handleResize);
  },

  created() {
    this.title = this.dataObject.title;
    this.programPeopleList = this.dataObject.list;
    this.swiperOptionProgramPeople = this.dataObject.swiperOptions;
  },

  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;

      if (this.windowWidth < 767) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },
  },
};
</script>
