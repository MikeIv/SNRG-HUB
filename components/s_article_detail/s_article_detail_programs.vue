<template>
  <div class="s-article-detail__programs" v-if="data.length">
    <h3 class="s-article-detail__programs-title">Лучшие программы по направлению "{{ nameCourse }}"</h3>
    <swiper :options="swiperOptions" class="s-article-detail__programs-slider">
      <swiper-slide class="s-article-detail__program" v-for="(program, id) in data" :key="id">
        <nuxt-link :to="`/product/${program.slug}`">
          <m-card
            type="program"
            :verticalImgSrc="baseURL + program.preview_image"
            :title="program.name"
            :description="program.description"
            :bottomText="program.included.organization.name"
            :iconSrc="baseURL + program.included.organization.logo"
          ></m-card>
        </nuxt-link>
      </swiper-slide>
    </swiper>
    <a-button
      size="large"
      label="Показать все"
      bgColor="accent"
      class="s-article-detail__programs-btn"
      @click="goToJournal"
    ></a-button>
  </div>
</template>

<script>
import { MCard, AButton } from '@cwespb/synergyui';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

export default {
  name: 's-article-detail-programs',
  components: {
    Swiper,
    SwiperSlide,
    AButton,
    MCard,
  },
  props: {
    nameCourse: {
      type: String,
    },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    categories: {
      type: Array,
    },
  },
  data() {
    return {
      baseURL: process.env.NUXT_ENV_S3BACKET,
      swiperOptions: {
        slidesPerView: 'auto',
        spaceBetween: 20,
        resistance: true,
        resistanceRatio: 0,
      },
    };
  },
  methods: {
    goToJournal() {
      this.$router.push(`/catalog/${this.categories[0].slug}`);
    },
  },
};
</script>
