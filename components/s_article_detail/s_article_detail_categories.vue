<template>
  <div class="s-article-detail__directions">
    <div class="s-article-detail__directions-title a-font_h5">Направления в сфере {{ nameCourse }}</div>
    <div class="s-article-detail__directions-items">
      <nuxt-link :to="`/journal/${category.slug}`" v-for="(category, id) in data" :key="id">
        <a-tag :label="category.name" class="s-article-detail__directions-item"> </a-tag>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { ATag } from '@cwespb/synergyui';

export default {
  name: 's-article-detail-categories',
  components: {
    ATag,
  },
  props: {
    nameCourse: {
      type: String,
    },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
