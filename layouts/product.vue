<template>
  <div class="product-page">
    <SHeader />
    <Nuxt />
    <SQuiz :quiz-id="2" />
    <SFooter />
  </div>
</template>

<script>
import SHeader from '~/components/s_header/s_header';
import SFooter from '~/components/s_footer/s_footer';
import SQuiz from '~/components/s_quiz/s_quiz';

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
    SQuiz,
    SHeader,
    SFooter,
  },
};
</script>
