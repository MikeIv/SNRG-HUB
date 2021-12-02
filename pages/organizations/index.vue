<template>
  <div>
    <noscript
      ><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WPTVBRG" height="0" width="0"></iframe
    ></noscript>
    <SHeader
      @search="search = $event"
      :catalog="true"
      :options="options"
      @change-sort-option="changeSortOptions"
      @menu-toggle="menuToggle"
    />
    <SProductSearch v-if="search" :search="search" @search-clear="clearSearch" />
    <s-organizations
      v-else
      :currentOption="currentOption"
      :options="options"
      :filtersMenu="filtersMenu"
      @change-sort-options="changeSortOptions"
      @menu-toggle="menuToggle"
    />
    <LazyHydrate when-visible>
      <SFooter />
    </LazyHydrate>
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration';
import SOrganizations from '~/components/s_organizations/s_organizations';
import SHeader from '~/components/s_header/s_header';
import SProductSearch from '~/components/s_product_search/s_product_search';

export default {
  layout: 'empty',

  data() {
    return {
      search: '',
      filtersMenu: false,
      currentOption: '-id',
      options: [
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
        {
          label: 'По адресу +',
          value: 'address',
        },
        {
          label: 'По адресу -',
          value: '-address',
        },
      ],
    };
  },

  head() {
    return {
      link: [
        {
          rel: 'canonical',
          href: `${this.$config.SITE_URL}${this.$route.path}`,
        },
      ],
    };
  },

  components: {
    SHeader,
    SProductSearch,
    SFooter: () => import('~/components/s_footer/s_footer'),
    LazyHydrate,
    SOrganizations,
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
