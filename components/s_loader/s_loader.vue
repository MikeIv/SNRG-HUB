<template>
  <m-loader v-if="loading" />
</template>

<script>
import MLoader from '~/components/ui/m_loader/m_loader';

export default {
  name: 'SLoader',

  components: {
    MLoader,
  },

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
