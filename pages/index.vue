<template>
  <div class="container">
    <div>
      <h1 class="title">{{ pageInfo.name }}</h1>
    </div>
    <nuxt-link to="/product">TO PRODUCT PAGE</nuxt-link>
    <br />
    <h2>DATA FROM EXAMPLE:</h2>
    <example />
    <!-- <sProgramAnnounce />
    <sProgramTimeline />
    <sProgramDiploma />
    <sProgramReviews />
    <sProgramRecommend /> -->

    <br />
    <h2>PAGE INFO:</h2>
    <!-- <component :is="section" v-for="section in sections" :key="section"></component> -->
    <!-- <component
      :is="key"
      v-for="{ key, methods, title, id } in pageInfo.components"
      :key="id"
      :methods="methods"
      :title="title"
    ></component> -->
    <pre>
      {{ pageInfo }}
    </pre>
  </div>
</template>

<script>
import Example from '~/components/Example';
// import sProgramRecommend from '~/components/s_program_recommend/s_program_recommend.vue';
// import sProgramDiploma from '~/components/s_program_diploma/s_program_diploma.vue';
// import sProgramReviews from '~/components/s_program_reviews/s_program_reviews.vue';
// import sProgramAnnounce from '~/components/s_program_announce/s_program_announce.vue';
// import sProgramTimeline from '~/components/s_program_timeline/s_program_timeline.vue';

export default {
  components: {
    Example,
    // sProgramRecommend,
    // sProgramDiploma,
    // sProgramReviews,
    // sProgramAnnounce,
    // sProgramTimeline,
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
      's-partners',
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
