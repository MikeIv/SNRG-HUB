<template>
  <main class="product-page">
    <Nuxt />
  </main>
</template>

<script>
export default {
  head() {
    return {
      link: [
        { rel: 'canonical', href: `http://localhost:3000${this.$route.path}` },
      ],
    };
  },
};
</script>
