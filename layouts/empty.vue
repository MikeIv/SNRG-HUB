<template>
  <Nuxt />
</template>

<script>
export default {
  mounted() {
    setTimeout(() => {
      this.$gtm();
    }, 2500);
  },
};
</script>
