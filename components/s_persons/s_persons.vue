<template>
  <section class="s-persons s-padding">
    <div class="l-wide">
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
          <a-button
            class="swiper-button-prev s-persons__prev"
            size="medium"
            bg-color="ghost-primary"
            only-icon="square"
            iconType="si-chevron-left"
          ></a-button>
          <a-button
            class="swiper-button-next s-persons__next"
            size="medium"
            bg-color="ghost-primary"
            only-icon="square"
            iconType="si-chevron-right"
          ></a-button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { MCard, AButton } from '@cwespb/synergyui';
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
        spaceBetween: 20,
        resistance: true,
        resistanceRatio: 0,
        navigation: {
          nextEl: '.s-persons__next',
          prevEl: '.s-persons__prev',
        },
        breakpoints: {
          767: {
            spaceBetween: 20,
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
    AButton,
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
