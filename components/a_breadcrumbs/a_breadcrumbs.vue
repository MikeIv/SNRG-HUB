<template>
  <div class="a-breadcrumbs">
    <div class="a-breadcrumbs__wrapper" v-for="(item, index) in breadcrumbsArray" :key="index">
      <nuxt-link v-if="item.href" :to="item.href" :class="classes" class="a-breadcrumbs-item">
        <h1 class="a-breadcrumbs-item__label a-font_m-s">{{ item.label }}</h1>
        <i class="si-chevron-right"></i>
      </nuxt-link>

      <div v-else :class="classes" class="a-breadcrumbs-item">
        <h1 class="a-breadcrumbs-item__label a-font_m-s">{{ item.label }}</h1>
        <i class="si-chevron-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
import './a_breadcrumbs.scss';

export default {
  name: 'ABreadcrumbs',

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
