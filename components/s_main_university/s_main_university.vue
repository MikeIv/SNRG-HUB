<template>
  <section class="s-main-university">
    <div class="l-wide">
      <h2 class="s-main-university__title a-font_h5">{{ title }}</h2>
      <div class="s-main-university__box">
        <template v-for="product in visibleCards">
          <m-card
            :key="product.id"
            :title="product.name"
            :description="product.address"
            :verticalImgSrc="`${baseUrl}/${product.digital_image}`"
            :iconSrc="`${baseUrl}/${product.logo}`"
            :bottomText="product.abbreviation_name"
            type="program"
          />
        </template>
      </div>
      <nuxt-link :to="redirectUrl" class="a-button__wrapper">
        <a-button label="Показать все" size="large" bgColor="accent" />
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import { MCard, AButton } from '@cwespb/synergyui';
import getOrganizationsList from '~/api/organizationsList';
import '@cwespb/synergyui/lib/synergyui.css';
import './s_main_university.scss';

export default {
  name: 'SMainUniversity',

  props: {
    redirectUrl: {
      type: String,
      default: 'google.com',
    },
    methods: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
    },
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

  async fetch() {
    this.cards = await getOrganizationsList();
  },

  mounted() {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('DOMContentLoaded', this.handleResize);
  },

  methods: {
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
    window.removeEventListener('DOMContentLoaded', this.handleResize);
  },

  components: {
    MCard,
    AButton,
  },
};
</script>
