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
      const htmlWrapper = document.querySelector('html');
      htmlWrapper.style.overflowY = 'visible';

      this.loading = false;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      this.$nuxt.$loading.finish();
    });
  },
};
</script>
