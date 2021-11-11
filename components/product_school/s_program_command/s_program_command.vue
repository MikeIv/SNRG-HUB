<template>
  <div class="s-program-command">
    <h2 class="s-program-command__title a-font_h2" v-html="title"></h2>
    <div class="s-program-command__subtitle a-font_xxl" v-if="subtitle">{{ subtitle }}</div>
    <div class="s-program-command__items" :class="{ item_3: items.length > 4 }" v-if="!isMobile">
      <div class="s-program-command__item" v-for="(item, id) in items" :key="id">
        <div class="s-program-command__item-icon">
          <img :src="item.icon" />
        </div>
        <div class="s-program-command__item-title a-font_xxl">
          {{ item.title }}
        </div>
        <div class="s-program-command__item-text a-font_xl">
          {{ item.text }}
        </div>
      </div>
    </div>

    <swiper class="s-program-command__items" :options="swiperOptions" v-if="isMobile">
      <swiper-slide class="s-program-command__item" v-for="(item, id) in items" :key="id">
        <div class="s-program-command__item-icon">
          <img :src="item.icon" />
        </div>
        <div class="s-program-command__item-title a-font_xxl">
          {{ item.title }}
        </div>
        <div class="s-program-command__item-text a-font_xl">
          {{ item.text }}
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import './s_program_command.scss';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

export default {
  name: 'SProgramCommand',

  components: {
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      isMobile: false,
      title: '',
      subtitle: '',
      items: [],
      swiperOptions: {
        slidesPerView: 'auto',
        spaceBetween: 26,
        resistance: true,
        resistanceRatio: 0,
      },
    };
  },

  props: ['dataObject'],

  mounted() {
    this.isMobile = this.dataObject.isMobile;
    this.title = this.dataObject.title;

    this.subtitle = this.dataObject.subtitle;

    this.items = this.dataObject.items;

    window.addEventListener('resize', this.handleResize);
    window.addEventListener('DOMContentLoaded', this.handleResize);
    this.handleResize();
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('DOMContentLoaded', this.handleResize);
  },

  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;

      if (this.windowWidth < 767) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },
  },
};
</script>
