<template>
  <section class="s-main-university s-padding">
    <div class="l-wide l-border-radius">
      <h2 class="s-main-university__title a-font_h5">{{ title }}</h2>
      <div class="s-main-university__box">
        <template v-for="product in visibleCards">
          <nuxt-link :to="`organization/${product.slug}`" :key="product.id" class="m-card-program__wrapper">
            <m-card
              :title="product.name"
              :description="product.included.city.name"
              :verticalImgSrc="`${baseUrl}${product.digital_image}`"
              :iconSrc="`${baseUrl}${product.logo}`"
              :bottomText="product.abbreviation_name"
              type="program"
              @organization-click="onOrganizationClick(product)"
            />
          </nuxt-link>
        </template>
      </div>

      <nuxt-link to="/organizations" class="a-button__wrapper s-main-university__btn-link">
        <a-button label="Показать все" size="large" bgColor="accent" @click="goToOrganizations" />
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import { MCard, AButton } from '@cwespb/synergyui';
import getOrganizationsList from '~/api/organizationsList';
import './s_main_university.scss';

export default {
  name: 'SMainUniversity',

  components: {
    MCard,
    AButton,
  },

  data() {
    return {
      cards: [],
      visibleCountDesktop: 6,
      visibleCountMobile: 3,
      baseUrl: process.env.NUXT_ENV_S3BACKET,
      windowWidth: 0,
    };
  },

  props: ['methods', 'title'],

  async fetch() {
    let [expandedMethod] = this.methods;
    expandedMethod = { ...expandedMethod.data };
    expandedMethod.include = ['city'];
    const response = await getOrganizationsList(expandedMethod);
    this.cards = response.data;
  },

  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },

  methods: {
    goToOrganizations() {
      this.$router.push('/organizations/');
    },

    onOrganizationClick(product) {
      this.$router.push(`/organization/${product.slug}`);
    },

    handleResize() {
      this.windowWidth = window.innerWidth;
    },
  },

  computed: {
    visibleCards() {
      if (this.windowWidth > 767) {
        return this.cards.slice(0, this.visibleCountDesktop);
      }
      return this.cards.slice(0, this.visibleCountMobile);
    },
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>
