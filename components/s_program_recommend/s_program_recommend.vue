<template>
  <section class="s-program-recommend">
    <div class="l-default">
      <div class="s-program-recommend__wrapper">
        <h2 class="s-program-recommend__title a-font_h5">{{ title }}</h2>
        <div class="s-program-recommend__swiper">
          <swiper class="swiper" :options="swiperOption">
            <MCard
              v-for="item in items"
              :key="item.id"
              :type="item.type"
              :date="item.date"
              :title="item.title"
              :description="item.description"
              :bottomText="item.bottomText"
              :iconSrc="item.iconSrc"
              class="swiper-slide"
              :class="si - heart"
              @onLikeClick="onLikeClickHandler"
            />
          </swiper>
          <a-button
            class="swiper-button-prev m-card-verticalbutton s-program-recommend__button"
            size="medium"
            bg-color="ghost-primary"
            only-icon="square"
            iconType="si-chevron-left"
            :class="si - chevron - left"
            slot="button-prev"
          ></a-button>
          <a-button
            class="swiper-button-next m-card-verticalbutton s-program-recommend__button"
            size="medium"
            bg-color="ghost-primary"
            only-icon="square"
            iconType="si-chevron-right"
            :class="si - chevron - right"
            slot="button-next"
          ></a-button>
        </div>
      </div>
    </div>
  </section>
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
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 16,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          767: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          991: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
        },
      },
      onlyIcon: 'square-icon',
      bgColor: 'ghost-primary',
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  methods: {
    onLikeClickHandler() {
      this.$emit('onLikeClick');
    },
  },
};
</script>
