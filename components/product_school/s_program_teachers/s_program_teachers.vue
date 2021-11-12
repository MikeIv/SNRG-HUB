<template>
  <section class="s-program-teachers" v-if="programTeachers.length" :class="programTeachers.class">
    <h2 class="s-program-teachers__title a-font_h2" v-html="title"></h2>
    <div class="s-program-teachers__items s-program-teachers__items_horizontal" v-if="programTeachers.length < 4">
      <MCardSpeaker
        v-for="(item, id) in programTeachers"
        :key="id"
        :name="item.name"
        :title="item.title"
        :description="item.description"
        :image="item.image"
      />
    </div>
    <div class="s-program-teachers__items s-program-teachers__items_vertical" v-else>
      <swiper :options="swiperOptionA">
        <swiper-slide
          v-for="item in programTeachers"
          :key="item.id"
          class="s-program-teachers__slide m-card-landing-vertical"
        >
          <MCardLanding :title="item.name" :text="item.description" :image="item.image" />
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { MCardSpeaker, MCardLanding } from '@cwespb/synergyui';
import './s_program_teachers.scss';

export default {
  name: 's_program_teachers',

  components: {
    MCardSpeaker,
    MCardLanding,
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      baseURL: process.env.NUXT_ENV_S3BACKET,
      programTeachers: [],
      swiperOptionA: {},
    };
  },

  props: ['dataObject'],

  mounted() {
    this.title = this.dataObject.title;
    this.programTeachers = this.dataObject.list;
    this.swiperOptionA = this.dataObject.swiperOptions;
  },
};
</script>
