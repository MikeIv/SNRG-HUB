<template>
  <div>
    <SHeader
      @search="search = $event"
      :catalog="true"
      :options="options"
      @change-sort-option="changeSortOptions"
      @menu-toggle="menuToggle"
    />
    <SProductSearch v-if="search" :search="search" @search-clear="clearSearch" />
    <s-catalog
      v-else
      :pageInfo="pageInfo"
      :currentOption="currentOption"
      :options="options"
      :filtersMenu="filtersMenu"
      @change-sort-options="changeSortOptions"
      @menu-toggle="menuToggle"
    />
    <LazyHydrate when-visible>
      <SFooter />
    </LazyHydrate>
    <MobileButton />
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration';
import SHeader from '~/components/s_header/s_header';
import SCatalog from '~/components/s_catalog/s_catalog';
import MobileButton from '~/components/mobile_button/mobile_button';
import SProductSearch from '~/components/s_product_search/s_product_search';

export default {
  middleware: ['getPageInfo', 'parseUtms'],

  layout: 'empty',

  components: {
    MobileButton,
    SHeader,
    SProductSearch,
    SCatalog,
    SFooter: () => import('~/components/s_footer/s_footer'),
    LazyHydrate,
  },

  data() {
    return {
      title: 'Catalog page',
      search: '',
      filtersMenu: false,
      currentOption: 'sort',
      options: [
        {
          label: 'Популярные',
          value: 'sort',
        },
        {
          label: 'Новые',
          value: '-id',
        },
        {
          label: 'По алфавиту А-Я',
          value: 'name',
        },
        {
          label: 'По алфавиту Я-А',
          value: '-name',
        },
      ],
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
    };
  },

  methods: {
    menuToggle(value) {
      this.filtersMenu = value;
    },

    changeSortOptions(options, option) {
      this.options = options;
      this.currentOption = option;
    },

    clearSearch() {
      this.search = '';
    },
  },
};
</script>
<style lang="scss" scoped>
iframe {
  display: none;
  visibility: hidden;
}
</style>
