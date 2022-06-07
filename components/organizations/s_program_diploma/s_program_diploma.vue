<template>
  <section v-if="sectionData" class="s-program-diploma s-margin">
    <div class="l-wide l-border-radius">
      <h2 class="s-program-diploma__title a-font_h2" v-html="sectionData.title"></h2>
      <div class="s-program-diploma__items">
        <swiper :options="swiperOptionProgramDiploma">
          <swiper-slide v-for="(diplom, index) in sectionData.items" :key="index" class="s-program-diploma__slide">
            <MCardLanding :title="diplom.title" :text="diplom.description" :image="`${baseUrl}${diplom.list[0].src}`" />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { MCardLanding } from '@cwespb/synergyui';
import './s_program_diploma.scss';
import getProductSectionInfo from '~/api/productSectionInfo';
import getOrganizationSectionInfo from '~/api/organizationSectionInfo';

export default {
  name: 'SProgramDiploma',

  components: {
    MCardLanding,
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      sectionData: null,
      baseUrl: process.env.NUXT_ENV_S3BACKET,
      swiperOptionProgramDiploma: {
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
    const requestData = { slug: this.$route.params.slug, key: 's-program-diploma' };
    if (this.$route.name === 'product-slug') {
      this.sectionData = await getProductSectionInfo(requestData);
    } else {
      this.sectionData = await getOrganizationSectionInfo(requestData);
    }
    console.log('--this.sectionData--', this.sectionData);
  },
};
</script>
