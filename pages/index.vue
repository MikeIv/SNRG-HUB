<template>
  <div class="container">
    <div>
      <h1 class="title">{{ pageInfo.name }}</h1>
    </div>
    <nuxt-link to="/product">TO PRODUCT PAGE</nuxt-link>
    <br />
    <h2>DATA FROM EXAMPLE:</h2>
    <example />
    <br />
    <h2>PAGE INFO:</h2>
    <!--    <component-->
    <!--      :is="section.key"-->
    <!--      v-for="section in pageInfo.components"-->
    <!--      :key="section"-->
    <!--      :section.methods-->
    <!--    ></component>-->
    <pre>
      {{ pageInfo }}
    </pre>
  </div>
</template>

<script>
import Example from '~/components/Example';

export default {
  components: { Example },

  middleware: 'getPageInfo',

  computed: {
    pageInfo() {
      return this.$store.state.pageInfo;
    },
  },
};
</script>
