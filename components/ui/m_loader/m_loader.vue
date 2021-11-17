<template>
  <div class="preloader" :class="{ basic: type === 'basic', fullscreen: type === 'fullscreen' }">
    <div class="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
import './m_loader.scss';

export default {
  name: 'MLoader',

  props: {
    type: {
      type: String,
      default: 'fullscreen',
      required: false,
      validator(value) {
        return ['basic', 'fullscreen'].includes(value);
      },
    },
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
