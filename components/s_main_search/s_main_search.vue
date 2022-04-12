<template>
  <section class="s-main-search s-margin">
    <div class="l-wide l-border-radius">
      <div class="s-main-search__box">
        <h2 class="s-main-search__title a-font_h5" v-html="title">Search</h2>

        <template v-for="row in getAllItems">
          <div class="s-main-search__row" v-if="row.items.length" :key="row.id">
            <div class="s-main-search__category a-font_l">{{ row.name }}</div>
            <div class="s-main-search__items">
              <template v-for="item in row.items">
                <nuxt-link
                  :to="`catalog` + (row.key === 'category' ? `/${item.slug}?page=1` : `?page=1&level_ids=${item.id}`)"
                  class="s-main-search__item"
                  v-if="item.isActive"
                  :key="item.id"
                >
                  <div class="s-main-search__item-icon">
                    <img :src="`${baseURL}${item.icon_image}`" alt="" />
                  </div>
                  <div class="s-main-search__item-title a-font_l-m">
                    <span>{{ item.name }}</span>
                  </div>
                </nuxt-link>
              </template>

              <div
                v-if="row.items.length >= maxLinksCount"
                :class="[{ 'is-open': row.isOpen }, 's-main-search__item s-main-search__item--btn']"
                @click="
                  toggleItems(row);
                  toggleBtnClass(row);
                "
              >
                <button class="s-main-search__more-btn">
                  <div class="s-main-search__more-btn-icon">
                    <img src="~/assets/icons/more.png" alt="more" />
                  </div>
                  <span>{{ row.isOpen ? 'Свернуть' : 'Еще программы' }}</span>
                </button>
              </div>
            </div>
          </div>
        </template>

        <nuxt-link to="/catalog" class="s-main-search__btn-link">
          <AButton size="large" bgColor="accent" :label="`Показать предложения`" @click="onButtonMoreClick" />
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import { AButton } from '@cwespb/synergyui';
// import getLevelsList from '~/api/levelsList';
import getCatalogCategoriesList from '~/api/getCatalogCategoriesList';
import './s_main_search.scss';

export default {
  name: 'SMainSearch',

  data() {
    return {
      rows: [
        {
          name: 'Выберите направление',
          key: 'category',
          items: [],
        },
        {
          name: 'Уровни обучения',
          key: 'levels_ids',
          items: [],
        },
      ],
      windowWidth: null,
      maxLinksCount: null,
      desktopLinksCount: 15,
      tabletLinksCount: 11,
      mobileLinksCount: 7,
      secondMobileLinksCount: 4,
      desktopBreakPoint: 1500,
      tabletBreakPoint: 768,
      mobileBreakPoint: 450,
      buttonClass: false,
      btnIconType: false,
      baseURL: process.env.NUXT_ENV_S3BACKET,
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

      if (this.windowWidth < this.tabletBreakPoint) {
        this.maxLinksCount = this.mobileLinksCount;
      }

      if (this.windowWidth < this.mobileBreakPoint) {
        this.maxLinksCount = this.secondMobileLinksCount;
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
    // const expandedMethodList = this.methods[0].data;
    const expandedMethodCategories = this.methods[1].data;
    // const levelsList = await getLevelsList(expandedMethodList);
    const categoriesList = await getCatalogCategoriesList(expandedMethodCategories);
    this.rows[0].items.push(...categoriesList);
    // this.rows[1].items.push(...levelsList);
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

    onButtonMoreClick() {
      this.$router.push('/catalog');
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
