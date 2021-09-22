<template>
  <div class="container">
    <div>
      <h1 class="title">{{ pageInfo.name }}</h1>
    </div>

    <s-quiz
      :methodsData="{ filter: { id: 1 } }"
      :imageFon="require(`~/assets/images/m-banner--quiz.png`)"
      :image="require(`~/assets/images/quiz-podbor_02.png`)"
    >
    </s-quiz>

    <nuxt-link to="/product">TO PRODUCT PAGE</nuxt-link>
    <br />
    <h2>DATA FROM EXAMPLE:</h2>
    <example />
    <br />
    <h2>PAGE INFO:</h2>
    <component :is="section" v-for="section in sections" :key="section"></component>
    <!--    <component-->
    <!--      :is="section.key"-->
    <!--      v-for="section in pageInfo.components"-->
    <!--      :key="section"-->
    <!--      :section.methods-->
    <!--    ></component>-->
    <pre>
      {{ pageInfo }}
    </pre>
  </div>
</template>

<script>
import Example from '~/components/Example';

import SQuiz from '~/components/s_quiz/s_quiz';

export default {
  components: {
    Example,
    SQuiz,
  },

  middleware: 'getPageInfo',

  asyncData() {
    // Массив имен для component :is будет формироваться от бэка
    // На данный момент там имена неправильные, поэтому хардкод
    // А так мы их будем брать из pageInfo.components и у объекта ключ "key"
    const sections = [
      's-main-topics',
      's-main-statistics',
      's-main-programs',
      's-main-search',
      's-main-university',
      's-main-success',
      's-main-banners',
      's-main-banners-narrow',
      's-banner',
    ];

    return {
      sections,
    };
  },

  computed: {
    pageInfo() {
      return this.$store.state.pageInfo;
    },
  },
};
</script>
