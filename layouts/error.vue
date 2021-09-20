<template>
  <div class="page-404__wrapper">
    <header/>
    <page404/>
    <footer/>
  </div>
</template>

<script>
import page404 from '~/components/404/page_404';

export default {
  props: ['error'],
  components: { page404 },
};
</script>
