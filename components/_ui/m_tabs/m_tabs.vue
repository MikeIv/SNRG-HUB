<template>
  <div class="m-tabs">
    <div class="m-btns">
      <div class="m-btns-list">
        <div class="m-tabs-item" v-for="(tab, index) in tabs" :key="index">
          <a :class="{ 'is-active': show == index }" class="m-tabs-item a-font_l" @click.prevent="show = index">
            {{ tab.label }}</a
          >
        </div>
      </div>
    </div>
    <div class="m-tabs-content-slider">
      <div class="m-tabs-content">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          class="m-tabs-item__content a-font_xxl"
          :class="{ 'is-active': show == index }"
        >
          <div v-html="tab.text" v-if="typeContent == 'default'"></div>

          <slot name="tab" :tab="tab" v-if="typeContent == 'slot'"></slot>

          <swiper ref="awesomeSwiperTabsContent" :options="swiperOptionTabsContent" v-if="typeContent == 'slider'">
            <swiper-slide v-for="(item, index) in tab.items" :key="index" class="m-tabs-content__slide">
              <MCardLanding
                :title="item.title"
                :position="item.position"
                :email="item.email"
                :phone="item.phone"
                :text="item.text"
                :image="item.image"
                :key="index"
                :limitText="limitText"
                class="m-tabs-content__item"
              />
              <MCardLanding
                :title="item.title"
                :position="item.position"
                :email="item.email"
                :phone="item.phone"
                :text="item.text"
                :image="item.image"
                :key="index"
                :limitText="limitText"
                class="m-tabs-content__item"
              />
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import MCardLanding from '~/components/_ui/m_card_landing/m_card_landing';
import './m_tabs.scss';

export default {
  name: 'MTabs',

  components: {
    MCardLanding,
    Swiper,
    SwiperSlide,
  },

  props: {
    tabs: { Array },
    typeContent: { type: String, default: 'default' },
  },

  data() {
    return {
      show: 0,
      limitText: 110,
      swiperOptionTabs: {
        slidesPerView: 'auto',
        spaceBetween: 0,
        resistance: true,
        grabCursor: true,
        resistanceRatio: 0,
      },
      swiperOptionTabsContent: {
        grabCursor: true,
        slidesPerView: 'auto',
        spaceBetween: 12,
        resistance: true,
        resistanceRatio: 0,
        breakpoints: {
          767: {
            spaceBetween: 8,
          },
          1439: {
            spaceBetween: 16,
          },
          1920: {
            spaceBetween: 20,
          },
        },
      },
    };
  },
  methods: {
    navigate(e) {
      if (e.target.dataset.show) {
        e.preventDefault();
        this.show = e.target.dataset.show;
      }
    },
  },
};
</script>
