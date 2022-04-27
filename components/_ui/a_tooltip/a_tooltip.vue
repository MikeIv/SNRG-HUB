<template>
  <div class="a-tooltip" v-if="visible" @click.stop>
    <slot></slot>
  </div>
</template>

<script>
import './a_tooltip.scss';

export default {
  name: 'ATooltip',

  props: {
    visible: Boolean,
  },
  methods: {
    toggleToolTip() {
      document.addEventListener('click', this.hideToolTip);
    },

    hideToolTip() {
      this.$emit('hide-tooltip', false);
    },
  },
  beforeDestroy() {
    document.removeEventListener('click', this.hideToolTip);
  },
  mounted() {
    this.toggleToolTip();
  },
};
</script>
