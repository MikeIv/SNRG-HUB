<template>
  <div class="container">
    <div>
      <h1 class="title">{{ pageInfo.name }}</h1>
    </div>

    <br />
    <h2>Banner:</h2>
    <s-banner />
    <br />
    <h2>PAGE INFO:</h2>
    <!-- <component :is="section" v-for="section in sections" :key="section"></component> -->
    <component
      :is="key"
      v-for="{ key, methods, title, id } in pageInfo.components"
      :key="id"
      :methods="methods"
      :title="title"
    ></component>
    <pre>
      {{ pageInfo }}
    </pre>
  </div>
</template>

<script>
import SBanner from '~/components/s_banner/s_banner';

export default {
  components: { SBanner },

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
