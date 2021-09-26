<template>
  <div class="l-default">
    <component :is="section" v-for="section in sections" :key="section"></component>
  </div>
</template>

<script>
import '@cwespb/synergyui/lib/synergyui.css';

export default {
  layout: 'organization',

  head: {
    bodyAttrs: {
      class: 'bg-gray',
    },
  },

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
      // 's-university-start',
      's-university-score',
      's-university-statistics',
      's-university-catalog',
      's-program-skills',
      's-program-teacher',
      's-program-timeline',
      's-university-career',
      's-program-diploma',
      's-university-diploma',
      's-partners',
      's-lp-address',
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

<style lang="scss">
.organization-page {
  --layout-v-padding: 3.75rem; // 60px
  --layout-h-padding: 5rem; // 80px
  @media all and (max-width: 1199px) {
    --layout-h-padding: 1.875rem; // 30px
    --layout-v-padding: 2.5rem; // 40px
  }
  @media all and (max-width: 767px) {
    --layout-h-padding: 1rem; // 16px
    --layout-v-padding: 2rem; // 32px
  }
  @media screen and (max-width: 767px) {
    .l-default {
      --layout-padding: 0;
    }
  }
}
</style>
