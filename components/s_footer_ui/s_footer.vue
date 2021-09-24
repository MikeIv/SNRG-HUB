<template>
  <div class="s-footer">
    <div class="s-footer__top-row">
      <nuxt-link to="/" class="s-footer__top-logo">
        <img class="s-footer__logo-default" :src="linkLogo" :alt="linkLogoAlt" />
      </nuxt-link>

      <div v-if="socials.length" class="s-footer__socials-block">
        <p class="s-footer__socials-title a-font_m">{{ socialsTitle }}</p>
        <div class="s-footer__socials-list">
          <a
            v-for="social in socials"
            :key="social.id"
            :href="social.href"
            target="_blank"
            class="s-footer__socials-link"
          >
            <i :class="social.icon"></i>
          </a>
        </div>
      </div>

      <div v-if="applications.length" class="s-footer__application-block">
        <p class="s-footer__application-title a-font_m">{{ applicationsTitle }}</p>
        <div class="s-footer__application-list">
          <nuxt-link
            to="/"
            v-for="application in applications"
            :key="application.id"
            class="s-footer__application-link"
          >
            <img class="s-footer_application-img" :src="application.link" :alt="application.alt" />
          </nuxt-link>
        </div>
      </div>
    </div>
    <!-- <nav v-if="navigation.length" class="s-footer__nav-list">
      <nuxt-link
        v-for="nav in navigation"
        :key="nav.id"
        :to="nav.href"
        target="_blank"
        class="s-footer__nav-link a-font_button"
        >{{ nav.navItem }}
      </nuxt-link>
    </nav> -->
    <div class="s-footer__nav-list">
      <slot></slot>
    </div>

    <div class="s-footer__bottom-row">
      <nuxt-link v-for="accord in accords" :key="accord.id" :to="accord.href" class="s-footer__accord a-font_m"
        >{{ accord.title }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import './s_footer.scss';

export default {
  name: 'SFooter',

  data() {
    return {

    };
  },
  props: {
    navigation: {
      type: Array,
    },
    socials: {
      type: Array,
    },
    applications: {
      type: Array,
    },
    accords: {
      type: Array,
      required: true,
    },
    linkLogo: {
      type: String,
    },
    linkLogoAlt: {
      type: String,
    },
    socialsTitle: {
      type: String,
    },
    applicationsTitle: {
      type: String,
    },
  },
  computed: {},
  methods: {},
};
</script>
