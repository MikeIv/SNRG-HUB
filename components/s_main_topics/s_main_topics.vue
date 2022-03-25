<template>
  <section class="s-main-topics s-padding">
    <div class="l-wide l-border-radius">
      <div class="s-main-topics__wrapper">
        <h2 class="s-main-topics__title a-font_h5">{{ title }}</h2>
        <div class="s-main-topics__swiper" :class="{ hidden: !isHidden }">
          <swiper ref="awesomeSwiper" :options="swiperOptionA">
            <swiper-slide
              v-for="product in directionsFullList"
              :key="product.id"
              class="s-main-topics__slide m-card-vertical"
            >
              <nuxt-link :to="`/catalog/${product.slug}?page=1`">
                <m-card-edu
                  :title="product.name"
                  :description="`${product.product_count} программ`"
                  :iconClasses="`${baseUrl}${product.preview_image}`"
                />
              </nuxt-link>
            </swiper-slide>
          </swiper>
          <div class="swiper-pagination-topics" slot="pagination"></div>
        </div>
        <div class="s-main-topics__cards cards" :class="{ hidden: isHidden }">
          <div class="s-main-topics__card" v-for="product in directionsFullList" :key="product.id">
            <nuxt-link :to="`/catalog/${product.slug}?page=1`">
              <m-card-edu
                :title="product.name"
                :description="`${product.product_count} программ`"
                :iconClasses="`${baseUrl}${product.preview_image}`"
              />
            </nuxt-link>
          </div>
        </div>

        <a-button v-if="isHidden" class="s-main-topics__btn" label="Показать все" @click="showMoreCards" />
      </div>
    </div>
  </section>
</template>
<script>
import { AButton } from '@cwespb/synergyui';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import './s_main_topics.scss';
import getCatalogCategoriesList from '~/api/getCatalogCategoriesList';
import MCardEdu from '~/components/ui/m-card-edu/m_card_edu';

export default {
  name: 'SMainTopics',
  data() {
    return {
      directionsFullList: [],
      baseUrl: process.env.NUXT_ENV_S3BACKET,
      isHidden: true,
      swiperOptionA: {
        slidesPerView: 'auto',
        spaceBetween: 10,
        resistance: true,
        resistanceRatio: 0,
        slidesPerGroup: 2,
        initialSlide: 0,
        observer: true,
        freeMode: false,
        pagination: {
          el: '.swiper-pagination-topics',
          clickable: true,
        },
        speed: 300,
        breakpoints: {
          767: {
            spaceBetween: 20,
          },
          1440: {
            spaceBetween: 20,
          },
          1499: {
            spaceBetween: 20,
            slidesPerGroup: 1,
          },
        },
      },
    };
  },
  components: {
    AButton,
    MCardEdu,
    Swiper,
    SwiperSlide,
  },
  props: ['methods', 'title'],
  async fetch() {
    const expandedMethod = this.methods[0].data;
    this.directionsFullList = await getCatalogCategoriesList(expandedMethod);
  },
  methods: {
    showMoreCards() {
      this.isHidden = !this.isHidden;
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
  },
  mounted() {
    this.windowWidth = window.innerWidth;
    window.addEventListener('resize', this.handleResize);
  },
};
</script>
