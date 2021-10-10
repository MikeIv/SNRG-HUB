<template>
  <section class="s-main-search">
    <div class="l-wide">
      <div class="s-main-search__box">
        <h2 class="s-main-search__title a-font_h5" v-html="title">Search</h2>

        <div class="s-main-search__row" v-for="row in getAllItems" :key="row.id">
          <div class="s-main-search__category a-font_l">{{ row.name }}</div>
          <div class="s-main-search__items">
            <template v-for="item in row.items">
              <nuxt-link
                :to="`catalog?page=1&${extractQueryParams(row, item)}`"
                class="s-main-search__item"
                v-if="item.isActive"
                :key="item.id"
              >
                <div class="s-main-search__item-title a-font_l-m">
                  <span>{{ item.name }}</span>
                </div>
                <div class="s-main-search__item-count a-font_m">{{ item.count }}</div>
              </nuxt-link>
            </template>

            <div
              v-if="row.items.length >= maxLinksCount"
              :class="[{ 'is-open': row.isOpen }, 's-main-search__item s-main-search__item--btn']"
            >
              <AButton
                @click="
                  toggleItems(row);
                  toggleBtnClass(row);
                "
                size="small"
                class="a-font_l"
                bgColor="none"
                addIcon="fonts-icon"
                iconPosition="right"
                :iconType="row.isOpen ? 'si-chevron-up' : 'si-chevron-down'"
                :label="row.isOpen ? 'Свернуть' : 'Еще программы'"
              />
            </div>
          </div>
        </div>

        <nuxt-link to="/catalog" class="s-main-search__btn-link">
          <AButton size="large" bgColor="accent" :label="`Показать предложения`" />
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import { AButton } from '@cwespb/synergyui';
import getProductsMain from '~/api/productsMain';
import './s_main_search.scss';

export default {
  name: 'SMainSearch',

  data() {
    return {
      rows: [],
      windowWidth: null,
      maxLinksCount: null,
      desktopLinksCount: 24,
      tabletLinksCount: 19,
      mobileLinksCount: 23,
      desktopBreakPoint: 1500,
      mobileBreakPoint: 768,
      buttonClass: false,
      btnIconType: false,
    };
  },

  props: {
    methods: {
      type: Array,
    },
    title: {
      type: String,
    },
  },

  watch: {
    windowWidth() {
      if (this.windowWidth >= this.desktopBreakPoint) {
        this.maxLinksCount = this.desktopLinksCount;
      }

      if (this.windowWidth < this.desktopBreakPoint) {
        this.maxLinksCount = this.tabletLinksCount;
      }

      if (this.windowWidth < this.mobileBreakPoint) {
        this.maxLinksCount = this.mobileLinksCount;
      }
    },
  },

  computed: {
    getAllItems() {
      const linkToRows = this.rows;

      linkToRows.forEach((row) => {
        const linkToRow = row;
        linkToRow.items.forEach((item, i) => {
          if (i < this.maxLinksCount) {
            this.$set(item, 'isActive', true);
          } else {
            this.$set(item, 'isActive', false);
          }
        });
        this.$set(row, 'isOpen', false);
      });

      return linkToRows;
    },
  },

  async fetch() {
    let [expandedMethod] = this.methods;
    expandedMethod = { ...expandedMethod.data };
    this.rows = await getProductsMain(expandedMethod);
  },

  methods: {
    toggleItems(elems) {
      const { items } = elems;
      items.forEach((item, i) => {
        const linkToItem = item;
        if (elems.isOpen && i + 1 > this.maxLinksCount) {
          linkToItem.isActive = false;
        } else {
          linkToItem.isActive = true;
        }
      });
    },

    toggleBtnClass(elems) {
      const linkToRow = elems;
      linkToRow.isOpen = !linkToRow.isOpen;
    },

    handleResize() {
      this.windowWidth = window.innerWidth;
    },

    extractQueryParams(params, item) {
      return `${params.filter_by}=${item.id}`;
    },
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },

  mounted() {
    this.windowWidth = window.innerWidth;
    window.addEventListener('resize', this.handleResize);
  },

  components: {
    AButton,
  },
};
</script>
