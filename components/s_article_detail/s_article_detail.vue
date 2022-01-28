<template>
  <div class="s-article-detail">
    <div class="l-default">
      <div class="s-article-detail__head">
        <div v-if="user" class="s-article-detail__user">
          <AUser />
        </div>
        <div class="s-article-detail__btn">
          <AButton label="Подписаться" />
        </div>
      </div>
      <div class="s-article-detail__body">
        <div class="s-article-detail__top">
          <div class="s-article-detail__top-theme"></div>
          <nuxt-link to="/" class="s-article-detail__top-tag">
            {{ tag }}
          </nuxt-link>
          <div class="s-article-detail__top-date">
            {{ dateArticle }}
          </div>
          <div class="s-article-detail__top-share">
            <i data-v-6f01a058="" tabindex="0" class="si-share">
              <MSocialShare />
            </i>
          </div>
        </div>
        <div class="s-article-detail__content">
          <h1 class="s-article-detail__content-title a-font_h1">
            {{ title }}
          </h1>
          <div class="s-article-detail__content-subtitle a-font_xl">
            {{ subtitle }}
          </div>
          <div v-if="publicationTypes.readingTime" class="s-article-detail__time">
            <div class="s-article-detail__time-icon">
              <img src="/time.svg" alt="" />
            </div>
            <div class="s-article-detail__time-text a-font_m-s">
              Время чтения <span> {{ publicationTypes.readingTime }} </span>
            </div>
          </div>
          <div class="s-article-detail__content-body" v-html="content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './s_article_detail.scss';
import { AButton, MSocialShare } from '@cwespb/synergyui';
import AUser from '~/components/_ui/a_user/a_user';

export default {
  name: 's-article-detail',

  components: {
    AButton,
    AUser,
    MSocialShare,
  },

  data() {
    return {
      baseURL: process.env.NUXT_ENV_S3BACKET,
      tag: '',
      dateArticle: '',
    };
  },

  props: {
    content: {
      type: String,
    },
    title: {
      type: String,
    },
    publicationTypes: {
      type: Object,
    },
    date: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    user: {
      type: String,
    },
  },

  mounted() {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();

    this.dateArticle = today.toLocaleString('ru-Ru', options);
    this.tag = `#${this.publicationTypes.name}`;
  },
};
</script>
