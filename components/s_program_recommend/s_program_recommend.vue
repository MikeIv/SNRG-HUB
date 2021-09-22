<template>
  <div class="l-default">
    <section class="s-program-recommend">
      <h2 class="s-program-recommend__title a-font_h2">{{ title }}</h2>
      <div class="s-program-recommend__swiper">
        <swiper ref="awesomeSwiper" :options="swiperOptionA">
          <swiper-slide v-for="item in items" :key="item.id" class="s-program-recommend__slide m-card-vertical">
            <nuxt-link to="/">
              <m-card
                :title="item.title"
                :type="item.type"
                :description="item.description"
                :bottomText="item.bottomText"
                :iconSrc="item.iconSrc"
                @onLikeClick="onLikeClickHandler"
              />
            </nuxt-link>
          </swiper-slide>
        </swiper>
        <a-button
          class="swiper-button-prev m-card-verticalbutton s-program-recommend__button"
          size="medium"
          bg-color="ghost-primary"
          only-icon="square"
          iconType="si-chevron-left"
          slot="button-prev"
        ></a-button>
        <a-button
          class="swiper-button-next m-card-verticalbutton s-program-recommend__button"
          size="medium"
          bg-color="ghost-primary"
          only-icon="square"
          iconType="si-chevron-right"
          slot="button-next"
        ></a-button>
      </div>
    </section>
  </div>
</template>

<script>
import { Swiper } from 'vue-awesome-swiper';
import { MCard, AButton } from '@cwespb/synergyui';
import './s_program_recommend.scss';

export default {
  name: 's_program_recommend',

  components: {
    Swiper,
    MCard,
    AButton,
  },

  data() {
    return {
      title: 'Другие программы университета',
      baseUrl: process.env.NUXT_ENV_S3BACKET,
      items: [
        {
          id: 1,
          type: 'program',
          title: 'Title',
          description: 'Label',
          iconSrc: 'https://sys3.ru/marketplace/uploads/organizations/yuIYPVAzTpYhkDo2acWAZAMLpIh4LiRGttzzlyFs.svg',
          bottomText: 'Университет Синергия',
        },
        {
          id: 2,
          type: 'program',
          title: 'Title',
          description: 'Label',
          iconSrc: 'https://sys3.ru/marketplace/uploads/organizations/yuIYPVAzTpYhkDo2acWAZAMLpIh4LiRGttzzlyFs.svg',
          bottomText: 'Университет Синергия',
        },
        {
          id: 3,
          type: 'program',
          title: 'Title',
          description: 'Label',
          iconSrc: 'https://sys3.ru/marketplace/uploads/organizations/yuIYPVAzTpYhkDo2acWAZAMLpIh4LiRGttzzlyFs.svg',
          bottomText: 'Университет Синергия',
        },
        {
          id: 4,
          type: 'program',
          title: 'Title',
          description: 'Label',
          iconSrc: 'https://sys3.ru/marketplace/uploads/organizations/yuIYPVAzTpYhkDo2acWAZAMLpIh4LiRGttzzlyFs.svg',
          bottomText: 'Университет Синергия',
        },
        {
          id: 5,
          type: 'program',
          title: 'Title',
          description: 'Label',
          iconSrc: 'https://sys3.ru/marketplace/uploads/organizations/yuIYPVAzTpYhkDo2acWAZAMLpIh4LiRGttzzlyFs.svg',
          bottomText: 'Университет Синергия',
        },
      ],
      swiperOptionA: {
        slidesPerView: 'auto',
        spaceBetween: 16,
        grabCursor: true,
        direction: 'vertical',
        resistance: true,
        resistanceRatio: 0,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          475: {
            spaceBetween: 12,
            direction: 'horizontal',
          },
          991: {
            spaceBetween: 16,
            direction: 'horizontal',
          },
        },
      },
      onlyIcon: 'square-icon',
      bgColor: 'ghost-primary',
    };
  },
  computed: {
    swiper() {
      return this.$refs.awesomeSwiper.swiper;
    },
  },
  methods: {
    onLikeClickHandler() {
      this.$emit('onLikeClick');
    },
  },
};
</script>
