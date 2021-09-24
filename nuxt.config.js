export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'marketplace-vue',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['./assets/styles/main.scss', '@cwespb/synergyui/lib/synergyui.css', 'swiper/css/swiper.min.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/vue-awesome-swiper', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://github.com/nuxt-community/robots-module
    '@nuxtjs/robots',
    // https://github.com/nuxt-community/yandex-metrika-module
    '@nuxtjs/yandex-metrika',
    // https://github.com/nuxt-community/gtm-module
    '@nuxtjs/gtm',
    // https://www.npmjs.com/package/nuxt-facebook-pixel-module
    'nuxt-facebook-pixel-module',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  publicRuntimeConfig: {
    axios: {
      baseURL: 'https://mp.synergy.ru',
    },
  },

  axios: {
    https: true,
    debug: false,
    headers: {
      common: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/json',
      },
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  env: {
    NUXT_ENV_S3BACKET: 'https://sys3.ru/marketplace/',
  },

  // robots.txt
  robots: {
    UserAgent: '*',
    Disallow: '/',
  },

  // Yandex metrika
  yandexMetrika: {
    id: 'XXXXXXX',
    // accurateTrackBounce: true,
    // childIframe: true,
    // clickmap: true,
    // defer: true,
    // ecommerce: true,
    // params: true,
    // userParams: true,
    // trackHash: true,
    // trackLinks: true,
    // trustedDomains: true,
    // type: true,
    // ut: true,
    webvisor: true,
    // triggerEvent: true,
  },

  // GTM
  gtm: {
    id: 'GTM-XXXXXXX',
  },

  // Facebook pixel
  facebook: {
    /* module options */
    track: 'PageView',
    pixelId: 'XXXXXXX',
    autoPageView: true,
    disabled: false,
  },
};
