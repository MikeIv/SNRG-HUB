<template>
  <header class="s-header" :class="{ open: isOpen }">
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
            <div class="s-header__burger-spans"><span></span><span></span><span></span></div>
            <div class="s-header__burger-text a-font_l a-color_link">Всё обучение</div>
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
  </header>
</template>

<script>
import { MBanner, MenuHorizontal, ALogo } from '@cwespb/synergyui';
import './s_header.scss';

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
    MenuHorizontal,
  },
};
</script>
