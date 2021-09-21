<template>
  <div class="container">
    <div>
      <h1 class="title">{{ pageInfo.name }}</h1>
    </div>

    <br />
    <component
      :is="key"
      v-for="{ key, methods, title, id } in pageInfo.components"
      :key="id"
      :methods="methods"
      :title="title"
    ></component>
    <pre>
      {{ pageInfo }}
    </pre>
  </div>
</template>

<script>
import sMainPrograms from '~/components/s_main_programs/s_main_programs';

export default {
  components: { sMainPrograms },

  middleware: 'getPageInfo',

  computed: {
    pageInfo() {
      return this.$store.state.pageInfo;
    },
  },
};
</script>
