<template>
  <header class="s-header" :class="{ open: isOpen, fixed: isScrolled }">
    <div class="shadow" v-if="isOpen" @click="handleChange"></div>
    <div class="s-header__wrapper">
      <div
        v-if="isBannerAvailable"
        class="s-header__top"
        :class="{ hidden: !isVisible }"
        @click="scrollTo(topBannerSmoothHref)"
      >
        <m-banner
          :type="bannerTop.banner_type"
          :backgroundColor="bannerTop.color_bg"
          :ImgSrc="baseUrl + bannerTop.image"
          :ImgSrcTablet="baseUrl + bannerTop.image_tablet"
          :ImgSrcMobile="baseUrl + bannerTop.image_mobile_phone"
          :topTxt="bannerTop.name"
          :href="topBannerSmoothHref"
          @onBannerClick="scrollTo(topBannerSmoothHref)"
        ></m-banner>
      </div>
      <div class="s-header__center">
        <div class="l-wide">
          <div class="s-header__center-wrapper">
            <!-- <div class="s-header__center-top">
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
            </div> -->
            <nuxt-link to="/" class="s-header__logo-link">
              <img :src="logoURL" alt="" @click="onLogoClickHandler" />
            </nuxt-link>
            <AButton
              class="s-header__search-btn"
              onlyIcon="square"
              iconType="si-search"
              @click="searchButtonClickHandler"
            />
            <div class="s-header__burger" @click="handleChange">
              <div class="s-header__burger-icon">
                <div class="si-menu" v-if="!isOpen"></div>
                <div class="si-close" v-if="isOpen"></div>
              </div>
              <div class="s-header__burger-text a-font_l a-color_link">{{ btnText }}</div>
            </div>
            <div class="s-header__search" v-if="searchIsVisible || !isMobile">
              <a-input
                id="search"
                icons="si-search"
                size="medium"
                :placeholder="searchPlaceholder"
                v-model="search"
                :disabled="disabledSearch"
              />
            </div>
            <div class="s-header__login" v-if="!$store.getters['auth/isAuthenticated']">
              <AButton size="medium" label="Войти" bgColor="accent" @click="login" />
            </div>
            <div class="s-header__is-auth" v-else>
              <!-- <AButton onlyIcon="square" bgColor="none" iconType="si-heart" size="small" />
              <AButton
                class="s-header__icons-bell notice"
                onlyIcon="square"
                bgColor="none"
                iconType="si-bell"
                size="small"
              /> -->
              <MUserMenu />
            </div>
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
          <div class="l-wide s-header__bottom-row">
            <div class="s-header__location">
              <MLocation />
            </div>
            <menu-horizontal
              class="s-header__menu-horizontal"
              :customList="navLinks"
              :isOpen="isOpen"
              @change-is-open="handleChange"
            ></menu-horizontal>
          </div>
        </div>
      </div>
      <s-menu-main :isOpen="isOpen" @change-is-open="handleChange"></s-menu-main>
    </div>
  </header>
</template>

<script>
import { AInput, AButton, ASelect } from '@cwespb/synergyui';
import './s_header.scss';
import MBanner from '~/components/_ui/m_banner/m_banner';
import MUserMenu from '~/components/_ui/m_usermenu/m_usermenu';
import getBannersDetail from '~/api/bannersDetail';
import { debounce } from '~/assets/js/debounce';
import MLocation from '../_ui/m_location/m_location';
import SMenuMain from '../s_menu_main/s_menu_main';
import MenuHorizontal from '../menu_horizontal/menu_horizontal';

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

    banner: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      baseUrl: process.env.NUXT_ENV_S3BACKET,
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
      disabledSearch: false,
      isOpen: false,
      navLinks: null,
      searchIsVisible: false,
      isMobile: false,
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
    MUserMenu,
  },

  async fetch() {
    const request = {
      filter: {
        id: 7,
      },
    };

    this.bannerTop = await getBannersDetail(request);
    /* const educationLinks = await getMenuData();
    this.navLinks = [
      { anchor: 'Образование', links: educationLinks, active: false },
      { anchor: 'Учебные заведения', link: '/organizations' },
      { anchor: 'Журнал', link: '/journal' },
      { anchor: 'Тесты', link: '/proftest' },
      { anchor: 'Специальности', link: '#' },
      { anchor: 'Профессии', link: '#' },
      { anchor: 'Вебинары', link: '#' },
      { anchor: 'Сравнения', link: '#' },
    ]; */
  },

  created() {
    this.isOpen = this.$store.state.isMenuOpen;
    this.phones = this.$store.state.globalData.globalData.data.contacts.phones;
    this.logoURL = this.$store.state.globalData.globalData.data.main.logo;
  },

  computed: {
    isMenuOpen() {
      return this.isOpen;
    },
    quiz() {
      return this.$store.state.quizInfo;
    },
    isBannerAvailable() {
      return this.banner;
    },
  },

  watch: {
    $route: {
      deep: true,
      handler() {
        if (!this.$route.query.search) {
          this.search = '';
          this.$emit('search', '');
        } else {
          this.search = this.$route.query.search;
        }
      },
    },

    search() {
      this.debounceSearchListener();
    },
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.isMobile = window.innerWidth < 768;
    this.$nextTick(() => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      window.addEventListener('resize', () => {
        const vhr = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vhr}px`);
      });
    });

    if (this.$route.query.search) {
      this.search = this.$route.query.search;
    }
    this.handleScroll();
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
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
        this.disabledSearch = true;
        setTimeout(() => {
          this.disabledSearch = false;
        }, 700);
        this.search = '';
        this.$emit('search', '');
        this.$router.push({
          query: {},
        });
      } else {
        this.$emit('search', this.search.trim());
        this.$router.push({
          query: {
            search: this.search.trim(),
          },
        });
      }
    }, 2000),
    onLogoClickHandler() {
      this.search = '';
      this.$emit('search', '');
    },
    handleScroll() {
      const mainWrapper = document.querySelector('body');
      const headerHeight = this.$el.offsetHeight;

      const quizScrollTop = this.$store.state.quizInfo.top + this.$store.state.quizInfo.height;

      const startPos = window.innerHeight;
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

    login() {
      this.$store.dispatch('auth/login');
    },

    logout() {
      this.$store.dispatch('auth/logout');
    },

    searchButtonClickHandler() {
      this.searchIsVisible = !this.searchIsVisible;
    },
  },
};
</script>
