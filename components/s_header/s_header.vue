<template>
  <header class="s-header" :class="{ open: isOpen, fixed: isScrolled }">
    <div class="shadow" v-if="isOpen"></div>
    <div class="s-header__wrapper">
      <div class="s-header__center">
        <div class="l-default">
          <div class="s-header__center-wrapper">
            <a-logo type="standart" :link="logoURL"></a-logo>
            <div class="s-header__burger" @click="isOpen = !isOpen">
              <div class="s-header__burger-icon">
                <div class="si-menu" v-if="!isOpen"></div>
                <div class="si-close" v-if="isOpen"></div>
              </div>
              <div class="s-header__burger-text a-font_l a-color_link">{{ btnText }}</div>
            </div>
            <div class="s-header__search">
              <a-input :isSearch="true" size="medium" :placeholder="searchPlaceholder"></a-input>
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
        </div>
      </div>
      <div class="s-header__bottom">
        <div class="l-default">
          <menu-horizontal></menu-horizontal>
        </div>
      </div>
      <s-menu-main :open="isOpen"></s-menu-main>
    </div>
  </header>
</template>

<script>
import { ALogo, AInput } from '@cwespb/synergyui';
import './s_header.scss';
import SMenuMain from '../s_menu_main/s_menu_main';
import MenuHorizontal from '../menu_horizontal/menu_horizontal';

export default {
  name: 'SHeader',

  data() {
    return {
      isOpen: false,
      logoURL: 'assets/svg/logo.svg',
      scrollTop: 0,
      isScrolled: false,
      btnText: 'Всё обучение',
      phones: ['+7 495 800-10-01', '8 800 100-00-11'],
      searchPlaceholder: 'Поиск по сайту',
    };
  },

  components: {
    ALogo,
    AInput,
    MenuHorizontal,
    SMenuMain,
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  methods: {
    handleScroll() {
      this.scrollTop = window.scrollY;
      if (this.scrollTop > 1) {
        this.isScrolled = true;
      } else {
        this.isScrolled = false;
      }
    },
  },
};
</script>
