<template>
  <div class="catalog-product-list" id="catalog-product-list">
    <div class="catalog-product-list__wrapper" v-if="productList">
      <slot />
      <h3 v-if="!productList.length">К сожалению, ничего нет</h3>
      <div v-for="article in productList" :key="article.id" class="catalog-product-list__item-wrapper">
        <nuxt-link :to="`/article/${article.slug}`">
          <m-article
            :article="article"
            @click.stop="onArticleClick(article)"
            :randomColor="getRandomColor(article.included.tags[0].name)"
          />
        </nuxt-link>
      </div>
    </div>
    <m-pagination
      v-if="productList"
      :currentPage="pageInx"
      @change-current-page="changeCurrentPage"
      @next="nextPage"
      @prev="prevPage"
      :totalItems="Number(totalProducts)"
      :perPage="productsPerPage"
    />
  </div>
</template>

<script>
import { MPagination } from '@cwespb/synergyui';
import MArticle from '~/components/_ui/m_article/m_article';
import './s_journal_product_list.scss';

export default {
  name: 'SJournalProductList',

  props: ['productList', 'totalProducts', 'page', 'productsPerPage'],

  components: {
    MArticle,
    MPagination,
  },

  data() {
    return {
      countColorIndex: 0,
      tagColors: [
        'rgba(228, 43, 43, 1)',
        'rgba(5, 161, 143, 1)',
        'rgba(220, 3, 198, 1)',
        'rgba(0, 169, 227, 1)',
        'rgba(67, 86, 255, 1)',
        'rgba(107, 190, 0, 1)',
      ],
      tagColorsList: {},
    };
  },

  computed: {
    pageInx: {
      get() {
        return this.page;
      },

      set(page) {
        this.$emit('page', page);
        window.scrollTo({
          top: document.getElementById('catalog-product-list'),
          behavior: 'smooth',
        });
      },
    },
  },

  methods: {
    getRandomColor(name) {
      if (Object.prototype.hasOwnProperty.call(this.tagColorsList, name)) {
        return this.tagColorsList[name];
      }

      this.tagColorsList[name] = this.tagColors[this.countColorIndex];
      if (this.countColorIndex === 5) {
        this.countColorIndex = 0;
      } else {
        this.countColorIndex += 1;
      }

      return this.tagColorsList[name];
    },

    changeCurrentPage(page) {
      this.pageInx = page;
    },

    nextPage(nextPage) {
      this.pageInx = nextPage;
    },

    prevPage(prevPage) {
      this.pageInx = prevPage;
    },

    onArticleClick(article) {
      this.$router.push(`/article/${article.slug}`);
    },
  },
};
</script>
