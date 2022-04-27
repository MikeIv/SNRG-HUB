<template>
  <nuxt-link :to="`/article/${article.slug}`" class="m-article">
    <div class="m-article__image">
      <img alt="article" :src="`${baseURL}${article.included.journalContent.preview_picture}`" />
      <nuxt-link
        v-if="article.included.directions"
        :to="`/journal/${article.included.directions[0].slug}`"
        class="m-article__tag"
        :style="{ background: randomColor }"
      >
        {{ article.included.directions[0] ? article.included.directions[0].name : '' }}
      </nuxt-link>
    </div>
    <div class="m-article__additional">
      <nuxt-link
        v-if="article.included.publicationTypes"
        :to="`/journal/${getArticleSlug(article)}`"
        class="m-article__info-additional-type"
      >
        {{ article.included.publicationTypes[0] ? `#${article.included.publicationTypes[0].name.toUpperCase()}` : '' }}
      </nuxt-link>
      <span class="m-article__additional-date">
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
      default: 'rgba(228, 43, 43, 1)',
    },
  },

  methods: {
    getArticleSlug(article) {
      return article?.included?.publicationTypes[0]?.slug || 'stati';
    },
  },

  mounted() {
    const options = { month: 'long', day: 'numeric' };
    const today = new Date(this.article.created_at);

    this.date = today.toLocaleString('ru-Ru', options);
  },
};
</script>
