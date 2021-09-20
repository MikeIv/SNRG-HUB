<template>
  <div class="container">
    <component
      :is="key"
      v-for="{ key, methods, title, id } in pageInfo.components"
      :key="id"
      :methods="methods"
      :title="title"
    ></component>
  </div>
</template>

<script>
import sMainTopics from '~/components/s_main_topics/s_main_topics';

export default {
  components: { sMainTopics },

  middleware: 'getPageInfo',

  asyncData() {},

  computed: {
    pageInfo() {
      return this.$store.state.pageInfo;
    },
  },
};
</script>
