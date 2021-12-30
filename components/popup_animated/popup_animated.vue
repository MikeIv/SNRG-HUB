<template>
  <transition :name="transition">
    <APopup :class="['popup-animated', transition]" :visible="visible" @close="closePopup()">
      <h6 class="popup-animated__title a-font_h6" v-html="title" v-if="title"></h6>
      <slot></slot>
    </APopup>
  </transition>
</template>

<script>
import { APopup } from '@cwespb/synergyui';
import './popup_animated.scss';

export default {
  name: 'PopupAnimated',

  components: {
    APopup,
  },

  props: {
    visible: Boolean,
    title: String,
    transition: String,
  },

  methods: {
    closePopup() {
      this.$emit('close', false);
    },
  },
};
</script>
