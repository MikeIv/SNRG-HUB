/* eslint-disable max-len */
export default {
  debug: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Образовательный маркетплейс',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
      { hid: 'description', name: 'description', content: '' },
      { hid: 'keywords', name: 'keywords', content: '' },
      { name: 'theme-color', content: '#fff' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      { name: 'facebook-domain-verification', content: 'atdvtw6d85otyx0d40jrqjmjjr1iq3' },
    ],
    link: [
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      { rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-icon-57x57.png' },
      { rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-icon-60x60.png' },
      { rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-icon-72x72.png' },
      { rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-icon-76x76.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-icon-114x114.png' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-icon-120x120.png' },
      { rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-icon-144x144.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-icon-152x152.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-icon-180x180.png' },
      { rel: 'icon" type="image/png', sizes: '192x192', href: '/android-icon-192x192.png' },
      { rel: 'icon" type="image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon" type="image/png', sizes: '96x96', href: '/favicon-96x96.png' },
      { rel: 'icon" type="image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'msapplication-TileColor', content: '#ffffff' },
      { rel: 'msapplication-TileImage', content: '/ms-icon-144x144.png' },
      { rel: 'theme-color', content: '#ffffff' },
      { rel: 'preconnect', href: 'https://mp.synergy.ru' },
      { rel: 'preconnect', href: 'https://connect.facebook.net' },
    ],
    __dangerouslyDisableSanitizers: ['script'],
    script: [
      {
        type: 'text/javascript',
        // eslint-disable-next-line quotes
        innerHTML: `var _mtm = window._mtm = window._mtm || [];_mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];g.type='text/javascript'; g.async=true; g.src='https://matomo.synergy.ru/js/container_3be7G1HM.js'; s.parentNode.insertBefore(g,s);`,
      },
      {
        type: 'text/javascript',
        // eslint-disable-next-line quotes
        innerHTML: `var _paq = window._paq = window._paq || [];_paq.push(['trackPageView']);_paq.push(['enableLinkTracking']);(function(){ var u="https://matomo.synergy.ru/"; _paq.push(['setTrackerUrl', u+'matomo.php']); _paq.push(['setSiteId', '1']); var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0]; g.type='text/javascript'; g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s); })();`,
      },
    ],

  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    './assets/styles/main.scss',
    '@cwespb/synergyui/lib/synergyui.css',
    'swiper/css/swiper.min.css',
    'vue-tel-input/dist/vue-tel-input.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/vue-awesome-swiper', mode: 'client' },
    { src: '@/plugins/lander.js', mode: 'client' },
    { src: '@/plugins/gtm.js', mode: 'client' },
  ],

  redirect: [
    {
      from: '^(\\/[^\\?]*[^\\/])(\\?.*)?$',
      to: '$1/$2',
    },
  ],

  router: {
    middleware: 'trailingSlashRedirect',
    trailingSlash: true,
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    'nuxt-compress',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/redirect-module',
    ['@synergy/synergyid-adapter', {
      namespace: 'auth',
      brokerBackendUrl: 'https://api.synergyhub.ru/',
      synergyIdBackendUrl: 'https://pass.synergy.ru/',
      synergyIdDomain: 'https://pass.synergy.ru/',
    },
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios

  axios: {
    debug: true,
  },

  loading: '~/components/s_loader/s_loader',

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  env: {
    NUXT_ENV_S3BACKET: process.env.NUXT_ENV_S3BACKET,
    SITE_FB_PIXEL: process.env.SITE_FB_PIXEL,
    SITE_GTM: process.env.SITE_GTM,
    DADATA_KEY: process.env.DADATA_KEY,
  },

  publicRuntimeConfig: {
    SITE_URL: process.env.SITE_URL,
  },

};
