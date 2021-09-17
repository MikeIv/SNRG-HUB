<template>
  <div class="catalog-page__wrapper">
    <component :is="section" v-for="section in sections" :key="section"></component>
  </div>
</template>

<script>
export default {
  middleware: 'getPageInfo',

  asyncData() {
    // Массив имен для component :is будет формироваться от бэка
    // На данный момент там имена неправильные, поэтому хардкод
    // А так мы их будем брать из pageInfo.components и у объекта ключ "key"
    const sections = ['s-program-numbers'];

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
