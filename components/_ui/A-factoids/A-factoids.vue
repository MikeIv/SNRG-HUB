<template>
  <div class="a-factoids">
    <div class="a-factoids__img-wrapper" :class="{ active: getImage }">
      <img :src="image" alt="" class="a-factoids__img" />
    </div>
    <div class="a-factoids__info">
      <h2 class="a-font_h2">
        {{ number }}
      </h2>
      <div class="a-factoids__title a-font_xl" v-html="title"></div>
    </div>
  </div>
</template>

<script>
import './A-factoids.scss';

export default {
  name: 'AFactoids',
  props: {
    type: {
      type: String,
      required: true,
      validator: (value) => ['line', 'default', 'number', 'number-horizontal', 'image'].indexOf(value) !== -1,
    },

    title: {
      type: String,
      required: true,
    },

    subtitle: {
      type: String,
    },

    color: {
      type: [Number, String],
      default: 'color_text',
      validator: (value) => ['color_text', 'color_link'].indexOf(value) !== -1,
    },

    number: {
      type: [Number, String],
    },

    lineNumber: {
      type: String,
    },

    image: {
      type: String,
    },
  },
  computed: {
    factoidTextClasses() {
      return {
        [`a-factoid__${this.color}`]: true,
      };
    },

    factoidWrapperClasses() {
      return {
        [`a-factoid-${this.type}__wrapper`]: true,
      };
    },
    getImage() {
      if (this.image !== '') return true;
      return false;
    },
  },
};
</script>
