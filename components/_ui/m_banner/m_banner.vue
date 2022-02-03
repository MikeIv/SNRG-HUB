<template>
  <div class="m-banner__main-wrapper">
    <div v-if="type === 'top'" :class="typeBanner" @click="href ? onBannerClickHandler() : {}" :style="style">
      <div class="m-banner__img-wrapper" v-if="ImgSrc">
        <picture>
          <source :srcset="ImgSrc" media="(min-width: 991px)" />
          <source :srcset="ImgSrcTablet" media="(min-width: 767px)" />
          <source :srcset="ImgSrcMobile" media="(min-width: 320px)" />
          <img :src="ImgSrc" alt="image" />
        </picture>
      </div>
    </div>

    <div v-if="type === 'narrow'" :class="typeBanner" @click="href ? onBannerClickHandler() : {}" :style="style">
      <div class="m-banner__img-wrapper" v-if="ImgSrc">
        <picture>
          <source :srcset="ImgSrc" media="(min-width: 991px)" />
          <source :srcset="ImgSrcTablet" media="(min-width: 575px)" />
          <source :srcset="ImgSrcMobile" media="(min-width: 320px)" />
          <img :src="ImgSrc" alt="image" />
        </picture>
      </div>
    </div>

    <div v-if="type === 'side'" :class="typeBanner" @click="href ? onBannerClickHandler() : {}" :style="style">
      <div class="m-banner__img-wrapper" v-if="ImgSrc">
        <picture>
          <source :srcset="ImgSrc" media="(min-width: 991px)" />
          <source :srcset="ImgSrcTablet" media="(min-width: 575px)" />
          <source :srcset="ImgSrcMobile" media="(min-width: 320px)" />
          <img :src="ImgSrc || ImgSrcTablet || ImgSrcMobile" alt="image" />
        </picture>
      </div>
    </div>

    <div v-if="type === 'community'" :class="typeBanner" @click="href ? onBannerClickHandler() : {}" :style="style">
      <div class="m-banner__bg-img-wrapper" v-if="ImgBgSrc">
        <img :src="ImgBgSrc" :alt="titleTxt" class="m-banner__bg-img" />
      </div>
      <div :class="textColor">
        <div class="m-banner__txt-right-col">
          <p class="m-banner__txt m-banner__txt--title a-font_h5" :style="{ color: customTextColor }">{{ titleTxt }}</p>
          <p class="m-banner__txt a-font_l-m" :style="{ color: customTextColor }">{{ secondTxt }}</p>
          <a-button class="m-banner__button" size="small" bg-color="accent" :label="buttonLabel"></a-button>
        </div>
      </div>
      <div class="m-banner__img-wrapper" v-if="ImgSrc">
        <img :src="ImgSrc" alt="image" class="m-banner__img" />
      </div>
    </div>

    <div v-if="type === 'app'" :class="typeBanner" @click="href ? onBannerClickHandler() : {}" :style="style">
      <div :class="textColor">
        <div class="m-banner__txt-right-col">
          <p class="m-banner__txt m-banner__txt--title a-font_h5" :style="{ color: customTextColor }">{{ titleTxt }}</p>
          <p class="m-banner__txt a-font_l-m" :style="{ color: customTextColor }">{{ secondTxt }}</p>
          <div v-if="applications.length" class="m-banner__application-block">
            <div class="m-banner__application-list">
              <nuxt-link
                to="application.link"
                v-for="application in applications"
                :key="application.id"
                class="m-banner__application-link"
                target="_blank"
              >
                <img class="m-banner__application-img" :src="application.image" :alt="application.alt" loading="lazy" />
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div class="m-banner__img-wrapper" v-if="ImgSrc">
        <img :src="ImgSrc" alt="image" class="m-banner__img" />
      </div>
    </div>
  </div>
</template>

<script>
import { AButton } from '@cwespb/synergyui';
import './m_banner.scss';

export default {
  name: 'M-banner',
  data() {
    return {
      show: true,
    };
  },
  components: {
    AButton,
  },
  props: {
    href: {
      type: String,
    },
    backgroundColor: {
      type: String,
    },
    customTextColor: {
      type: String,
    },
    ImgSrc: {
      type: String,
    },
    ImgBgSrc: {
      type: String,
    },
    ImgSrcTablet: {
      type: String,
    },
    ImgSrcMobile: {
      type: String,
    },
    leftCol: {
      type: String,
    },
    topTxt: {
      type: String,
    },
    titleTxt: {
      type: String,
    },
    secondTxt: {
      type: String,
    },
    buttonLabel: {
      type: String,
    },
    applications: {
      type: Array,
    },
    type: {
      type: String,
      validator(value) {
        return ['top', 'narrow', 'side', 'community', 'app'].indexOf(value) !== -1;
      },
    },
    bgColor: {
      type: String,
      validator(value) {
        return ['accent', 'primary', 'secondary', 'none'].indexOf(value) !== -1;
      },
    },
    color: {
      type: String,
      validator(value) {
        return ['default', 'white'].indexOf(value) !== -1;
      },
    },
    textCol: {
      type: String,
      validator(value) {
        return ['active', 'none'].indexOf(value) !== -1;
      },
    },
  },

  computed: {
    typeBanner() {
      return {
        'm-banner': true,
        [`m-banner--${this.type}`]: true,
        [`m-banner--${this.bgColor}`]: true,
      };
    },
    textColor() {
      return {
        'm-banner__content': true,
        [`m-banner__content--${this.color}`]: true,
      };
    },
    leftColShow() {
      return {
        [`${this.leftCol}`]: true,
      };
    },
    style() {
      return {
        backgroundColor: this.backgroundColor,
      };
    },
  },

  methods: {
    onBannerClickHandler() {
      this.$emit('onBannerClick', this.href);
    },
  },
};
</script>
