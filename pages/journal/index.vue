<template>
  <div>
    <SHeader
      @search="search = $event"
      :catalog="true"
      :options="options"
      @change-sort-option="changeSortOptions"
      @menu-toggle="menuToggle"
    />
    <SProductSearch v-if="search" :search="search" />
    <s-journal
      v-else
      :currentOption="currentOption"
      :options="options"
      :filtersMenu="filtersMenu"
      @change-sort-options="changeSortOptions"
      @menu-toggle="menuToggle"
      @clear-filters="clearFilters"
    />
    <LazyHydrate when-visible>
      <SFooter />
    </LazyHydrate>
    <MobileButton />
    <Popups />
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration';
import SHeader from '~/components/s_header/s_header';
import SJournal from '~/components/s_journal/s_journal';
import MobileButton from '~/components/mobile_button/mobile_button';
import SProductSearch from '~/components/s_product_search/s_product_search';
import Popups from '~/components/popups/popups';

export default {
  layout: 'empty',

  components: {
    MobileButton,
    SHeader,
    SProductSearch,
    SJournal,
    SFooter: () => import('~/components/s_footer/s_footer'),
    LazyHydrate,
    Popups,
  },

  data() {
    return {
      title: 'Journal page',
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
          value: 'title',
        },
        {
          label: 'По алфавиту Я-А',
          value: '-title',
        },
      ],
    };
  },

  computed: {
    pageMeta() {
      return this.$store.state.pageMeta;
    },
    pageInfo() {
      return this.$store.state.pageInfo;
    },
  },

  methods: {
    clearFilters() {
      this.filtersMenu = false;
    },

    menuToggle(value) {
      this.filtersMenu = value;
    },

    changeSortOptions(options, option) {
      this.options = options;
      this.currentOption = option;
    },
  },
};
</script>
