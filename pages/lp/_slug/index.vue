<template>
  <div>
    <header class="s-header" :class="{ open: isOpen }">
      <div>
        <nuxt-link to="/" class="s-header__logo-link">
          <a-logo type="standart" :link="logoURL"></a-logo>
        </nuxt-link>
        <h3>Образовательная платформа</h3>
      </div>
      <div class="s-header__phones">
        <a
          class="s-header__phone"
          v-for="(phone, idx) in phones"
          :key="idx"
          :href="`tel:${phone.replace(/[^+\d]/g, '')}`"
        >
          <div class="s-header__phones-icon si-phone-filled"></div>
          <div class="s-header__phones-text a-font_m-s">{{ phone }}</div>
        </a>
      </div>
    </header>

    <div class="l-wide">
      <div class="lp-banner" :style="`background-image: url(${baseURL}${landingDetailInfo.image_src})`">
        <h1 class="lp-banner__title">{{ landingDetailInfo.name }}</h1>
        <div class="lp-banner__description">{{ landingDetailInfo.description }}</div>
      </div>
      <s-catalog-landing :filters="landingDetailInfo.included" />
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
    SCatalogLanding, SProgramForm, SFooter, ALogo,
  },

  layout: 'empty',

  data() {
    return {
      baseURL: process.env.NUXT_ENV_S3BACKET,
      logoURL: '',
      scrollTop: 0,
      isScrolled: false,
      phones: [],
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

  created() {
    this.phones = this.$store.state.globalData.globalData.data.contacts.phones;
    this.logoURL = this.$store.state.globalData.globalData.data.main.logo;
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
</style>
