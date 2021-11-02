<template>
  <div class="preloader" v-if="loading">
    <div class="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
import './s_loader.scss';

export default {
  name: 'SLoader',

  data() {
    return {
      loading: true,
    };
  },
  methods: {
    start() {
      const htmlWrapper = document.querySelector('html');
      htmlWrapper.style.overflowY = 'hidden';

      this.loading = true;
    },

    finish() {
      setTimeout(() => {
        const htmlWrapper = document.querySelector('html');
        htmlWrapper.style.overflowY = 'visible';

        this.loading = false;
      }, 1000);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();

      setTimeout(() => this.$nuxt.$loading.finish(), 500);
    });
  },
};
</script>

<style scoped lang="scss">
.preloader__logo-wrapper {
  svg {
    enable-background: new 0 0 279 278;
  }
}
</style>
