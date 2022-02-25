<template>
  <div class="catalog-page__filters">
    <div class="catalog-page__filters-tags">
      <a-tag
        v-if="selectedFilters.length"
        label="Очистить все"
        status="delete"
        @aTagDelete="clearAllFilters"
        @aTagClick="clearAllFilters"
      />
      <a-tag
        v-for="tag in selectedFilters"
        :key="`${tag.name}${tag.id}`"
        :label="tag.key === 'organization_ids' ? tag.abbreviation_name : tag.name"
        status="selected"
        @aTagDelete="deleteTag(tag)"
      />
    </div>
    <template>
      <div class="catalog-page__filters-categories">
        <div class="catalog-page__filters-categories--input" @click="onCategoryClickHandler">
          <h5 v-if="subcategoriesTitle" class="a-font_m">{{ subcategoriesTitle }}</h5>
          <h5 v-else class="a-font_m placeholder">Выберите направление</h5>
          <img src="~/assets/icons/arrow-down.svg" alt="select" />
        </div>
        <div
          v-if="subcategories.length"
          class="catalog-page__filters-categories--input"
          @click="onSubcategoryClickHandler"
        >
          <h5 v-if="topicTitle" class="a-font_m">{{ topicTitle }}</h5>
          <h5 v-else class="a-font_m placeholder">Выберите тематику</h5>
          <img src="~/assets/icons/arrow-down.svg" alt="select" />
        </div>
      </div>
      <div class="catalog-page__filters-selects">
        <a-select
          v-if="productList.length"
          :options="options"
          class="catalog-page__select"
          @change="changeSortOption"
        />
        <i class="si-filter a-font_button catalog-page__filters-icon" tabindex="0" @click="filtersIconClickHandler">
          <span class="a-font_button">Фильтры</span>
        </i>
      </div>
      <a-popup :visible="categoryPopup" @close="categoryPopup = false" class="catalog-page__popup">
        <div class="catalog-page__popup-header">
          <h1 class="catalog-page__popup-title">{{ popupTitle }}</h1>
          <a-input class="catalog-page__popup-search" placeholder="Введите название направления" />
        </div>
        <div class="catalog-page__popup-categories">
          <nuxt-link
            v-for="category in popupCategories"
            :key="category.id"
            :to="getLinkRoute(category)"
            class="catalog-page__popup-category"
            :class="{ active: category.name === subcategoriesTitle || category.name === topicTitle }"
          >
            {{ category.name }}
          </nuxt-link>
        </div>
      </a-popup>
    </template>
  </div>
</template>

<script>
import {
  ATag, ASelect, APopup, AInput,
} from '@cwespb/synergyui';
import './s_catalog_tags.scss';

export default {
  name: 'SCatalogTags',

  data() {
    return {
      categoryPopup: false,
      popupTitle: 'Направления',
      popupCategories: this.categories,
      categoriesState: true,
    };
  },

  props: [
    'selectedFilters',
    'productList',
    'options',
    'subcategoriesTitle',
    'topicTitle',
    'subcategories',
    'categories',
  ],

  components: {
    ATag,
    ASelect,
    APopup,
    AInput,
  },

  watch: {
    categoryPopup() {
      this.hideYScroll();
    },
  },

  methods: {
    getLinkRoute(category) {
      return this.subcategories.length && !this.categoriesState
        ? {
          path: `/catalog/${this.$route.params?.pathMatch?.split('/').slice(0, -1)[0]}/${category.slug}`,
          query: this.$route.query,
        }
        : {
          path: `/catalog/${category.slug}`,
          query: this.$route.query,
        };
    },

    hideYScroll() {
      const htmlWrapper = document.querySelector('html');
      const bodyWrapper = document.querySelector('body');

      if (this.categoryPopup) {
        htmlWrapper.style.overflow = 'hidden';
        bodyWrapper.style.overflow = 'hidden';
      } else {
        htmlWrapper.style.overflow = 'initial';
        bodyWrapper.style.overflow = 'initial';
      }
    },

    onCategoryClickHandler() {
      this.popupCategories = this.categories;
      this.categoriesState = true;
      this.popupTitle = 'Направления';
      this.categoryPopup = true;
    },

    onSubcategoryClickHandler() {
      this.popupCategories = this.subcategories;
      this.popupTitle = this.subcategoriesTitle;
      this.categoriesState = false;
      this.categoryPopup = true;
    },

    clearAllFilters() {
      this.$emit('clear-all-filters');
    },

    changeSortOption(option) {
      this.$emit('change-sort-option', option);
    },

    deleteTag(tag) {
      this.$emit('delete-tag', tag);
    },

    filtersIconClickHandler() {
      this.$emit('filters-icon-click');
    },
  },
};
</script>
