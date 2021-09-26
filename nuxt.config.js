export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'marketplace-vue',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { hid: 'keywords', name: 'keywords', content: '' },
      { name: 'theme-color', content: '#fff' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    ],
    link: [
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicons/favicon.ico' },
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      {
        rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png',
      },
      {
        rel: 'icon', sizes: '32x32', href: '/favicon-32x32.png', type: 'image/png',
      },
      { rel: 'apple-touch-icon-precomposed', href: '/apple-touch-icon-precomposed.png' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-touch-icon-57x57.png' },
      { rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-touch-icon-60x60.png' },
      { rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-touch-icon-72x72.png' },
      { rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-touch-icon-76x76.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-touch-icon-114x114.png' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-touch-icon-120x120.png' },
      { rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-touch-icon-144x144.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-touch-icon-152x152.png' },
      { rel: 'apple-touch-icon', sizes: '167x167', href: '/apple-touch-icon-167x167.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon-180x180.png' },
      { rel: 'apple-touch-icon', sizes: '1024x102', href: '/apple-touch-icon-1024x1024.png' },
    ],
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
};
