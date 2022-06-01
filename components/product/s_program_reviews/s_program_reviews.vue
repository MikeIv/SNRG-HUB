<template>
  <section class="s-program-reviews s-margin" v-if="sectionData">
    <div class="l-wide l-border-radius">
      <h2 class="s-program-reviews__title a-font_h2" v-html="sectionData.title"></h2>
      <div class="s-program-reviews__swiper">
        <swiper :options="swiperOptionA">
          <swiper-slide
            v-for="(review, idx) in sectionData.items"
            :key="idx"
            class="s-program-reviews__slide m-card-landing"
          >
            <MCardLanding :userName="review.fullName" :userImage="review.list[0].src" :text="review.description" />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { MCardLanding } from '@cwespb/synergyui';
import './s_program_reviews.scss';
import productSectionInfo from '~/api/productSectionInfo';

export default {
  name: 'sProgramReviews',

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
        spaceBetween: 24,
        resistance: true,
        resistanceRatio: 0,
        breakpoints: {
          360: {
            spaceBetween: 16,
          },
          768: {
            spaceBetween: 20,
          },
        },
      },
    };
  },

  async fetch() {
    const requestData = { slug: this.$route.params.slug, key: 's-program-reviews' };
    this.sectionData = await productSectionInfo(requestData);
  },
};
</script>
