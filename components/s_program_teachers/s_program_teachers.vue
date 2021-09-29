<template>
  <section class="s-program-teachers">
    <h2 class="s-program-teachers__title a-font_h2">{{ title }}</h2>
    <div class="s-program-teachers__items s-program-teachers__items_horisontal" v-if="programTeachers.length < 4">
      <MCardSpeaker
        v-for="item in programTeachers"
        :key="item.id"
        :name="item.name"
        :title="item.title"
        :text="item.description"
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
          <MCardLanding :title="item.title" :text="item.description" :image="item.image" />
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { MCardSpeaker, MCardLanding } from '@cwespb/synergyui';
import getProductsDetails from '~/api/productsDetail';

import './s_program_teachers.scss';
import getEntitiesSectionsDetail from '~/api/entitiesSectionsDetail';

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
      programTeachers: [],
      swiperOptionA: {
        grabCursor: true,
        slidesPerView: 'auto',
        spaceBetween: 20,
        resistance: true,
        resistanceRatio: 0,
      },
    };
  },

  props: ['methods', 'title'],
  async fetch() {
    const expandedMethod = { filter: {} };
    expandedMethod.include = ['persons'];
    expandedMethod.filter.slug = this.$route.params.slug;
    const preData = await getProductsDetails(expandedMethod);
    console.log('@@@@', preData);
    this.programTeachers = preData.data.included.persons;
    console.log('@@', this.programTeachers);
  },
};
</script>
