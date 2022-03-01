<template>
  <div class="m-catalog-categories" v-if="categories && categories.length">
    <h3 v-if="title" class="m-catalog-categories__title a-font_xl">{{ title }}</h3>
    <h3 v-if="subcategoriesTitle" class="m-catalog-categories__subcategories-title a-font_xl">
      {{ subcategoriesTitle }}
    </h3>
    <h3 v-if="topicTitle" class="m-catalog-categories__topics-title a-font_xl">
      {{ topicTitle }}
    </h3>
    <div
      v-if="!topicTitle"
      class="m-catalog-categories__items"
      :class="{ scrolled: isOpen }"
      :style="{ maxHeight: visibleCount * 32 + 'px' }"
    >
      <nuxt-link
        v-for="category in subcategories.length ? subcategories : categories"
        :key="category.id"
        :to="{ path: `${$route.path}${category.slug}`, query: $route.query }"
        class="m-catalog-categories__item a-font_l-m"
      >
        {{ category.name }}
      </nuxt-link>
    </div>

    <hr class="m-catalog-categories__line" v-if="isOpen" />

    <a-button
      v-if="isToggleBtnVisible"
      @click="toggleList"
      :label="isOpen ? 'Свернуть' : passedBtnText"
      size="small"
      bgColor="none"
    />
  </div>
</template>

<script>
import { AButton } from '@cwespb/synergyui';
import './m-catalog-categories.scss';

export default {
  name: 'MCatalogCategories',

  components: {
    AButton,
  },

  props: {
    subcategoriesTitle: {
      type: String,
    },
    topicTitle: {
      type: String,
    },
    subcategories: {
      type: Array,
    },
    categories: {
      type: Array,
    },
    title: {
      type: String,
      required: true,
    },
    passedBtnText: {
      type: String,
      required: true,
    },
    visibleCount: {
      type: Number,
      default: 6,
    },
  },

  data() {
    return {
      isOpen: false,
    };
  },

  computed: {
    visibleItems() {
      return this.isOpen ? this.categories : this.categories.slice(0, this.visibleCount);
    },

    isToggleBtnVisible() {
      if (this.subcategories.length) {
        return this.subcategories.length > this.visibleCount && !this.topicTitle;
      }

      return this.categories.length > this.visibleCount && !this.topicTitle;
    },
  },

  methods: {
    toggleList() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
