<template>
  <nav class="menu-main">
    <div class="l-wide">
      <!-- <a class="menu-main__location" href="#"><i class="si-location"></i>Москва</a> -->
      <swiper class="swiper-container menu-main__box" :options="swiperOption">
        <swiper-slide
          v-for="item in navLinks"
          :key="item.id"
        >
        <nuxt-link
          :to="`${item.link}`"
          class="a-font_m menu-main__link swiper-slide"
        >{{ item.anchor }}</nuxt-link>
      </swiper-slide>
      </swiper>
    </div>
  </nav>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import getMenuData from '~/api/menuData';
import 'swiper/css/swiper.min.css';
import './menu_horizontal.scss';

export default {
  name: 'menuMain',

  data() {
    return {
      navLinks: [],
      windowWidth: 0,
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 24,
        breakpoints: {
          1300: {
            spaceBetween: 75,
          },
          768: {
            spaceBetween: 40,
          },
        },
      },
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  directives: {
    swiper: directive,
  },
  async fetch() {
    this.navLinks = await getMenuData();
  },
};
</script>
