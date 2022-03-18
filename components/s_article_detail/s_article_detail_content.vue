<template>
  <div class="s-article-detail__content-body" v-html="data" />
</template>

<script>
export default {
  name: 's-article-detail-content',
  props: {
    data: {
      type: [String, Array],
    },
  },
};
</script>
