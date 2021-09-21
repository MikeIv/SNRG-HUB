<template>
  <nav class="menu-horizontal">
    <swiper class="menu-horizontal__box" ref="menuSlider" :options="swiperOption">
      <swiper-slide v-for="item in navLinks" :key="item.id">
        <nuxt-link :to="`${item.link}`" class="a-font_m menu-horizontal__link swiper-slide">
          {{ item.anchor }}
        </nuxt-link>
      </swiper-slide>
    </swiper>
  </nav>
</template>

<script>
import { directive } from 'vue-awesome-swiper';
import getMenuData from '~/api/menuData';
import './menu_horizontal.scss';

export default {
  name: 'menuMain',

  data() {
    return {
      navLinks: [],
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
  directives: {
    swiper: directive,
  },
  computed: {
    swiper() {
      return this.$refs.menuSlider.$swiper;
    },
  },
  async fetch() {
    this.navLinks = await getMenuData();
  },
};
</script>
