<template>
  <div class="l-default">
    <LazyHydrate v-for="section in sections" :key="section" when-visible>
      <component :is="section"></component>
    </LazyHydrate>
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration';

export default {
  components: {
    LazyHydrate,
  },

  // middleware: 'getPageInfo',
  middleware: 'parseUtms',

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
    pageMeta() {
      return this.$store.state.pageMeta;
    },
  },
  head() {
    return {
      title: this.pageMeta?.title,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.pageMeta?.keywords,
        },
        {
          hid: 'description',
          name: 'description',
          content: this.pageMeta?.description,
        },
        {
          hid: 'og:type',
          name: 'og:type',
          content: 'website',
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.pageMeta?.title,
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: 'Synergyeducation',
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.pageMeta?.description,
        },
      ],
      bodyAttrs: {
        class: 'bg-gray',
      },
    };
  },
};
</script>

<style lang="scss" scoped>
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
