<template>
  <section v-if="sectionData" class="s-program-timeline s-margin">
    <div class="l-wide l-border-radius">
      <div class="s-program-timeline__header">
        <h2 class="s-program-timeline__title a-font_h2" v-html="sectionData.title" />
      </div>
      <div class="s-program-timeline__swiper">
        <swiper :options="swiperOptionA">
          <swiper-slide
            v-for="(item, index) in sectionData.items"
            :key="item.id"
            class="s-program-timeline__slide m-card-landing"
          >
            <MCardLanding
              class="s-program-timeline__card"
              :title="item.title"
              :text="item.description"
              :image="`/organization/timeline/timeline-${index + 1}.png`"
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
import './s_program_timeline.scss';
import getOrganizationSectionInfo from '~/api/organizationSectionInfo';

export default {
  name: 'SProgramTimeline',

  components: {
    MCardLanding,
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      sectionData: null,
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

  async fetch() {
    const requestData = { slug: this.$route.params.slug, key: 's-program-timeline' };
    this.sectionData = await getOrganizationSectionInfo(requestData);
  },
};
</script>
