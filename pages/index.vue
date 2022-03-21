<template>
  <main>
    <SSearchHome />
    <SBannerTop />
    <LazyHydrate :key="id" v-for="{ key, methods, options, title, id, view_type } in pageInfo.components" when-visible>
      <component
        :is="key"
        :methods="methods"
        :optionsSection="options"
        :title="view_type !== 'quiz' ? title : null"
        :viewType="view_type"
      ></component>
    </LazyHydrate>
    <SPartners :methods="pageInfo.components[11].methods" :title="pageInfo.components[11].title" />
    <SBannerTop />
  </main>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration';
import SPartners from '~/components/s_partners/s_partners';

export default {
  middleware: ['getPageInfo', 'parseUtms'],

  components: {
    SPartners,
    LazyHydrate,
  },
  data() {
    return {
      title: 'Home page',
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
  created() {
    this.$store.dispatch('getLanderInfo');
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
    };
  },
};
</script>
