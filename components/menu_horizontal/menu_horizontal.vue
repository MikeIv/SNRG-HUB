<template>
  <nav class="menu-horizontal">
    <swiper class="menu-horizontal__box" :options="swiperOption">
      <template v-for="item in navLinks">
        <swiper-slide v-if="item.active" :key="item.id">
          <nuxt-link
            :to="`/catalog?page=1&${Object.entries(item.filter_by)[0][0]}=${Object.entries(
              item.filter_by,
            )[0][1].toString()}`"
            class="a-font_m menu-horizontal__link"
          >
            {{ item.anchor }}
          </nuxt-link>
        </swiper-slide>
      </template>
    </swiper>
  </nav>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
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
  components: {
    Swiper,
    SwiperSlide,
  },
  async fetch() {
    this.navLinks = await getMenuData();
  },
};
</script>
