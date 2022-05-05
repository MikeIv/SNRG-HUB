<template>
  <div :class="classes" v-if="visible" @click.stop>
    <slot></slot>
  </div>
</template>

<script>
import './a_tooltip.scss';

export default {
  name: 'ATooltip',

  props: {
    visible: Boolean,
    position: String,
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
  computed: {
    classes() {
      return {
        'a-tooltip': true,
        [`a-tooltip--${this.position}`]: this.position,
      };
    },
  },
  mounted() {
    this.toggleToolTip();
  },
};
</script>
