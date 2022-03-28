<template>
  <div>
    <div v-if="loading" class="s-product-search__loader">
      <m-loader type="basic" />
    </div>
    <div v-else>
      <div class="s-product-search">
        <div class="l-border-radius s-margin">
          <div class="l-wide l-border-radius">
            <h2 class="a-font_h2" v-if="categories.length">
              Найдено {{ totalItems }} результатов в {{ categories.length }} категориях
              <sup class="s-product-search__total a-font_l"> {{ totalItems }} </sup>
            </h2>
            <h2 v-else class="a-font_h2">По вашему запросу ничего не найдено</h2>

            <swiper class="s-product-search__presets" :options="$options.swiperOption" v-if="categories.length">
              <swiper-slide v-for="(preset, index) in presets" :key="index" class="catalog-presets__swiper-slide">
                <a-tag
                  :label="`${preset.name} ${preset.count}`"
                  :class="{ active: preset.name === selectedPreset }"
                  @aTagClick="onTagClickHandler(preset)"
                />
              </swiper-slide>
            </swiper>
          </div>
        </div>

        <div class="s-product-search__categories" v-if="categories.length">
          <div
            class="s-product-search__category s-margin"
            v-for="(product, index) in productsList"
            :key="product.name + index"
            :class="{ hidden: product.name !== selectedPreset && selectedPreset !== 'Все' }"
          >
            <template v-if="product.name === selectedPreset || selectedPreset === 'Все'">
              <div class="l-wide l-border-radius">
                <h2 class="a-font_h2 s-product-search__category-title">
                  {{ product.name }} <sup class="s-product-search__total a-font_l"> {{ product.count }} </sup>
                </h2>
                <div class="s-product-search__cards">
                  <template v-for="(product, index) in product.products">
                    <nuxt-link
                      :to="`/product/${product.slug}`"
                      class="s-product-search__wrapper"
                      :key="product.id + index"
                    >
                      <m-card
                        :title="product.name"
                        :bottomText="product.included.organization.abbreviation_name"
                        :name="product.name"
                        :description="product.included.levels[0].name"
                        :iconSrc="`${baseURL}${product.included.organization.logo}`"
                        :verticalImgSrc="`${baseURL}${product.digital_image}`"
                        type="program"
                        @organization-click="onOrganizationClick(product)"
                      />
                    </nuxt-link>
                  </template>
                </div>
              </div>

              <nuxt-link to="/catalog" class="s-product-search__btn-link">
                <a-button
                  v-if="product.count > productsPerPage && product.products.length < product.count"
                  class="s-product-search__btn"
                  label="Показать еще"
                  size="large"
                  bgColor="ghost-primary"
                  @click="onMoreButtonClick(product)"
                />
              </nuxt-link>
            </template>
          </div>
          <div
            class="s-product-search__category s-margin"
            :class="{ hidden: articles.name !== selectedPreset && selectedPreset !== 'Все' }"
          >
            <div class="l-wide l-border-radius">
              <template v-if="articles.name === selectedPreset || selectedPreset === 'Все'">
                <h2 class="a-font_h2 s-product-search__category-title">
                  {{ articles.name }} <sup class="s-product-search__total a-font_l"> {{ articles.count }} </sup>
                </h2>
                <div class="s-product-search__cards">
                  <template v-for="article in articlesList">
                    <m-article
                      :key="article.id"
                      :article="article"
                      v-if="articlesList && articlesList.length > 0"
                      :randomColor="getRandomColor(article.included.tags[0].name)"
                    >
                    </m-article>
                  </template>
                </div>
                <nuxt-link to="/catalog" class="s-product-search__btn-link">
                  <a-button
                    v-if="articles.count > articlesPerPage && articlesList.length < articles.count"
                    class="s-product-search__btn"
                    label="Показать еще"
                    size="large"
                    bgColor="ghost-primary"
                    @click="fetchMoreArticles"
                  />
                </nuxt-link>
              </template>
            </div>
          </div>
        </div>
      </div>
      <SQuiz :quiz-id="2" />
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { ATag, MCard, AButton } from '@cwespb/synergyui';
import MArticle from '~/components/_ui/m_article/m_article';
import SQuiz from '~/components/s_quiz/s_quiz';
import MLoader from '~/components/ui/m_loader/m_loader';
import './s_product_search.scss';
import getProductsList from '~/api/products_list';
import getArticlesList from '~/api/articlesList';

import getSearch from '~/api/search';

