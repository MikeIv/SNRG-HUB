<template>
  <section class="s-main-search">
    <div class="l-wide">

      <div class="s-main-search__box">
      <h2 class="s-main-search__title a-font_h5">s-main-search {{ title }}</h2>
      <div class="s-main-search__row" v-for="row in rows" :key="row.id">
        <div class="s-main-search__category a-font_l">{{ row.name }}</div>
        <div class="s-main-search__items">

          <template v-for="(item) in row.items" >
            <div class="s-main-search__item" v-if="item.isActive" :key="item.id">
              <div class="s-main-search__item-title a-font_l-m"><span>{{ item.name }}</span></div>
              <div class="s-main-search__item-count a-font_m">{{ item.count }}</div>
            </div>
          </template>

          <div
          v-if="row.items.length >= visibleCount"
          :class="[{ 'is-open' : row.isOpen },
          's-main-search__item s-main-search__item--btn']"
          >
            <AButton
              @onClickBtn="toggleItems(row); toggleBtnClass(row)"
              size = 'small'
              class="a-font_l"
              bgColor = 'none'
              addIcon = 'fonts-icon'
              iconPosition = 'right'
              :iconType="row.isOpen ? 'si-chevron-up' : 'si-chevron-down'"
              :label="row.isOpen ? 'Свернуть' : 'Еще программы'"
            />
          </div>
        </div>
      </div>

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

  props: {
    redirectUrl: {
      type: String,
      default: '#',
    },
    methods: {
      type: Array,
    },
    title: {
      type: String,
    },
  },

  mounted() {
    this.rows.forEach((row) => {
      const el = row;
      el.items.forEach((item, i) => {
        if (i < this.visibleCount) {
          this.$set(item, 'isActive', true);
        } else {
          this.$set(item, 'isActive', false);
        }
      });

      this.$set(row, 'isOpen', false);
    });
  },

  data() {
    return {
      rows: [],
      windowWidth: 0,
      visibleCount: 24,
      buttonClass: false,
      btnIconType: false,
    };
  },

  async fetch() {
    this.rows = await getProductsMain();
  },

  methods: {
    toggleItems(elems) {
      const { items } = elems;
      items.forEach((item, i) => {
        const linkToItem = item;
        if (elems.isOpen && i + 1 > this.visibleCount) {
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
  },

  components: {
    AButton,
  },
};
</script>
