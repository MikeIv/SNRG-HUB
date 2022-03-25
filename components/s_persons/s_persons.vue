<template>
  <section class="s-persons s-margin">
    <div class="l-wide l-border-radius">
      <div class="s-persons__wrapper">
        <h2 class="s-persons__title a-font_h5" v-html="title"></h2>
        <div class="s-persons__swiper">
          <swiper ref="awesomeSwiper" :options="swiperOptionA">
            <swiper-slide v-for="person in personsList" :key="person.id" class="s-persons__slide">
              <m-card
                :verticalImgSrc="`${baseUrl}${person.preview_image}`"
                :title="person.name"
                :description="person.description"
                type="vertical"
              />
            </swiper-slide>
          </swiper>
          <div class="swiper-pagination" slot="pagination"></div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { MCard } from '@cwespb/synergyui';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import './s_persons.scss';
import getPersonsList from '~/api/personsList';

export default {
  name: 'SPersons',
  data() {
    return {
      personsList: [],
      baseUrl: process.env.NUXT_ENV_S3BACKET,
      swiperOptionA: {
        slidesPerView: 'auto',
        spaceBetween: 12,
        resistance: true,
        resistanceRatio: 0,
        loop: true,
        initialSlide: 0,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        mousewheel: {
          invert: false,
        },
        breakpoints: {
          991: {
            spaceBetween: 12,
          },
          1440: {
            spaceBetween: 20,
          },
          1499: {
            spaceBetween: 20,
          },
        },
      },
    };
  },
  components: {
    MCard,
    Swiper,
    SwiperSlide,
  },
  props: ['methods', 'title'],
  async fetch() {
    const expandedMethod = this.methods[0].data;
    this.personsList = await getPersonsList(expandedMethod);
  },
};
</script>
