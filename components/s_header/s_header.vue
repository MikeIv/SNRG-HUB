<template>
  <header class="s-header" :class="{ open: isOpen, fixed: isScrolled }">
    <div class="shadow" v-if="isOpen" @click="isOpen = !isOpen"></div>
    <div class="s-header__wrapper">
      <div class="s-header__center">
        <div class="l-wide">
          <div class="s-header__center-wrapper">
            <div class="s-header__center-top">
              <div class="s-header__location">
                <a-button label="Москва" bgColor="none" iconType="si-chevron-down"></a-button>
              </div>
              <div class="s-header__phones">
                <a
                  class="s-header__phone"
                  v-for="(phone, idx) in phones"
                  :key="idx"
                  :href="`tel:${phone.replace(/[^+\d]/g, '')}`"
                >
                  <div class="s-header__phones-icon si-phone"></div>
                  <div class="s-header__phones-text a-font_m-s">{{ phone }}</div>
                </a>
              </div>
            </div>
            <nuxt-link to="/" class="s-header__logo-link">
              <a-logo type="standart" :link="logoURL"></a-logo>
            </nuxt-link>
            <div class="s-header__burger" @click="isOpen = !isOpen">
              <div class="s-header__burger-icon">
                <div class="si-menu" v-if="!isOpen"></div>
                <div class="si-close" v-if="isOpen"></div>
              </div>
              <div class="s-header__burger-text a-font_l a-color_link">{{ btnText }}</div>
            </div>
            <div class="s-header__search">
              <a-input icons="si-search" size="medium" :placeholder="searchPlaceholder"></a-input>
            </div>
            <a href="//pass.synergy.ru" target="_blank" class="s-header__login">
              <a-button label="Войти" bgColor="ghost-accept"></a-button>
            </a>
          </div>
        </div>
        <div class="s-header__bottom">
          <div class="l-wide">
            <menu-horizontal></menu-horizontal>
          </div>
        </div>
      </div>
      <s-menu-main :open="isOpen"></s-menu-main>
    </div>
  </header>
</template>

<script>
import { ALogo, AInput, AButton } from '@cwespb/synergyui';
import './s_header.scss';
import SMenuMain from '../s_menu_main/s_menu_main';
import MenuHorizontal from '../menu_horizontal/menu_horizontal';

export default {
  name: 'SHeader',
  data() {
    return {
      isOpen: false,
      logoURL: '',
      scrollTop: 0,
      isScrolled: false,
      btnText: 'Всё обучение',
      phones: [],
      searchPlaceholder: 'Поиск по сайту',
    };
  },

  components: {
    ALogo,
    AInput,
    AButton,
    MenuHorizontal,
    SMenuMain,
  },

  created() {
    this.phones = this.$store.state.globalData.globalData.data.contacts.phones;
    this.logoURL = this.$store.state.globalData.globalData.data.main.logo;
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  methods: {
    handleScroll() {
      const mainWrapper = document.querySelector('main');
      const headerHeight = document.querySelector('.s-header').offsetHeight;

      this.scrollTop = window.scrollY;
      if (this.scrollTop > headerHeight) {
        this.isScrolled = true;
        mainWrapper.classList.add('js-fixed');
      } else {
        this.isScrolled = false;
        mainWrapper.classList.remove('js-fixed');
      }
    },
  },
};
</script>
