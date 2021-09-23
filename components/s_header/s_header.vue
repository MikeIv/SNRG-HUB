<template>
  <header class="s-header" :class="{ open: isOpen }">
    <div class="shadow" v-if="isOpen"></div>
    <div class="s-header__wrapper">
      <div class="s-header__top">
        <m-banner
          bgColor="primary"
          topTxt="Подберите программу обучения"
          type="top"
          ImgSrc="https://placeimg.com/200/200/people"
        ></m-banner>
      </div>
      <div class="s-header__center">
        <div class="l-default">
          <div class="s-header__center-wrapper">
            <a-logo type="standart" link=""></a-logo>
            <div class="s-header__burger" @click="isOpen = !isOpen">
              <div class="s-header__burger-icon">
                <div class="si-menu" v-if="!isOpen"></div>
                <div class="si-close" v-if="isOpen"></div>
              </div>
              <div class="s-header__burger-text a-font_l a-color_link">Всё обучение</div>
            </div>
            <div class="s-header__search">
              <a-input :isSearch="true" size="medium" placeholder="Поиск по сайту"></a-input>
            </div>
            <div class="s-header__phones">
              <a class="s-header__phone" href="tel:+74958001001">
                <div class="s-header__phones-icon si-phone"></div>
                <div class="s-header__phones-text a-font_m-s">+7 495 800-10-01</div>
              </a>
              <a class="s-header__phone s-header__phones-text a-font_m-s" href="tel:88001000011">8 800 100-00-11</a>
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
import { MBanner, ALogo, AInput } from '@cwespb/synergyui';
import './s_header.scss';
import SMenuMain from '../s_menu_main/s_menu_main';
import MenuHorizontal from '../menu_horizontal/menu_horizontal';

export default {
  name: 'SHeader',

  data() {
    return {
      isOpen: false,
    };
  },

  components: {
    MBanner,
    ALogo,
    AInput,
    MenuHorizontal,
    SMenuMain,
  },
};
</script>
