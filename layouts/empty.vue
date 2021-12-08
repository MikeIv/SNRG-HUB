<template>
  <div>
    <noscript
      ><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WPTVBRG" height="0" width="0"></iframe
    ></noscript>
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
