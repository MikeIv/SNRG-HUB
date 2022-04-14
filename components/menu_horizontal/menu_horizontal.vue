<template>
  <nav class="menu-horizontal" itemscope itemtype="http://schema.org/SiteNavigationElement">
    <swiper class="menu-horizontal__box" :options="swiperOption">
      <template v-for="item in navLinks">
        <swiper-slide v-if="item.active" :key="item.id" itemprop="name">
          <a
            :href="`/catalog?page=1&${Object.entries(item.filter_by)[0][0]}=${Object.entries(
              item.filter_by,
            )[0][1].toString()}`"
            class="a-font_m menu-horizontal__link"
            itemprop="url"
          >
            {{ item.anchor }}
          </a>
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

  props: ['isOpen'],

  data() {
    return {
      navLinks: [],
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 24,
        breakpoints: {
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
