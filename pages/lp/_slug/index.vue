<template>
  <div>
    <header class="s-header-lp l-wide" :class="{ fixed: isScrolled, fixedMobile: isIconInHeader }">
      <div class="s-header-lp__left">
        <nuxt-link to="/" class="s-header__logo-link">
          <a-logo class="s-header-lp__logo" type="standart" :link="logoURL"></a-logo>
        </nuxt-link>
        <h3 class="a-font_XL s-header-lp__left-text">Образовательная платформа</h3>
      </div>
      <div class="s-header-lp__right">
        <i
          class="si-filter s-header-lp__filters-icon"
          :class="{ isVisible: !tabletIconVisible }"
          tabindex="0"
          @click="menu = true"
        />
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
      </div>
    </header>

    <div class="l-wide">
      <div class="lp__banner" :style="`background-color: ${landingDetailInfo.color_bg}`">
        <div class="lp__banner-left">
          <h1 class="lp__banner__title a-font_h1" v-html="landingDetailInfo.name" />
          <div class="lp__banner__descript a-font_l-m" v-html="landingDetailInfo.description" />
        </div>
        <div class="lp__banner-img">
          <img :src="`${baseURL}${landingDetailInfo.image_src}`" alt="" />
        </div>
      </div>

      <s-catalog-landing
        :filters="landingDetailInfo.included"
        :menu="menu"
        :menuFixed="isIconInHeader"
        @menu-change="menu = $event"
      />
      <s-program-form title="Записаться на программу или получить бесплатную консультацию" />
    </div>

    <footer class="footer-lp s-footer__wrap">
      <div class="l-wide">
        <div class="s-footer__row">
          <div class="s-footer__accord a-font_m">
            © <span>{{ year }}</span> Synergy. Все права защищены
          </div>
          <a
            target="_blank"
            class="s-footer__accord a-font_m"
            rel="noreferrer"
            :href="policy.href"
            v-if="policy.text !== ''"
          >
            {{ policy.text }}
          </a>
          <a
            target="_blank"
            class="s-footer__accord a-font_m"
            rel="noreferrer"
            :href="terms.href"
            v-if="terms.text !== ''"
          >
            {{ terms.text }}
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { ALogo } from '@cwespb/synergyui';
import SCatalogLanding from '~/components/marketing/s_catalog_landing/s_catalog_landing';
import SProgramForm from '~/components/s_program_form/s_program_form';
import getLandingDetail from '~/api/landingsDetail';

export default {
  components: {
    SCatalogLanding,
    SProgramForm,
    ALogo,
  },

  layout: 'empty',

  data() {
    return {
      baseURL: process.env.NUXT_ENV_S3BACKET,
      logoURL: '',
      year: '',
      policy: {
        href: '',
        text: '',
      },
      terms: {
        href: '',
        text: '',
      },
      scrollTop: 0,
      currentOption: null,
      isScrolled: false,
      phones: [],
      isIconInHeader: false,
      tabletIconVisible: false,
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
    const options = [];
    landingDetailInfo.included.direction.forEach(({ name, slug }) => {
      options.push({ label: name, value: slug });
    });
    return {
      landingDetailInfo,
      options,
    };
  },

  methods: {
    handleScroll() {
      const mainWrapper = document.querySelector('body');
      const headerHeight = document.querySelector('.s-header-lp')?.offsetHeight;
      this.scrollTop = window.scrollY;

      if (this.scrollTop > headerHeight && document.documentElement.clientWidth > 575) {
        this.isScrolled = true;
        mainWrapper.classList.add('js-fixed');
      } else {
        this.isScrolled = false;
        mainWrapper.classList.remove('js-fixed');
      }

      this.tabletIconVisible = document.documentElement.clientWidth < 767
        && this.scrollTop + 80 > document.getElementById('filtersIcon').offsetTop;

      if (document.documentElement.clientWidth < 575) {
        if (
          document.getElementById('filtersIcon').offsetTop
          && this.scrollTop > document.getElementById('filtersIcon').offsetTop
        ) {
          this.isIconInHeader = true;
        } else {
          this.isIconInHeader = false;
        }
      }
    },
  },

  created() {
    const date = new Date();
    this.year = date.getFullYear();
    this.policy.href = this.$store.state.globalData.globalData.data.privacy_policy.link;
    this.policy.text = this.$store.state.globalData.globalData.data.privacy_policy.text;
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

.footer-lp {
  &.s-footer__wrap {
    padding-top: var(--a-padding--x3);
    padding-bottom: var(--a-padding--x3);

    @media screen and (max-width: 575px) {
      padding-bottom: rem(75);
    }
  }
}

.lp__banner {
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 575px) {
    flex-direction: column;
  }

  &-left {
    width: 50%;
    min-height: rem(430);
    padding: rem(50) rem(100);

    @media screen and (max-width: 991px) {
      padding: var(--a-padding--x6) var(--a-padding--x8);
    }

    @media screen and (max-width: 575px) {
      width: 100%;
      min-height: unset;
      padding: var(--a-padding--x8) var(--a-padding--x4);
    }
  }
  &-img {
    position: relative;
    display: flex;
    width: 50%;

    img {
      position: absolute;
      object-fit: cover;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    @media screen and (max-width: 575px) {
      width: 100%;
      min-height: rem(272);
    }
  }

  &__title {
    max-width: rem(380);
  }
  &__descript {
    padding: var(--a-padding--x4) 0 var(--a-padding--x5) 0;
  }
}

.s-header-lp {
  position: relative;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: rem(20);
  padding-bottom: rem(20);

  @media screen and (max-width: 767px) {
    align-items: flex-start;
    padding-bottom: rem(16);
  }

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

  &.fixedMobile {
    margin-top: rem(35);
  }

  &__left {
    display: flex;
    align-items: center;

    @media screen and (max-width: 767px) {
      display: block;
    }

    &-text {
      white-space: nowrap;
    }
  }

  &__right {
    display: flex;
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
    padding-left: rem(8);

    @media screen and (max-width: 767px) {
      order: 2;
      align-items: flex-start;
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

  &__filters-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.75rem;
    height: 2.75rem;
    border: 1px solid var(--a-color_thumbnail);
    border-radius: 0.25rem;
    cursor: pointer;

    @media screen and (min-width: 768px) {
      display: none;
    }

    &.isVisible {
      display: none;
    }
  }

  &__content {
    display: flex;
    justify-content: space-between;
    width: 100%;

    & .catalog-page-lp__select {
      width: 80%;
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

.js-fixed {
  margin-top: rem(81);
  @media screen and (max-width: 767px) {
    margin-top: rem(103);
  }
}

.js-fixed-mobile {
  margin-top: rem(84);
}
</style>
