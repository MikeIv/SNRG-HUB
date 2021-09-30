<template>
  <section class="s-program-timeline">
    <div class="s-program-timeline__header">
      <h2 class="s-program-timeline__title a-font_h2" v-html="title"></h2>
      <div class="s-program-timeline__factoids" v-if="programTimelineRightItems">
        <AFactoid
          v-for="timelineItem in programTimelineRightItems"
          :key="timelineItem.id"
          :type="timelineItem.type"
          :title="timelineItem.title"
          :subtitle="timelineItem.subtitle"
        />
      </div>
    </div>
    <div class="s-program-timeline__swiper">
      <swiper :options="swiperOptionA">
        <swiper-slide
          v-for="item in programTimelineList"
          :key="item.id"
          class="s-program-timeline__slide m-card-landing"
        >
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
      programTimelineRightItems: [],
      baseUrl: process.env.NUXT_ENV_S3BACKET,
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
    };
  },

  props: ['methods', 'title'],
  async fetch() {
    const expandedMethod = this.methods[0].data;
    const preData = await getEntitiesSectionsDetail(expandedMethod);
    this.programTimelineList = preData.json.items.data.map((item) => ({
      title: item.title.value,
      text: item.description.value,
      image: item.image ? this.baseUrl + item.preview_image.value : '',
    }));
    this.programTimelineRightItems = preData.json.rightItems.data.map((item) => ({
      title: item.description.value ?? '',
      subtitle: item.title.value ?? '',
      type: 'default',
    }));
  },
};
</script>
