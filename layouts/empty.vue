<template>
  <div>
    <Nuxt />
  </div>
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
