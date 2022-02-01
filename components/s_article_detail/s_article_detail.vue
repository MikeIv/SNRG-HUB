<template>
  <div class="s-article-detail">
    <div class="l-default">
      <div class="s-article-detail__head">
        <div v-if="user" class="s-article-detail__user">
          <AUser :user="user" :publicationString="publicationString" />
        </div>
      </div>
      <div class="s-article-detail__body">
        <div class="s-article-detail__top">
          <div class="s-article-detail__top-theme"></div>
          <div v-if="publicationTypes && publicationTypes.name" class="s-article-detail__top-tag">
            {{ `#${publicationTypes.name}` }}
          </div>
          <div v-if="date" class="s-article-detail__top-date">
            {{ date }}
          </div>
          <div class="s-article-detail__top-share">
            <div class="s-article-detail__top-icons">
              <i v-if="shareIcon" class="si-share s-article-detail__top-icon" @click.stop="toggleMenu" tabindex="0" />
              <i v-if="favoriteIcon" class="si-heart s-article-detail__top-icon" @click="onHeartClickHandler" />
            </div>
            <m-social-share
              :is-menu-open="isMenuOpen"
              :networks="article.social"
              :title="title"
              :description="subtitle"
              :image="previewImage"
              @changeMenuState="changeMenuState"
            />
          </div>
        </div>
        <div class="s-article-detail__content">
          <h1 v-if="title" class="s-article-detail__content-title a-font_h1">
            {{ title }}
          </h1>
          <div v-if="subtitle" class="s-article-detail__content-subtitle a-font_xl">
            {{ subtitle }}
          </div>
          <div v-if="publicationTypes && publicationTypes.readingTime" class="s-article-detail__time">
            <div class="s-article-detail__time-icon">
              <img src="/time.svg" alt="" />
            </div>
            <div class="s-article-detail__time-text a-font_m-s">
              Время чтения <span> {{ publicationTypes.readingTime }} </span>
            </div>
          </div>
          <div v-if="subtitle" class="s-article-detail__content-body" v-html="content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './s_article_detail.scss';
import { MSocialShare } from '@cwespb/synergyui';
import AUser from '~/components/_ui/a_user/a_user';

export default {
  name: 's-article-detail',

  components: {
    AUser,
    MSocialShare,
  },

  data() {
    return {
      baseURL: process.env.NUXT_ENV_S3BACKET,
      isMenuOpen: false,
      article: {
        social: [],
        city: '',
      },
    };
  },

  computed: {
    publicationString() {
      if (this.user.published > 1 && this.user.published < 5) return 'публикации';
      if (this.user.published >= 5) return 'публикаций';
      return 'публикация';
    },
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
      type: Object,
    },
    shareIcon: {
      type: Boolean,
      default: true,
    },
    favoriteIcon: {
      type: Boolean,
      default: false,
    },
    previewImage: {
      type: String,
    },
  },

  methods: {
    changeMenuState(value) {
      this.isMenuOpen = value;
    },
    toggleMenu() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
          navigator.userAgent,
        )
        && navigator.share
      ) {
        navigator.share({
          title: this.title,
          url: document.location.href,
        });
      } else {
        this.isMenuOpen = !this.isMenuOpen;
        if (this.isMenuOpen) {
          this.$nextTick(() => {
            document.addEventListener('click', this.hideMenu);
          });
        }
      }
    },
    hideMenu() {
      this.isMenuOpen = false;
      document.removeEventListener('click', this.hideMenu);
    },
    onHeartClickHandler() {
      this.$emit('heart-click');
    },
    signUpClickHandler() {
      this.$emit('sign-up');
    },
  },
};
</script>
