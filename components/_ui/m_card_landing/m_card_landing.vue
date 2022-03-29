<template>
  <div class="m-card-landing">
    <div class="m-card-landing__image-wrapper" v-if="image">
      <img class="m-card-landing__image" :src="image" loading="lazy" :alt="altName ? altName : title" />
    </div>
    <div class="m-card-landing__info">
      <div class="m-card-landing__title a-font_xxl" v-html="title"></div>
      <div class="m-card-landing__position a-font_l" v-if="position" v-html="position"></div>
      <div class="m-card-landing__phone a-font_l" v-if="phone">{{ phone }}</div>
      <a class="m-card-landing__email a-font_l" v-if="email" :href="'mailto:' + email">{{ email }}</a>
      <div class="m-card-landing__text a-font_xl" v-if="isshow && text.length > limitText">
        <div class="m-card-landing__text-wrap" v-html="text.substr(0, limitText)"></div>
      </div>
      <div class="m-card-landing__text a-font_xl" v-else v-html="text"></div>
      <div class="m-card-landing__row">
        <a :href="href" class="m-card-landing__link" v-if="href" target="_blank" rel="noopener">{{
          linkText ? linkText : href
        }}</a>
        <button
          :class="{ hide: isVisible }"
          @click="showMore()"
          class="m-card-landing__button a-font_xl"
          v-if="!href && text.length > limitText"
          v-html="textBtnMore"
        ></button>
      </div>
    </div>
  </div>
</template>
<script>
import './m_card_landing.scss';

export default {
  name: 'MCardLanding',
  props: {
    image: String,
    title: String,
    position: String,
    email: String,
    phone: String,
    text: String,
    altName: String,
    limitText: { type: Number, default: 160 },
    href: String,
    linkText: String,
    textBtnMore: { type: String, default: 'Читать далее...' },
  },

  data() {
    return {
      isshow: true,
      isVisible: false,
    };
  },

  methods: {
    showMore() {
      this.isshow = !this.isshow;
      this.isVisible = true;
    },
  },
};
</script>