export default {
  name: 'SProductSearch',

  head() {
    return {
      bodyAttrs: {
        class: 'bg-gray',
      },
    };
  },

  components: {
    SQuiz,
    Swiper,
    SwiperSlide,
    ATag,
    MCard,
    AButton,
    MLoader,
    MArticle,
  },

  props: {
    search: {
      type: String,
    },
  },

  swiperOption: {
    slidesPerView: 'auto',
    spaceBetween: 8,
    speed: 600,
  },

  data() {
    return {
      totalItems: 1204,
      totalCategories: 5,
      presets: [{ name: 'Все', count: 28 }],
      selectedPreset: 'Все',
      baseURL: process.env.NUXT_ENV_S3BACKET,
      categories: [],
      articles: [],
      productsList: [],
      articlesList: [],
      productsPerPage: 9,
      articlesPerPage: 9,
      perPage: {},
      ids: {},
      totalIds: {},
      windowWidth: null,
      loading: false,
      tagColors: [
        'rgba(228, 43, 43, 1)',
        'rgba(5, 161, 143, 1)',
        'rgba(220, 3, 198, 1)',
        'rgba(0, 169, 227, 1)',
        'rgba(67, 86, 255, 1)',
        'rgba(107, 190, 0, 1)',
      ],
      tagColorsList: {},
      countColorIndex: 0,
    };
  },

  watch: {
    search() {
      this.fetchSearchData();
    },
  },

  methods: {
    onOrganizationClick(product) {
      this.$router.push(`/organization/${product.included.organization.slug}`);
    },

    onTagClickHandler(preset) {
      this.selectedPreset = preset.name;
    },

    onMoreButtonClick(category) {
      this.perPage[category.name] += 50;
      this.fetchProductsList(category.name);
    },

    fetchMoreArticles() {
      this.articlesPerPage += 50;
      this.fetchArticlesList();
    },

    async fetchSearchData() {
      this.loading = true;
      this.selectedPreset = 'Все';
      this.productsList = [];
      this.categories = [];

      const expandedMethod = {
        filter: {
          query: this.search,
        },
      };

      const searchedData = await getSearch(expandedMethod);

      this.totalItems = searchedData.total;
      this.categories = searchedData.data.search_results[0].products.groups;

      this.articles = {
        name: 'Журнал',
        count: searchedData.data.search_results[1].articles.total,
        ids: searchedData.data.search_results[1].articles.ids,
      };

      const searchResults = searchedData.data.search_results[0].products.groups;
      searchResults.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });

      this.presets = [{ name: 'Все', count: searchedData.total }, ...searchResults];

      if (this.articles.ids.length) {
        this.presets.push({ name: this.articles.name, count: this.articles.count });
      }

      this.categories.forEach((category) => {
        this.perPage[category.name] = this.productsPerPage;
        this.totalIds[category.name] = category.product_ids;
      });

      await this.fetchProductsList();
      await this.fetchArticlesList();
    },

    async fetchArticlesList() {
      const expandedArticlesMethod = {
        filter: {
          ids: this.articles.ids,
          published: true,
        },
        include: ['publicationTypes', 'journalContent', 'articleAuthors', 'tags', 'directions'],
        pagination: { page_size: this.articlesPerPage, page: 1 },
      };

      const response = await getArticlesList(expandedArticlesMethod);
      this.articlesList = response.data;
    },

    async fetchProductsList(categoryName) {
      if (categoryName) {
        this.categories.forEach((category) => {
          this.ids[category.name] = category.product_ids.slice(0, this.perPage[category.name]);
        });
        const expandedProductsMoreMethod = {
          filter: {
            ids: this.ids[categoryName],
          },
          include: ['levels', 'organization'],
          pagination: { page_size: this.perPage[categoryName], page: 1 },
        };

        const newCards = await getProductsList(expandedProductsMoreMethod);
        const selectedProducts = this.productsList.find((products) => products.name === categoryName);
        this.$set(selectedProducts, 'products', [...newCards.data]);
        selectedProducts.products.sort(
          (a, b) => this.ids[categoryName].indexOf(a.id) - this.ids[categoryName].indexOf(b.id),
        );
        this.loading = false;
      } else {
        this.categories.forEach(async (category) => {
          this.ids[category.name] = category.product_ids.slice(0, this.productsPerPage);
          const expandedProductsMethod = {
            filter: {
              ids: this.ids[category.name],
            },
            include: ['levels', 'organization'],
            pagination: { page_size: this.productsPerPage, page: 1 },
          };

          const cards = await getProductsList(expandedProductsMethod);
          cards.data.sort((a, b) => this.ids[category.name].indexOf(a.id) - this.ids[category.name].indexOf(b.id));
          this.productsList.push({ products: cards.data, name: category.name, count: category.count });
          this.productsList.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
        });

        this.loading = false;
      }
    },

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
  },

  async fetch() {
    await this.fetchSearchData();
  },

  mounted() {
    this.windowWidth = window.innerWidth;

    if (this.windowWidth > 991) {
      this.productsPerPage = 9;
    } else if (this.windowWidth < 992 && this.windowWidth > 767) {
      this.productsPerPage = 6;
    } else {
      this.productsPerPage = 3;
    }
  },
};
</script>
