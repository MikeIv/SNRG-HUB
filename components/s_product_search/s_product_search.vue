<template>
  <div>
    <div class="l-default s-product-search">
      <h2 class="a-font_h2">
        Найдено {{ totalItems }} результатов в {{ categories.length }} категориях
        <sup class="s-product-search__total a-font_l"> {{ totalItems }} </sup>
      </h2>

      <swiper class="s-product-search__presets" :options="$options.swiperOption">
        <swiper-slide v-for="(preset, index) in categories" :key="index" class="catalog-presets__swiper-slide">
          <nuxt-link to="/catalog">
            <a-tag :label="`${preset.name} ${preset.count}`" :class="{ active: preset.name === 'Все' }" />
          </nuxt-link>
        </swiper-slide>
      </swiper>

      <div class="s-product-search__categories">
        <div class="s-product-search__category" v-for="(category, index) in categories" :key="index">
          <h2 class="a-font_h2 s-product-search__category-title">
            {{ category.name }} <sup class="s-product-search__total a-font_l"> {{ category.count }} </sup>
          </h2>
          <div class="s-product-search__cards">
            <template v-for="(product, index) in productsList">
              <nuxt-link
                :to="`/product/${product.slug}`"
                class="s-product-search__wrapper"
                :key="product.id"
                v-if="index < 9"
              >
                <m-card
                  :title="product.name"
                  :bottomText="product.included.organization.name"
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

          <nuxt-link to="/catalog" class="s-product-search__btn-link">
            <a-button
              class="s-product-search__btn"
              label="Смотреть все"
              size="large"
              bgColor="ghost-primary"
              @click="onMoreButtonClick"
            />
          </nuxt-link>
        </div>
      </div>
    </div>
    <SQuiz :quiz-id="2" />
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { ATag, MCard, AButton } from '@cwespb/synergyui';
import SQuiz from '~/components/s_quiz/s_quiz';
import './s_product_search.scss';
import getSearchProducts from '~/api/productsSearch';

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
  },

  props: {
    search: {
      type: String,
    },
  },

  swiperOption: {
    slidesPerView: 'auto',
    spaceBetween: 8,
  },

  data() {
    return {
      totalItems: 1204,
      totalCategories: 5,
      presets: [
        { name: 'Все', count: 28 },
        { name: 'Программы', count: 14 },
        { name: 'Курсы', count: 24 },
      ],
      baseURL: process.env.NUXT_ENV_S3BACKET,
      categories: [],
      productsList: [],
    };
  },

  methods: {
    onMoreButtonClick() {
      console.log('more');
    },

    async fetchProductsList() {
      const expandedMethod = {
        filter: {
          query: this.search,
        },
      };

      const searchedData = await getSearchProducts(expandedMethod);
      console.log('here', searchedData);
      this.totalItems = searchedData.total;
      this.categories = searchedData.data.search_results;

      this.productsList = [];
    },
  },

  async fetch() {
    await this.fetchProductsList();
  },
};
</script>
