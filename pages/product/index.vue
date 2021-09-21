<template>
  <div>
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
      's-program-start',
      's-program-cpa-line',
      's-program-info',
      's-program-announce',
      's-program-about',
      's-program-exam',
      's-program-people',
      's-program-timeline',
      's-program-skills',
      's-program-content',
      's-program-teacher-horizontal',
      's-program-teacher-vertical',
      's-program-diploma',
      's-program-form',
      's-program-university',
      's-program-reviews',
      's-program-price',
      's-program-questions',
      's-program-recommend',
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
