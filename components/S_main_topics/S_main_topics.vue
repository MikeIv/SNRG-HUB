<template>
  <section class="s-main-topics">
    <div class="s-main-topics__wrapper">
      <h5 class="s-main-topics__title a-font_h5">{{ mainTitle }}</h5>
      <div v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
          <m-card
            class="s-main-topics__slide swiper-slide m-card-vertical"
            v-for="product in directionsList"
            :key="product.id"
            :verticalImgSrc="`${baseUrl}/${product.preview_image}`"
            :title="product.name"
            type="vertical"
          />
          <a-button
            class="swiper-button-prev m-card-vertical__button"
            size="medium"
            bg-color="ghost-primary"
            only-icon="square"
            iconType="si-chevron-left"
            slot="button-prev"
            :disabled="disabled"
            @click="onClickBtn"
          ></a-button>
          <a-button
            class="swiper-button-next m-card-vertical__button"
            size="medium"
            bg-color="ghost-primary"
            only-icon="square"
            iconType="si-chevron-right"
            slot="button-next"
            :disabled="disabled"
            @click="onClickBtn"
          ></a-button>
        </div>
      </div>
    </div>
    <pre>{{ methods }}</pre>
    <pre>{{ directionsList }}</pre>
  </section>
</template>
<script>
import { MCard, AButton } from '@cwespb/synergyui';
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';
import './s_main_topics.scss';
import getDirectionsList from '~/api/dicrectionsList';

export default {
  name: 'SMainTopics',
  data() {
    return {
      mainTitle: 'Направления обучения',
      directionsList: null,
      baseUrl: process.env.NUXT_ENV_S3BACKET,
      swiperOption: {
        slideToClickedSlide: true,
        slidesPerView: 3,
        spaceBetween: 12,
        navigation: {
          disabledClass: 'swiper-button-disabled',
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          767: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
          1440: {
            slidesPerView: 7,
            spaceBetween: 20,
          },
          1499: {
            slidesPerView: 8.5,
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
  methods: {
    onClickBtn() {
      this.$emit('onClickBtn');
    },
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  mounted() {
    console.log('Swiper instances:', this.mySwiper);
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
    // console.log(this.directionsList);
  },
};
</script>
