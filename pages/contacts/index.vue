<template>
  <div class="l-default">
    <component :is="section" v-for="section in sections" :key="section"></component>
  </div>
</template>

<script>
export default {
  head: {
    bodyAttrs: {
      class: 'bg-gray',
    },
  },

  components: {},

  // middleware: 'getPageInfo',

  data() {
    return {};
  },

  asyncData() {
    // Массив имен для component :is будет формироваться от бэка
    // На данный момент там имена неправильные, поэтому хардкод
    // А так мы их будем брать из pageInfo.components и у объекта ключ "key"
    const sections = [
      // 's-university-start',
      's-contacts-main',
      's-contacts-address',
      's-contacts-form',
      's-contacts-about',
      's-contats-note',
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
section {
  padding: var(--a-padding--x15) var(--a-padding--x20);
  @media screen and (max-width: 991px) {
    padding: var(--a-padding--x10) var(--a-padding--x8);
  }
  @media screen and (max-width: 767px) {
    padding: var(--a-padding--x10) var(--a-padding--x4);
  }
}
.l-default {
  @media screen and (max-width: 767px) {
    padding: 0;
  }
}
</style>
