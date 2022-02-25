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
      <div class="s-article-detail__programs" v-if="programs.length">
        <h3 class="s-article-detail__programs-title">Лучшие программы по направлению "{{ nameCourse }}"</h3>
        <swiper :options="swiperOptions" class="s-article-detail__programs-slider">
          <swiper-slide class="s-article-detail__program" v-for="(program, id) in programs" :key="id">
            <nuxt-link :to="`/catalog/${program.slug}`">
              <m-card
                type="program"
                :verticalImgSrc="baseURL + program.preview_image"
                :title="program.name"
                :description="program.included.directions[0].name"
                :bottomText="program.included.organization.name"
                :iconSrc="baseURL + program.included.organization.logo"
              ></m-card>
            </nuxt-link>
          </swiper-slide>
        </swiper>
        <a-button size="large" label="Показать все" bgColor="accent" class="s-article-detail__programs-btn"></a-button>
      </div>
      <div class="s-article-detail__directions" v-if="categories.length">
        <div class="s-article-detail__directions-title a-font_h5">Направления в сфере {{ nameCourse }}</div>
        <div class="s-article-detail__directions-items">
          <nuxt-link :to="`/journal/${category.slug}`" v-for="(category, id) in categories" :key="id">
            <a-tag :label="category.name" class="s-article-detail__directions-item"> </a-tag>
          </nuxt-link>
        </div>
      </div>
      <div class="s-article-detail__releative" v-if="relatedArticles.length">
        <h3 class="s-article-detail__releative-title">Статьи по теме {{ nameCourse }}</h3>
        <swiper :options="swiperOptionsArticles" class="s-article-detail__releative-slider">
          <swiper-slide
            class="s-article-detail__releative-item"
            v-for="(relatedArticle, id) in relatedArticles"
            :key="id"
          >
            <m-article :article="relatedArticle"></m-article>
          </swiper-slide>
        </swiper>
      </div>
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
import {
  MSocialShare, ATag, MCard, AButton,
} from '@cwespb/synergyui';
import AUser from '~/components/_ui/a_user/a_user';
import MArticle from '~/components/_ui/m_article/m_article';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

export default {
  name: 's-article-detail',

  components: {
    AUser,
    MSocialShare,
    ATag,
    MArticle,
    AButton,
    MCard,
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      baseURL: process.env.NUXT_ENV_S3BACKET,
      isMenuOpen: false,
      article: {
        social: [],
        city: '',
      },
      swiperOptions: {
        slidesPerView: 'auto',
        spaceBetween: 20,
        resistance: true,
        resistanceRatio: 0,
      },
      swiperOptionsArticles: {
        slidesPerView: 'auto',
        spaceBetween: 24,
        resistance: true,
        resistanceRatio: 0,
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
    programs: {
      type: Array,
    },
    nameCourse: {
      type: String,
    },
    linkCourse: {
      type: String,
    },
  },

  mounted() {
    console.log(this.relatedArticles);
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
