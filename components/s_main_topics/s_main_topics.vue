<template>
  <section class="s-main-topics">
    <div class="l-wide">
      <div class="s-main-topics__wrapper">
        <h2 class="s-main-topics__title a-font_h5">{{ title }}</h2>
        <div class="s-main-topics__swiper">
          <swiper ref="awesomeSwiper" :options="swiperOptionA">
            <swiper-slide
              v-for="product in directionsList"
              :key="product.id"
              class="s-main-topics__slide m-card-vertical"
            >
              <nuxt-link to="/">
                <m-card :verticalImgSrc="`${baseUrl}${product.preview_image}`" :title="product.name" type="vertical" />
              </nuxt-link>
            </swiper-slide>
          </swiper>
          <a-button
            class="swiper-button-prev m-card-vertical__button s-main-topics__button"
            size="medium"
            bg-color="ghost-primary"
            only-icon="square"
            iconType="si-chevron-left"
            slot="button-prev"
          ></a-button>
          <a-button
            class="swiper-button-next m-card-vertical__button s-main-topics__button"
            size="medium"
            bg-color="ghost-primary"
            only-icon="square"
            iconType="si-chevron-right"
            slot="button-next"
          ></a-button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { MCard, AButton } from '@cwespb/synergyui';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import './s_main_topics.scss';
import getDirectionsList from '~/api/dicrectionsList';

export default {
  name: 'SMainTopics',
  data() {
    return {
      directionsList: [],
      baseUrl: process.env.NUXT_ENV_S3BACKET,
      swiperOptionA: {
        slidesPerView: 'auto',
        spaceBetween: 12,
        resistance: true,
        resistanceRatio: 0,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
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
    const expandedMethod = this.methods.data;
    this.directionsList = await getDirectionsList(expandedMethod);
  },
};
</script>
