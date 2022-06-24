<template>
  <section v-if="sectionData" class="s-university-life s-margin">
    <div class="l-wide l-border-radius">
      <h2 class="s-university-life__title s-university-life__title a-font_h2" v-html="sectionData.title" />
      <div class="s-university-life__items">
        <swiper :options="swiperOptionlifeUniversity">
          <swiper-slide
            v-for="(item, index) in sectionData.items"
            :key="index"
            class="s-university-life__slide m-card-landing"
          >
            <MCardLanding :image="`${baseUrl}${item.list[0].src}`" />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { MCardLanding } from '@cwespb/synergyui';
import './s_university_life.scss';
import getOrganizationSectionInfo from '~/api/organizationSectionInfo';

export default {
  name: 'SUniversityLife',

  components: {
    MCardLanding,
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      sectionData: null,
      baseUrl: process.env.NUXT_ENV_S3BACKET,
      swiperOptionlifeUniversity: {
        grabCursor: true,
        slidesPerView: 'auto',
        spaceBetween: 24,
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
    const requestData = { slug: this.$route.params.slug, key: 's-university-life' };
    this.sectionData = await getOrganizationSectionInfo(requestData);
  },
};
</script>
