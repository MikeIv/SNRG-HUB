<template>
  <div class="s-program-banner">
    <div class="s-program-banner__info">
      <h3 class="s-program-banner__title a-font_h3" v-html="title"></h3>
      <div class="s-program-banner__description a-font_xl-m" v-html="description"></div>
    </div>
    <div class="s-program-banner__img">
      <img :src="image" alt="" />
    </div>
  </div>
</template>

<script>
import './s_program_banner.scss';

export default {
  name: 's-program-banner',

  props: ['dataObject'],

  data() {
    return {
      title: '',
      description: '',
      image: '',
    };
  },

  mounted() {
    this.title = this.dataObject.title;
    this.description = this.dataObject.description;
    this.image = this.dataObject.image;
    this.bgColor = this.dataObject.bgColor;
  },
};
</script>
