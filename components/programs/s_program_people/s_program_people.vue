<template>
  <section class="s-program-people s-margin">
    <div class="l-wide l-border-radius">
      <div class="s-program-people__wrapper">
        <h2 class="s-program-people__title a-font_h2" v-html="sectionData.title"></h2>
        <div class="s-program-people__slider">
          <swiper :options="swiperOptionProgramPeople" v-if="!isMobile">
            <swiper-slide v-for="people in sectionData.items" :key="people.id" class="s-program-people__slide">
              <m-card-landing :title="people.title" :text="people.description" :image="people.image" />
            </swiper-slide>
          </swiper>
          <div v-else class="s-program-people__items">
            <div v-for="people in sectionData.items" :key="people.id" class="s-program-people__slide">
              <m-card-landing :title="people.title" :text="people.description" :image="people.image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

import { MCardLanding } from '@cwespb/synergyui';
import productSectionInfo from '~/api/productSectionInfo';
import './s_program_people.scss';

export default {
  name: 'SProgramPeople',

  components: {
    MCardLanding,
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      sectionData: {},
      windowWidth: 0,
      isMobile: false,
      programPeopleList: [],
      baseUrl: process.env.NUXT_ENV_S3BACKET,
      swiperOptionProgramPeople: {
        slidesPerView: 'auto',
        spaceBetween: 20,
        loop: false,
        height: 'auto',
        direction: 'horizontal',
        resistance: true,
        resistanceRatio: 0,
        breakpoints: {
          576: {
            spaceBetween: 16,
            slidesPerView: 'auto',
            direction: 'horizontal',
          },
          768: {
            spaceBetween: 24,
          },
          992: {
            slidesPerView: 3,
            direction: 'horizontal',
          },
        },
      },
    };
  },

  // props: ['methods', 'title'],

  // async fetch() {
  //   const expandedMethod = this.methods[0].data;
  //   const preData = await getEntitiesSectionsDetail(expandedMethod);
  //   this.programPeopleList = preData.json.items.data.map((item, index) => ({
  //     title: item.title.value,
  //     text: item.description.value,
  //     // eslint-disable-next-line max-len
  //     image:
  //       item.preview_image && item.preview_image.value
  //         ? this.baseUrl + item.preview_image.value
  //         : `https://synergymarket.ru/site/img/for-whom/${index + 1}.png`,
  //   }));
  // },

  async fetch() {
    const requestData = { slug: this.$route.params.slug, key: 's-program-people' };
    this.sectionData = await productSectionInfo(requestData);
    console.log('this.sectionData', this.sectionData);
  },

  mounted() {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('DOMContentLoaded', this.handleResize);
    this.handleResize();
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('DOMContentLoaded', this.handleResize);
  },

  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;

      if (this.windowWidth < 767) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },
  },
};
</script>
