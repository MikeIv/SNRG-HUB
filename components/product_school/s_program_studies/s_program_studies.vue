<template>
  <section class="s-program-studies">
    <h2 class="s-program-studies__title a-font_h2" v-html="title"></h2>
    <div class="s-program-studies__subtitle a-font_xxl">
      {{ subtitle }}
    </div>
    <swiper :options="swiperOptions" class="s-program-studies__items">
      <swiper-slide class="s-program-studies__item" v-for="(item, id) in items" :key="id">
        <div class="s-program-studies__item-img" :class="item.imgTop"></div>
        <div class="s-program-studies__list">
          <div class="s-program-studies__list-title a-font_h6">
            {{ item.title }}
          </div>
          <div class="s-program-studies__list-items">
            <div class="s-program-studies__list-item" v-for="(li, id) in item.list" :key="id">
              <AListElement type="dotted" :label="li" class="" />
            </div>
            <div class="s-program-studies__list-message">
              <span class="s-program-studies__icon">!</span>
              <span class="s-program-studies__message a-font_m">{{ item.message }}</span>
            </div>
            <AButton label="Поступить в школу" bgColor="accent" />
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </section>
</template>

<script>
import './s_program_studies.scss';
import { AListElement, AButton } from '@cwespb/synergyui';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

export default {
  name: 'SProgramStudies',

  props: ['dataObject'],

  components: {
    AListElement,
    AButton,
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      title: '',
      subtitle: '',
      items: [],
      swiperOptions: {
        slidesPerView: 1,
        spaceBetween: 10,
        resistance: true,
        resistanceRatio: 0,
        breakpoints: {
          767: {
            spaceBetween: 16,
          },
          991: {
            slidesPerView: 2,
          },
        },
      },
    };
  },

  mounted() {
    this.title = this.dataObject.title;
    this.subtitle = this.dataObject.subtitle;
    this.items = this.dataObject.items;
  },
};
</script>
