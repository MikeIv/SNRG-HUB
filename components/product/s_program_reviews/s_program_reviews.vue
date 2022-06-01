<template>
  <section class="s-program-reviews s-margin">
    <div class="l-wide l-border-radius">
      <h2 class="s-program-reviews__title a-font_h2" v-html="sectionData.title"></h2>
      <div class="s-program-reviews__swiper">
        <swiper :options="swiperOptionA">
          <swiper-slide
            v-for="(review, idx) in sectionData.items"
            :key="idx"
            class="s-program-reviews__slide m-card-landing"
          >
            <!-- API не отдает дату отзыва. Поля физически нет, когда появится передать в subhead-->
            <MCardLanding
              :subhead="review.subhead"
              :userName="review.name.value"
              :userImage="`${baseUrl}${review.avatar_image.value}`"
              :text="review.description.value"
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
      sectionData: {},
      baseUrl: process.env.NUXT_ENV_S3BACKET,
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
