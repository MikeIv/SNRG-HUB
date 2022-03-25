<template>
  <section class="s-program-timeline s-margin">
    <div class="l-wide l-border-radius">
      <div class="s-program-timeline__header">
        <h2 class="s-program-timeline__title a-font_h2" v-html="title"></h2>
        <div class="s-program-timeline__factoids" v-if="programTimelineRightItems">
          <AFactoids
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
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { MCardLanding } from '@cwespb/synergyui';
import AFactoids from '@/components/_ui/A-factoids/A-factoids';
import './s_program_timeline.scss';

import getEntitiesSectionsDetail from '~/api/entitiesSectionsDetail';

export default {
  name: 's_program_timeline',

  components: {
    AFactoids,
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
    this.programTimelineList = preData.json.items.data.map((item, index) => ({
      title: item.title.value,
      text: item.description.value,
      image: item.image
        ? this.baseUrl + item.preview_image.value
        : `https://synergymarket.ru/site/img/how/${index + 1}.png`,
    }));
    this.programTimelineRightItems = preData.json.rightItems.data.map((item) => ({
      subtitle: item.title && item.title.value ? item.title.value : '',
      title: item.description && item.description.value ? item.description.value : '',
      type: 'default',
    }));
  },
};
</script>
