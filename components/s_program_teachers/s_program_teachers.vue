<template>
  <section class="s-program-teachers" v-if="programTeachers.length">
    <h2 class="s-program-teachers__title a-font_h2" v-html="title"></h2>
    <div class="s-program-teachers__items s-program-teachers__items_horizontal" v-if="programTeachers.length < 4">
      <MCardSpeaker
        v-for="item in programTeachers"
        :key="item.id"
        :name="item.name"
        :title="item.title"
        :description="item.description"
        :image="`${baseURL}${item.preview_image}`"
      />
    </div>
    <div class="s-program-teachers__items s-program-teachers__items_vertical" v-else>
      <swiper :options="swiperOptionA">
        <swiper-slide
          v-for="item in programTeachers"
          :key="item.id"
          class="s-program-teachers__slide m-card-landing-vertical"
        >
          <MCardLanding :title="item.name" :text="item.description" :image="`${baseURL}${item.preview_image}`" />
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { MCardSpeaker, MCardLanding } from '@cwespb/synergyui';
import getProductsDetails from '~/api/productsDetail';
import getOrganizationsDetails from '~/api/organizationsDetail';
import './s_program_teachers.scss';

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
      baseURL: process.env.NUXT_ENV_S3BACKET,
      programTeachers: [],
      swiperOptionA: {
        grabCursor: true,
        slidesPerView: 'auto',
        spaceBetween: 20,
        resistance: true,
        resistanceRatio: 0,
        observer: true,
      },
    };
  },

  props: ['methods', 'title', 'slug'],
  async fetch() {
    const expandedMethod = { filter: {} };
    expandedMethod.include = ['persons'];
    if (this.slug) {
      expandedMethod.filter.slug = this.slug;
    } else {
      expandedMethod.filter.slug = this.$route.params.slug;
    }
    if (this.$route.name === 'product-slug' || this.$route.name === 'edu-platform-slug') {
      const preData = await getProductsDetails(expandedMethod);
      this.programTeachers = preData.data.included.persons;
    } else {
      const preData = await getOrganizationsDetails(expandedMethod);
      this.programTeachers = preData.data.included.persons;
    }
  },
};
</script>
