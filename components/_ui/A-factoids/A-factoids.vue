<template>
  <div :class="{ ...factoidWrapperClasses, 'a-factoid-horizontal__wrapper': type === 'number-horizontal' }">
    <template v-if="type === 'default'">
      <div class="a-factoids__default-subtitle a-font_xl">{{ subtitle }}</div>
      <div class="a-factoids__default-title a-font_xxl" v-html="title"></div>
    </template>

    <template v-if="type === 'line'">
      <h3 class="a-font_h3" :class="{ ...factoidTextClasses }">
        {{ lineNumber }}
      </h3>
      <div class="a-factoids__line-title a-font_l" v-html="title"></div>
    </template>

    <template
      v-if="type === 'image' || type === 'number'"
      :class="{ 'a-factoid-horizontal__wrapper': type === 'number-horizontal' }"
    >
      <div class="a-factoids">
        <div class="a-factoids__img-wrapper" :class="{ active: getImage }">
          <img :src="image" alt="" class="a-factoids__img" />
        </div>
        <div class="a-factoids__info">
          <h2
            class="a-font_h2"
            :class="{
              ...factoidTextClasses,
              'a-factoid-horizontal__number': type === 'number-horizontal',
            }"
          >
            {{ number }}
          </h2>
          <div class="a-factoids__title a-font_xl" v-html="title"></div>
        </div>
      </div>
    </template>
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
