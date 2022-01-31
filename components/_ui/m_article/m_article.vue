<template>
  <nuxt-link :to="`/article/${article.slug}`" class="m-article">
    <div class="m-article__image">
      <img alt="article" :src="`${baseURL}${article.included.journalContent.preview_picture}`" />
      <div class="m-article__tag" :style="{ background: randomColor }">
        {{ article.included.tags[0].name }}
      </div>
    </div>
    <div class="m-article__info-additional">
      <span class="m-article__info-additional-type" @click="onTypeClickHandler(article.included.publicationTypes[0])">
        #{{ article.included.publicationTypes[0].name.toUpperCase() }}
      </span>
      <span class="m-article__info-additional-date">
        {{ date }}
      </span>
    </div>
    <div class="m-article__info">
      <h6 class="a-font_xl-m m-article__info-title">{{ article.title }}</h6>
      <p class="a-font_m m-article__info-description">{{ article.included.journalContent.preview_text }}</p>
    </div>
  </nuxt-link>
</template>

<script>
import './m_article.scss';

export default {
  name: 'MArticle',

  data() {
    return {
      baseURL: process.env.NUXT_ENV_S3BACKET,
      date: '',
    };
  },

  props: {
    article: {
      type: Object,
    },

    randomColor: {
      type: String,
    },
  },

  mounted() {
    const options = { month: 'long', day: 'numeric' };
    const today = new Date(this.article.created_at);

    this.date = today.toLocaleString('ru-Ru', options);
  },
};
</script>
