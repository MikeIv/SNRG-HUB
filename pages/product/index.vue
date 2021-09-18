<template>
  <div class="container">
    <component :is="section" v-for="section in sections" :key="section"></component>
  </div>
</template>

<script>
import '@cwespb/synergyui/lib/synergyui.css';

export default {
  components: {},

  middleware: 'getPageInfo',

  data() {
    return {};
  },

  asyncData() {
    // Массив имен для component :is будет формироваться от бэка
    // На данный момент там имена неправильные, поэтому хардкод
    // А так мы их будем брать из pageInfo.components и у объекта ключ "key"
    const sections = [
      // 's-program-start',
      's-program-cpa-line',
      's-program-info',
      's-program-free',
      's-program-about',
      's-program-min-points',
      's-program-for-who',
      's-program-training',
      's-program-skills',
      's-program-content',
      's-program-teacher-horizontal',
      's-program-teacher-vertical',
      's-program-reviews',
      's-program-questions',
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
