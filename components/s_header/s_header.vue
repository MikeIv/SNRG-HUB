<template>
  <header class="s-header" :class="{ open: isOpen, fixed: isScrolled }">
    <div class="shadow" v-if="isOpen" @click="handleChange"></div>
    <div class="s-header__wrapper">
      <div class="s-header__top" :class="{ hidden: !isVisible }">
        <m-banner
          :type="bannerTop.banner_type"
          :backgroundColor="bannerTop.color_bg"
          :ImgSrc="baseUrl + bannerTop.image"
          :topTxt="bannerTop.name"
          :href="topBannerSmoothHref"
          buttonLabel="Подобрать"
          color="default"
          @onBannerClick="scrollTo(topBannerSmoothHref)"
        ></m-banner>
      </div>
      <div class="s-header__center">
        <div class="l-wide">
          <div class="s-header__center-wrapper">
            <div class="s-header__center-top">
              <div class="s-header__location">
                <a-button label="Москва" bgColor="none" iconType="si-location-city"></a-button>
              </div>
              <div class="s-header__phones">
                <a
                  class="s-header__phone"
                  v-for="(phone, idx) in phones"
                  :key="idx"
                  :href="`tel:${phone.replace(/[^+\d]/g, '')}`"
                  aria-label="phone"
                >
                  <div class="s-header__phones-icon si-phone-filled"></div>
                  <div class="s-header__phones-text a-font_m-s">{{ phone }}</div>
                </a>
              </div>
            </div>
            <nuxt-link to="/" class="s-header__logo-link">
              <a-logo type="standart" :link="logoURL"></a-logo>
            </nuxt-link>
            <div class="s-header__burger" @click="handleChange">
              <div class="s-header__burger-icon">
                <div class="si-menu" v-if="!isOpen"></div>
                <div class="si-close" v-if="isOpen"></div>
              </div>
              <div class="s-header__burger-text a-font_l a-color_link">{{ btnText }}</div>
            </div>
            <div class="s-header__search">
              <a-input icons="si-search" size="medium" :placeholder="searchPlaceholder"></a-input>
            </div>
            <a href="//pass.synergy.ru" target="_blank" class="s-header__login" rel="noreferrer">
              <a-button label="Войти" bgColor="ghost-accept"></a-button>
            </a>
          </div>
        </div>
        <div class="s-header__bottom">
          <div class="l-wide">
            <menu-horizontal :isOpen="isOpen" @change-is-open="handleChange"></menu-horizontal>
          </div>
        </div>
      </div>
      <s-menu-main :isOpen="isOpen" @change-is-open="handleChange"></s-menu-main>
    </div>
  </header>
</template>

<script>
import {
  ALogo, AInput, AButton, MBanner,
} from '@cwespb/synergyui';
import './s_header.scss';
import SMenuMain from '../s_menu_main/s_menu_main';
import MenuHorizontal from '../menu_horizontal/menu_horizontal';
import getBannersDetail from '~/api/bannersDetail';

export default {
  name: 'SHeader',
  data() {
    return {
      baseUrl: process.env.NUXT_ENV_S3BACKET,
      isOpen: false,
      logoURL: '',
      scrollTop: 0,
      isScrolled: false,
      btnText: 'Всё обучение',
      phones: [],
      searchPlaceholder: 'Поиск по сайту',
      bannerTop: {},
      isVisible: false,
      topBannerSmoothHref: '#quiz',
    };
  },

  components: {
    ALogo,
    AInput,
    AButton,
    MenuHorizontal,
    SMenuMain,
    MBanner,
  },

  async fetch() {
    const request = {
      filter: {
        id: 7,
      },
    };

    this.bannerTop = await getBannersDetail(request);
  },

  created() {
    this.isOpen = this.$store.state.globalData.isMenuOpen;
    this.phones = this.$store.state.globalData.globalData.data.contacts.phones;
    this.logoURL = this.$store.state.globalData.globalData.data.main.logo;
  },

  computed: {
    isMenuOpen() {
      return this.$store.state.isMenuOpen;
    },
    quiz() {
      return this.$store.state.quizInfo;
    },
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll);

    this.$nextTick(() => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      window.addEventListener('resize', () => {
        const vhr = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vhr}px`);
      });
    });
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  methods: {
    handleScroll() {
      const mainWrapper = document.querySelector('body');
      const headerHeight = this.$el.offsetHeight;

      const quizScrollTop = this.$store.state.quizInfo.top + this.$store.state.quizInfo.height;

      const startPos = window.innerHeight + window.innerHeight / 2;
      const clientHeight = window.pageYOffset + window.innerHeight;

      this.scrollTop = window.scrollY;

      switch (true) {
        case this.scrollTop > headerHeight:
          this.isScrolled = true;
          mainWrapper.classList.add('js-fixed');

          if (
            (this.scrollTop > startPos && clientHeight < this.$store.state.quizInfo.top)
            || (this.scrollTop > startPos && this.scrollTop > quizScrollTop)
          ) {
            this.isVisible = true;
          } else {
            this.isVisible = false;
          }

          break;
        default:
          this.isScrolled = false;
          this.isVisible = false;
          mainWrapper.classList.remove('js-fixed');
          break;
      }
    },

    handleChange() {
      this.isOpen = !this.isOpen;
      this.$store.commit('changeIsOpen', this.isOpen);
    },

    scrollTo(link) {
      const quiz = document.querySelector(link);
      const headerHeight = this.$el.offsetHeight;
      const quizPosition = quiz.offsetTop - headerHeight;

      window.scrollTo({
        top: quizPosition,
        behavior: 'smooth',
      });
    },

    getQuiz() {
      console.log(this.$store.state.quizInfo);
      return this.$store.state.quizInfo;
    },
  },
};
</script>
