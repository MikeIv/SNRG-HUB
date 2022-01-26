<template>
  <div class="s-article-detal">
    <div class="s-article-detail__head">
      <div class="s-article-detail__user"></div>
    </div>
    <div class="s-article-detail__body" v-html="content"></div>
  </div>
</template>

<script>
import './s_article_detail.scss';

export default {
  name: 's-article-detail',

  components: {},

  data() {
    return {
      baseURL: process.env.NUXT_ENV_S3BACKET,
    };
  },

  props: {
    content: {
      type: Object,
    },
  },
};
</script>
