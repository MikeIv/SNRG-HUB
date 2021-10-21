<template>
  <div class="a-breadcrumbs__wrapper">
    <nuxt-link
      v-for="(item, index) in breadcrumbsArray"
      :key="index"
      :to="item.href"
      :class="classes"
      class="a-breadcrumbs-item"
    >
      <span class="a-breadcrumbs-item__label a-font_m-s"> {{ item.label }} </span>
      <i class="si-chevron-right"></i>
    </nuxt-link>
  </div>
</template>

<script>
import './a_breadcrumbs.scss';

export default {
  name: 'ABreacrumbs',

  props: {
    breadcrumbs: {
      type: Array,
    },
  },

  data: () => ({
    breadcrumbsArray: [],
  }),

  created() {
    this.$nextTick(() => {
      if (Array.isArray(this.breadcrumbs)) {
        this.breadcrumbsArray = this.breadcrumbs;
      } else {
        this.breadcrumbsArray.push(this.breadcrumbs);
      }
    });
  },

  computed: {
    classes() {
      return {
        'a-breadcrumbs-item--list': this.breadcrumbsArray.length > 1,
      };
    },
  },
};
</script>
