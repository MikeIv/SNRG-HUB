<template>
  <header class="s-header" :class="{ open: isOpen, fixed: isScrolled }">
    <div class="shadow" v-if="isOpen" @click="handleChange"></div>
    <div class="s-header__wrapper">
      <div class="s-header__top" :class="{ hidden: !isVisible }" @click="topBannerClick()">
        <m-banner
          :type="bannerTop.banner_type"
          :backgroundColor="bannerTop.color_bg"
          :ImgSrc="baseUrl + bannerTop.image"
          :topTxt="bannerTop.name"
          :href="topBannerSmoothHref"
          buttonLabel="Подобрать"
          color="default"
          @onBannerClick="topBannerClick()"
        ></m-banner>
      </div>
      <div class="s-header__center">
        <div class="l-wide">
          <div class="s-header__center-wrapper">
            <div class="s-header__center-top">
              <div class="s-header__location">
                <MLocation />
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
              <img :src="logoURL" alt="" @click="onLogoClickHandler" />
            </nuxt-link>
            <div class="s-header__burger" @click="handleChange">
              <div class="s-header__burger-icon">
                <div class="si-menu" v-if="!isOpen"></div>
                <div class="si-close" v-if="isOpen"></div>
              </div>
              <div class="s-header__burger-text a-font_l a-color_link">{{ btnText }}</div>
            </div>
            <div class="s-header__search">
              <a-input id="search" icons="si-search" size="medium" :placeholder="searchPlaceholder" v-model="search" />
            </div>
            <a href="//pass.synergy.ru" target="_blank" class="s-header__login" rel="noreferrer" v-if="false">
              <a-button label="Войти" bgColor="ghost-accept"></a-button>
            </a>
          </div>
          <template v-if="catalog && isScrolled">
            <div class="s-header__catalog-icons">
              <a-select :options="options" class="catalog-page__select" @change="changeSortOption" />
              <i
                class="si-filter a-font_button catalog-page__filters-icon"
                tabindex="0"
                @click="filtersIconClickHandler"
              >
                <span class="a-font_button">Фильтры</span>
              </i>
            </div>
          </template>
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
  AInput, AButton, MBanner, ASelect,
} from '@cwespb/synergyui';
import './s_header.scss';
import MLocation from '../_ui/m_location/m_location';
import SMenuMain from '../s_menu_main/s_menu_main';
import MenuHorizontal from '../menu_horizontal/menu_horizontal';
import getBannersDetail from '~/api/bannersDetail';
import { debounce } from '~/assets/js/debounce';

export default {
  name: 'SHeader',

  props: {
    catalog: {
      type: Boolean,
      default: false,
    },

    options: {
      type: Array,
    },
  },

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
      search: '',
      bannerTop: {},
      isVisible: false,
      topBannerSmoothHref: '#quiz',
    };
  },

  components: {
    AInput,
    AButton,
    MLocation,
    MenuHorizontal,
    SMenuMain,
    MBanner,
    ASelect,
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

  watch: {
    $route: {
      deep: true,
      handler() {
        this.search = '';
        this.$emit('search', '');
      },
    },

    search() {
      this.debounceSearchListener();
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

    document.getElementById('search').addEventListener('keypress', this.handleSearch);

    this.search = this.$route.query.search;
    this.handleScroll();
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('keypress', this.handleSearch);
  },

  methods: {
    changeSortOption(option) {
      const options = [
        { label: this.options.find((elem) => elem.value === option).label, value: option },
        ...this.options.filter((elem) => elem.value !== option),
      ];

      this.$emit('change-sort-option', options, option);
    },

    filtersIconClickHandler() {
      this.$emit('menu-toggle', true);
    },

    debounceSearchListener: debounce(function debounceHandler() {
      if (!this.search) {
        this.search = '';
        this.$emit('search', '');
        window.history.pushState({}, null, `${window.location.pathname}`);
      }
      if (this.search.length >= 5) {
        this.$emit('search', this.search.trim());
        window.history.pushState({}, null, `${window.location.pathname}?search=${this.search.trim()}`);
      } else if (this.search.length < 5) {
        window.history.pushState({}, null, `${window.location.pathname}`);
      }
    }, 500),
    onLogoClickHandler() {
      this.search = '';
      this.$emit('search', '');
    },

    handleSearch(e) {
      if (e.key === 'Enter') {
        this.$emit('search', this.search.trim());
        window.history.pushState({}, null, `${window.location.pathname}?search=${this.search.trim()}`);
      }
    },

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
          if (this.catalog) {
            mainWrapper.classList.add('js-fixed-catalog');
          } else {
            mainWrapper.classList.add('js-fixed');
          }

          this.isVisible = (this.scrollTop > startPos && clientHeight < this.$store.state.quizInfo.top)
            || (this.scrollTop > startPos && this.scrollTop > quizScrollTop);

          break;
        default:
          this.isScrolled = false;
          this.isVisible = false;
          mainWrapper.classList.remove('js-fixed', 'js-fixed-catalog');
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
      return this.$store.state.quizInfo;
    },
    topBannerClick() {
      this.$router.push('/proftest');
    },
  },
};
</script>
