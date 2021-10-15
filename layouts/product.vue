<template>
  <div class="product-page">
    <SHeader :refs="this.$children" />
    <Nuxt />
    <LazyHydrate when-visible>
      <SQuiz :quiz-id="2" />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <SFooter />
    </LazyHydrate>
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration';
import SHeader from '~/components/s_header/s_header';

export default {
  head() {
    return {
      link: [
        {
          rel: 'canonical',
          href: `${this.$config.SITE_URL}${this.$route.path}`,
        },
      ],
    };
  },

  components: {
    SHeader,
    SQuiz: () => import('~/components/s_quiz/s_quiz'),
    SFooter: () => import('~/components/s_footer/s_footer'),
    LazyHydrate,
  },
};
</script>
