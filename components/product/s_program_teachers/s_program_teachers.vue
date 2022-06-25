<template>
  <section v-if="sectionData && sectionData.items.length" class="s-program-teachers s-margin">
    <div class="l-wide l-border-radius">
      <h2 class="s-program-teachers__title a-font_h2" v-html="sectionData.title"></h2>
      <div
        class="s-program-teachers__items s-program-teachers__items_horizontal"
        v-if="sectionData.items && sectionData.items.length < 4"
      >
        <MCardSpeaker
          v-for="item in sectionData.items"
          :key="item.id"
          :name="item.name"
          :description="item.description"
          :image="`${baseURL}/${item.preview_image}`"
        />
      </div>
      <div class="s-program-teachers__items s-program-teachers__items_vertical" v-else>
        <swiper :options="swiperOptionA">
          <swiper-slide
            v-for="item in sectionData.items"
            :key="item.id"
            class="s-program-teachers__slide m-card-landing-vertical"
          >
            <MCardLanding :title="item.name" :text="item.description" :image="`${baseURL}/${item.preview_image}`" />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { MCardSpeaker, MCardLanding } from '@cwespb/synergyui';
import productSectionInfo from '~/api/productSectionInfo';
import getOrganizationSectionInfo from '~/api/organizationSectionInfo';
import './s_program_teachers.scss';

export default {
  name: 'SProgramTeachers',

  props: ['slug'],

  components: {
    MCardSpeaker,
    MCardLanding,
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      /* baseURL: process.env.NUXT_ENV_S3BACKET, */
      sectionData: null,
      swiperOptionA: {
        grabCursor: true,
        slidesPerView: 'auto',
        spaceBetween: 20,
        resistance: true,
        resistanceRatio: 0,
        observer: true,
      },
      baseURL: 'https://sys3.ru/marketplace',
    };
  },

  async fetch() {
    const requestData = { slug: this.slug || this.$route.params.slug, key: 's-program-teachers' };

    if (this.$route.name === 'product-slug' || this.$route.name === 'edu-platform') {
      this.sectionData = await productSectionInfo(requestData);
    } else {
      this.sectionData = await getOrganizationSectionInfo(requestData);
    }
  },
};
</script>
