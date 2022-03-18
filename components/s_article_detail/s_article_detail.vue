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
          <div v-if="readingTime" class="s-article-detail__time">
            <div class="s-article-detail__time-icon">
              <img src="~/assets/images/reading-time.svg" alt="" />
            </div>
            <div class="s-article-detail__time-text a-font_m-s">
              Время чтения <span> {{ readingTime }} </span> {{ readingTimeText }}
            </div>
          </div>

          <div v-if="digitalImage" class="s-article-detail__content-preview">
            <img :src="`${baseURL}${digitalImage}`" alt="" />
          </div>
        </div>
      </div>
      <component
        v-for="(part, index) in partsContent()"
        :key="index"
        :is="part.template"
        :data="part.data"
        :nameCourse="nameCourse"
        :categories="categories"
      ></component>
      <div class="s-article-detail__tags">
        <nuxt-link :to="`/journal/${tag.slug}`" v-for="(tag, id) in tags" :key="id">
          <a-tag :label="`#${tag.name}`" class="s-article-detail__tag"></a-tag>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import './s_article_detail.scss';
import { MSocialShare, ATag } from '@cwespb/synergyui';
import { declOfNum } from '~/assets/js/getDateFromDatesObj';
import AUser from '~/components/_ui/a_user/a_user';

import Acontent from './s_article_detail_content';
import categories from './s_article_detail_categories';
import relatedArticles from './s_article_detail_related_articles';
import contactForm from './s_article_detail_contact_form';
import studyingPrograms from './s_article_detail_programs';

export default {
  name: 's-article-detail',

  components: {
    AUser,
    MSocialShare,
    ATag,

    Acontent,
    categories,
    contactForm,
    relatedArticles,
    studyingPrograms,
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
      return declOfNum(this.user.published, ['публикация', 'публикации', 'публикаций']);
    },

    readingTimeText() {
      return declOfNum(this.readingTime, ['минута', 'минуты', 'минут']);
    },

    splittedContent() {
      const pattern = /\{\{\{(.[^}]+)\}\}\}/g;
      return this.content.length ? this.content.split(pattern) : [];
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
    readingTime: {
      type: Number,
      default: 0,
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
    digitalImage: {
      type: String,
    },
    banner: {
      type: Object,
    },
    categories: {
      type: Array,
    },
    relatedArticles: {
      type: Array,
    },
    tags: {
      type: Array,
    },
    studyingPrograms: {
      type: Array,
    },
    nameCourse: {
      type: String,
    },
    linkCourse: {
      type: String,
    },
  },

  mounted() {},

  created() {
    this.$store.dispatch('getLanderInfo');
  },

  methods: {
    changeMenuState(value) {
      this.isMenuOpen = value;
    },
    toggleMenu() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
          navigator.userAgent,
        ) &&
        navigator.share
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
    goToJournal() {
      this.$router.push(`/journal/${this.categories[0].slug}`);
    },
    partsContent() {
      const result = [];
      this.splittedContent.forEach((element) => {
        const elementName = 'Acontent';

        if (element.match(/shortcode:/)) {
          const elementArrayName = element.split(':')[1];

          result.push({
            template: elementArrayName,
            data: this[elementArrayName],
          });
        } else {
          result.push({
            template: elementName,
            data: element,
          });
        }
      });

      return result;
    },
  },
};
</script>
