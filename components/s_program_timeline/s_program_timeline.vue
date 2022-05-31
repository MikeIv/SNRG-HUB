<template>
  <section class="s-program-timeline s-margin">
    <div class="l-wide l-border-radius">
      <div class="s-program-timeline__header">
        <h2 class="s-program-timeline__title a-font_h2" v-html="sectionData.title"></h2>
        <div class="s-program-timeline__factoids" v-if="programTimelineRightItems">
          <AFactoids
            v-for="timelineItem in sectionData.items"
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
            v-for="(item, idx) in sectionData.items"
            :key="item.id"
            class="s-program-timeline__slide m-card-landing"
          >
            <MCardLanding
              :title="item.title"
              :text="item.description"
              :image="`/product/s_program_timeline/${idx + 1}.png`"
            />
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

import productSectionInfo from '~/api/productSectionInfo';

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
      sectionData: null,
      baseUrl: process.env.NUXT_ENV_S3BACKET,
      swiperOptionA: {
        grabCursor: true,
        slidesPerView: 'auto',
        spaceBetween: 12,
        resistance: true,
        resistanceRatio: 0,
        breakpoints: {
          768: {
            spaceBetween: 20,
          },
        },
      },
    };
  },

  async mounted() {
    const requestData = { slug: this.$route.params.slug, key: 's-program-timeline' };
    this.sectionData = await productSectionInfo(requestData);
  },
};
</script>
