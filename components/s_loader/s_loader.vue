<template>
  <div class="preloader">
    <div class="preloader__logo">
      <div class="preloader__logo-wrapper">
        <svg
          version="1.1"
          id="Layer_2"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 279 278"
          xml:space="preserve"
        >
          <polygon class="st0" points="167.3,55.8 84.1,139 167.3,222.2 167.3,166.8 139.5,139 167.3,111.2 " />
        </svg>
        <div class="preloader__logo-border"></div>
      </div>
    </div>
  </div>
</template>

<script>
import './s_loader.scss';

export default {
  name: 'SLoader',
};
</script>

<style scoped lang="scss">
.preloader__logo-wrapper {
  svg {
    enable-background: new 0 0 279 278;
  }
}
</style>
