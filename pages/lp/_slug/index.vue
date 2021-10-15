<template>
  <div>
    <header class="s-header-lp l-wide" :class="{ fixed: isScrolled }">
      <div class="s-header-lp__left">
        <nuxt-link to="/" class="s-header__logo-link">
          <a-logo class="s-header-lp__logo" type="standart" :link="logoURL"></a-logo>
        </nuxt-link>
        <h3 class="a-font_XL">Образовательная платформа</h3>
      </div>
      <div class="s-header-lp__phones">
        <a
          class="s-header-lp__phone"
          v-for="(phone, idx) in phones"
          :key="idx"
          :href="`tel:${phone.replace(/[^+\d]/g, '')}`"
        >
          <div class="s-header-lp__phones-icon si-phone-filled"></div>
          <div class="s-header-lp__phones-text a-font_m-s">{{ phone }}</div>
        </a>
      </div>
    </header>

    <div class="l-wide">
      <div class="lp-banner" :style="`background-image: url(${baseURL}${landingDetailInfo.image_src})`">
        <h1 class="lp-banner__title">{{ landingDetailInfo.name }}</h1>
        <div class="lp-banner__description">{{ landingDetailInfo.description }}</div>
      </div>
      <s-catalog-landing :filters="landingDetailInfo.included" :menu="menu" @menu-change="menu = $event" />
      <s-program-form />
    </div>
    <s-footer />
  </div>
</template>

<script>
import { ALogo } from '@cwespb/synergyui';
import SCatalogLanding from '~/components/marketing/s_catalog_landing/s_catalog_landing';
import SProgramForm from '~/components/s_program_form/s_program_form';
import SFooter from '~/components/s_footer/s_footer';
import getLandingDetail from '~/api/landingsDetail';

export default {
  components: {
    SCatalogLanding,
    SProgramForm,
    SFooter,
    ALogo,
  },

  layout: 'empty',

  data() {
    return {
      baseURL: process.env.NUXT_ENV_S3BACKET,
      logoURL: '',
      scrollTop: 0,
      isScrolled: false,
      phones: [],
      menu: false,
    };
  },

  async asyncData({ route }) {
    const request = {
      filter: {
        slug: route.params.slug,
      },
      include: ['formats', 'levels', 'directions', 'cities', 'organizations'],
    };

    const landingDetailInfo = await getLandingDetail(request);
    return {
      landingDetailInfo,
    };
  },

  methods: {
    handleScroll() {
      const mainWrapper = document.querySelector('body');
      const headerHeight = document.querySelector('.s-header-lp').offsetHeight;
      const startPos = window.innerHeight + window.innerHeight / 2;
      this.scrollTop = window.scrollY;

      switch (true) {
        case this.scrollTop > headerHeight:
          this.isScrolled = true;
          mainWrapper.classList.add('js-fixed');

          if (this.scrollTop > startPos) {
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
};
</script>

<style lang="scss">
@import '@/assets/styles/tools/mixins';

.lp-banner {
  position: relative;
  overflow: hidden;
  padding: rem(50) rem(100);
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;
  @media screen and (max-width: 991px) {
    padding: var(--a-padding--x6) var(--a-padding--x8);
  }
  @media screen and (max-width: 767px) {
    padding: var(--a-padding--x8) var(--a-padding--x4);
  }

  &__title {
    max-width: rem(380);
  }

  &__description {
    padding: var(--a-padding--x4) 0 var(--a-padding--x5) 0;
  }
}

.s-header-lp {
  position: relative;
  z-index: 100;
  display: flex;
  align-items: center;
  padding-top: rem(20);
  padding-bottom: rem(20);

  &.fixed {
    position: fixed;
    z-index: 100;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    background: #fff;
    animation: showHeader 0.6s ease;
    .s-header__center-top {
      display: none;
      @media screen and (max-width: 991px) {
        display: block;
      }
    }
  }

  &__left {
    display: flex;
    align-items: center;

    @media screen and (max-width: 767px) {
      display: block;
    }
  }

  &__logo {
    padding-right: rem(40);

    @media screen and (max-width: 767px) {
      padding-right: 0;
      padding-bottom: rem(4);
    }
  }

  &__phones {
    display: flex;
    align-items: center;
    margin-left: auto;

    @media screen and (max-width: 767px) {
      order: 2;
    }
    &-icon {
      display: none;
      @media screen and (max-width: 991px) {
        display: flex;
        justify-content: center;
        align-items: center;
        width: rem(44);
        height: rem(44);
        border: 1px solid var(--a-color_thumbnail);
        border-radius: rem(4);
        &::before {
          font-size: rem(30);
        }
      }
    }

    &-text {
      @media screen and (max-width: 991px) {
        display: none;
      }
    }
  }

  &__phone {
    margin-right: rem(12);
    color: var(--a-color_text);
    font-weight: 600;
    white-space: nowrap;
    text-decoration: none;
    &:last-child {
      margin-right: 0;
      @media screen and (max-width: 991px) {
        display: none;
      }
    }
    @media screen and (max-width: 991px) {
      margin-right: 0;
    }
  }
}
</style>
