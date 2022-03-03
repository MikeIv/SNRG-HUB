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
      <a-select v-if="productList.length" :options="options" class="catalog-page__select" @change="changeSortOption" />
      <i class="si-filter a-font_button catalog-page__filters-icon" tabindex="0" @click="filtersIconClickHandler">
        <span class="a-font_button">Фильтры</span>
      </i>
    </template>
  </div>
</template>

<script>
import { ATag, ASelect } from '@cwespb/synergyui';
import './s_catalog_tags.scss';

export default {
  name: 'SCatalogTags',

  props: ['selectedFilters', 'productList', 'options'],

  components: {
    ATag,
    ASelect,
  },

  methods: {
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
