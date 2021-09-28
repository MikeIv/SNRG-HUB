<template>
  <section class="s-success-history s-padding">
    <div class="l-wide">
      <div class="s-success-history__wrapper">
        <h2 class="s-success-history__title a-font_h5">{{ title }}</h2>
        <div class="s-success-history__swiper">
          <!-- При клике на карточку m-card необходимо отлавливать @click и открывать попап, когда он будет закочен. -->
          <swiper ref="awesomeSwiper" :options="swiperOptionA">
            <swiper-slide
              v-for="(successHistory, idx) in successHistoryList.data"
              :key="idx"
              class="s-success-history__slide"
            >
              <m-card
                :verticalImgSrc="`${baseUrl}${successHistory.avatar_image.value}`"
                :title="successHistory.name.value"
                :description="successHistory.position.value"
                :href="successHistory.link_video.value"
                type="vertical"
              />
            </swiper-slide>
          </swiper>
          <a-button
            class="swiper-button-prev s-success-history__prev"
            size="medium"
            bg-color="ghost-primary"
            only-icon="square"
            iconType="si-chevron-left"
          ></a-button>
          <a-button
            class="swiper-button-next s-success-history__next"
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
import './s_success_history.scss';
import getEntitiesSectionsDetail from '~/api/entitiesSectionsDetail';

export default {
  name: 'SSuccessHistory',
  data() {
    return {
      successHistoryList: [],
      baseUrl: process.env.NUXT_ENV_S3BACKET,
      swiperOptionA: {
        slidesPerView: 'auto',
        spaceBetween: 20,
        resistance: true,
        resistanceRatio: 0,
        navigation: {
          nextEl: '.s-success-history__next',
          prevEl: '.s-success-history__prev',
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
    const preData = await getEntitiesSectionsDetail(expandedMethod);
    this.successHistoryList = preData.json.items;
  },
};
</script>
