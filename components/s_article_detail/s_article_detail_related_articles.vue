<template>
  <div class="s-article-detail__releative" v-if="data.length">
    <h3 class="s-article-detail__releative-title">Статьи по теме {{ nameCourse }}</h3>
    <swiper :options="swiperOptionsArticles" class="s-article-detail__releative-slider">
      <swiper-slide class="s-article-detail__releative-item" v-for="(relatedArticle, id) in data" :key="id">
        <m-article :article="relatedArticle"></m-article>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import MArticle from '~/components/_ui/m_article/m_article';

export default {
  name: 's-article-detail-related-articles',
  components: {
    Swiper,
    SwiperSlide,
    MArticle,
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
  },
  data() {
    return {
      swiperOptionsArticles: {
        slidesPerView: 'auto',
        spaceBetween: 24,
        resistance: true,
        resistanceRatio: 0,
      },
    };
  },
};
</script>
