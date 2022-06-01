<template>
  <section class="s-program-teachers s-margin" v-if="sectionData">
    <div class="l-wide l-border-radius">
      <h2 class="s-program-teachers__title a-font_h2" v-html="sectionData.title"></h2>
      <div class="s-program-teachers__items s-program-teachers__items_horizontal" v-if="itemsData.length < 4">
        <MCardSpeaker
          v-for="item in sectionData.items"
          :key="item.id"
          :name="item.name"
          :description="item.description"
          :image="`${baseURL}${item.image}`"
        />
      </div>
      <div class="s-program-teachers__items s-program-teachers__items_vertical" v-else>
        <swiper :options="swiperOptionA">
          <swiper-slide
            v-for="item in sectionData.items"
            :key="item.id"
            class="s-program-teachers__slide m-card-landing-vertical"
          >
            <MCardLanding :title="item.name" :text="item.description" :image="`${baseURL}${item.image}`" />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { MCardSpeaker, MCardLanding } from '@cwespb/synergyui';
import './s_program_teachers.scss';
import productSectionInfo from '~/api/productSectionInfo';
import getOrganizationSectionInfo from '~/api/organizationSectionInfo';

export default {
  name: 'SProgramTeachers',

  components: {
    MCardSpeaker,
    MCardLanding,
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      baseURL: process.env.NUXT_ENV_S3BACKET,
      sectionData: {},
      itemsData: [],
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

  async fetch() {
    if (
      this.$route.name === 'product-slug'
      || this.$route.name === 'product-ege'
      || this.$route.name === 'product-school'
    ) {
      const requestData = { slug: this.$route.params.slug, key: 's-program-teachers' };
      this.sectionData = await productSectionInfo(requestData);
      console.log('this.sectionData PRODUCT', this.sectionData);
      console.log('this.$route', this.$route);
    } else {
      const requestData = { slug: this.$route.params.slug, key: 's-program-teachers' };
      this.sectionData = await getOrganizationSectionInfo(requestData);
      console.log('this.sectionDataOrganization', this.sectionData);
    }

    this.itemsData = this.sectionData.items;
  },
};
</script>
