<template>
  <section class="s-footer">
    <div class="s-footer__row s-footer__row--top">
      <nuxt-link to="/" class="s-footer__top-logo" aria-label="linkLogoAlt">
        <img class="s-footer__logo-default" :src="linkLogo" :alt="linkLogoAlt" loading="lazy" />
      </nuxt-link>

      <div v-if="socials.length" class="s-footer__socials-block">
        <p class="s-footer__socials-title a-font_m">{{ socialsTitle }}</p>
        <div class="s-footer__socials-list">
          <a
            v-for="social in socials"
            :key="social.id"
            :href="social.href"
            rel="noreferrer"
            target="_blank"
            class="s-footer__socials-link"
            :aria-label="`${
              social.icon === 'si-social-vk'
                ? 'Vkontakte'
                : social.icon === 'si-social-facebook'
                ? 'Facebook'
                : social.icon === 'si-social-youtube'
                ? 'Youtube'
                : social.icon === 'si-social-instagram'
                ? 'Instagram'
                : social.icon === 'si-social-whatsapp'
                ? 'Whatsapp'
                : ''
            }`"
          >
            <i :class="social.icon"></i>
          </a>
        </div>
      </div>

      <div v-if="applications.length" class="s-footer__application-block">
        <p class="s-footer__application-title a-font_m">{{ applicationsTitle }}</p>
        <div class="s-footer__application-list">
          <nuxt-link
            to="application.link"
            v-for="application in applications"
            :key="application.id"
            rel="noreferrer"
            class="s-footer__application-link"
            target="_blank"
          >
            <img class="s-footer_application-img" :src="application.image" :alt="application.alt" loading="lazy" />
          </nuxt-link>
        </div>
      </div>
    </div>

    <div class="s-footer__nav" v-if="this.$slots.nav">
      <slot name="nav"></slot>
    </div>
    <MenuBottom :year="year" :policy="policy" :terms="terms" />
  </section>
</template>

<script>
import MenuBottom from '@/components/menu_bottom/menu_bottom';
import './S-footer.scss';

export default {
  name: 'S-footer',

  data() {
    return {
      year: '',
    };
  },
  components: {
    MenuBottom,
  },
  props: {
    socials: {
      type: Array,
    },
    applications: {
      type: Array,
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
    terms: {
      type: Object,
    },
    policy: {
      type: Object,
    },
    adresses: {
      type: Object,
    },
    schedules: {
      type: Object,
    },
    phones: {
      type: Array,
    },
    categoryLinks: {
      type: Array,
    },
    buttonLabel: {
      type: String,
      default: 'Задать вопрос',
    },
    buttonBgColor: {
      type: String,
      default: 'ghost-primary',
    },
    type: {
      type: String,
    },
  },
  created() {
    const date = new Date();

    this.year = date.getFullYear();
  },

  methods: {
    onBtnClickHandler() {
      this.$emit('onBtnClick');
    },
  },
};
</script>
