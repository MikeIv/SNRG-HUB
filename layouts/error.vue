<template>
  <div class="page-404__wrapper">
    <!-- <header/> -->
    <page404 />
    <!-- <footer/> -->
  </div>
</template>

<script>
import page404 from '~/components/404/page_404';

export default {
  props: ['error'],
  components: { page404 },

  head() {
    return {
      link: [
        { rel: 'canonical', href: `http://localhost:3000${this.$route.path}` },
      ],
    };
  },
};
</script>
