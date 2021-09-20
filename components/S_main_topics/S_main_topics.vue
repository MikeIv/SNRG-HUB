<template>
  <section class="s-main-topics">
    <div class="l-wide">
      <div class="s-main-topics__wrapper">
        <h5 class="s-main-topics__title a-font_h5">{{ title }}</h5>
        <swiper ref="mySwiper" class="swiper" :options="swiperOption">
          <swiper-slide
            v-for="product in directionsList"
            :key="product.id"
            class="s-main-topics__slide swiper-slide m-card-vertical"
          >
            <m-card :verticalImgSrc="`${baseUrl}/${product.preview_image}`" :title="product.name" type="vertical" />
          </swiper-slide>
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
        </swiper>
      </div>
      <pre>{{ methods }}</pre>
      <pre>{{ directionsList }}</pre>
    </div>
  </section>
</template>
<script>
import { MCard, AButton } from '@cwespb/synergyui';
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import 'swiper/css/swiper.min.css';
import './s_main_topics.scss';
import getDirectionsList from '~/api/dicrectionsList';

export default {
  name: 'SMainTopics',
  data() {
    return {
      title: 'Направления обучения',
      directionsList: null,
      baseUrl: process.env.NUXT_ENV_S3BACKET,
      swiperOption: {
        slideToClickedSlide: true,
        slidesPerView: 'auto',
        spaceBetween: 12,
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
    Swiper,
    SwiperSlide,
    MCard,
    AButton,
  },
  directives: {
    swiper: directive,
  },
  props: ['methods', 'title'],
  methods: {},
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  mounted() {
    console.log('Swiper Info:', this.swiper);
  },
  async fetch() {
    const requestData = {
      filter: {
        published: true,
        show_main: true,
      },
      sort: 'sort',
    };
    this.directionsList = await getDirectionsList(requestData);
  },
};
</script>
