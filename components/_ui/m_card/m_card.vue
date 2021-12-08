<template>
  <div :class="{ ...mCardWrapperClasses }">
    <template v-if="type === 'vertical'">
      <div class="m-card-vertical__box">
        <img
          v-if="verticalImgSrc"
          :src="verticalImgSrc"
          class="m-card-vertical__img"
          :alt="altName ? altName : title"
        />
        <a-button
          v-if="href"
          class="m-card-vertical__button"
          size="medium"
          bg-color="accent"
          only-icon="rounded"
          icon-type="si-play"
          aria-label="play"
          @click="onVerticalBtnClickHandler"
        ></a-button>
      </div>
      <h3 class="m-card-vertical__title a-font_xl">{{ title }}</h3>
      <h4 class="m-card-vertical__label a-font_l-m" v-html="description"></h4>
    </template>

    <template v-if="type === 'program'">
      <div class="m-card-program--left">
        <h3 class="m-card-program__title a-font_xl">{{ title }}</h3>
        <h4 class="m-card-program__label a-font_m-s">{{ description }}</h4>
        <div class="m-card-program__bottom">
          <a-note :text="bottomText" :iconSrc="iconSrc" @organization-click="onOrganizationClick" />
          <i v-if="favorites" class="m-card-program__bottom-icon si-heart" @click.stop.prevent="onLikeClickHandler"></i>
        </div>
        <div class="m-card-program__btns" v-if="btns">
          <div class="m-card-program__btn" v-for="(btn, id) in btns" :key="id">
            <a-button :label="btn.label" :bgColor="btn.bgColor" @click="onBtnClickHandler(btn.label)" />
          </div>
        </div>
      </div>
      <div class="m-card-program--right">
        <img
          v-if="verticalImgSrc"
          :src="verticalImgSrc"
          class="m-card-program--right__img"
          :alt="altName ? altName : title"
        />
      </div>
    </template>

    <template v-if="type === 'announce'">
      <span class="m-card-announce__date a-font_m">{{ date }}</span>
      <h3 class="m-card-announce__title a-font_l">{{ title }}</h3>
      <h4 class="m-card-announce__description a-font_m">{{ description }}</h4>
      <nuxt-link :to="link">
        <a-button size="small" bg-color="ghost-accept" :label="aButtonText" @click="onMoreBtnClickHandler" />
      </nuxt-link>
    </template>

    <template v-if="type === 'vebinar'">
      <div class="m-card-vebinar__info">
        <div class="m-card-vebinar__stickers">
          <a-sticker v-for="item in stickers" :key="item.id" :title="item.title" :type="item.type"> </a-sticker>
        </div>
        <h3 class="m-card-vebinar__title a-font_xl">{{ title }}</h3>
        <h4 class="m-card-vebinar__presenter a-font_m">{{ presenter }}</h4>
        <div class="m-card-vebinar__bottom">
          <a-note v-if="bottomText && iconSrc" :text="bottomText" :iconSrc="iconSrc" @click="onMoreBtnClickHandler" />
          <div class="m-card-vebinar__price a-font_l" v-else-if="price">{{ price }} Р</div>
          <i class="m-card-vebinar__bottom-icon si-heart" @click.prevent="onLikeClickHandler"></i>
        </div>
      </div>
      <div class="m-card-vebinar__img" v-if="verticalImgSrc">
        <img :src="verticalImgSrc" :alt="altName ? altName : title" />
      </div>
    </template>

    <template v-if="type === 'gorizontal'">
      <div class="m-card-gorizontal__info">
        <div class="m-card-gorizontal__title a-font_h6">
          {{ title }}
        </div>
        <div class="m-card-gorizontal__description">
          {{ description }}
        </div>
      </div>
      <div class="m-card-gorizontal__icon">
        <i :class="{ ...mCardIconClasses }"></i>
      </div>
    </template>
  </div>
</template>

<script>
import { AButton, ANote, ASticker } from '@cwespb/synergyui';
import './m_card.scss';

export default {
  name: 'MCard',

  components: {
    AButton,
    ANote,
    ASticker,
  },

  props: {
    type: {
      type: String,
      default: 'vertical',
      validator: (v) => ['vertical', 'program', 'announce', 'vebinar'].indexOf(v) !== -1,
    },

    title: {
      type: String,
    },

    date: {
      type: String,
    },

    description: {
      type: String,
    },

    link: {
      type: String,
    },

    bottomText: {
      type: String,
    },

    iconSrc: {
      type: String,
    },

    href: {
      type: String,
    },

    horizontalImgSrc: {
      type: String,
    },

    verticalImgSrc: {
      type: String,
    },

    presenter: {
      type: String,
    },

    aButtonText: {
      type: String,
      default: 'Подробнее',
    },

    stickers: {
      type: Array,
    },

    altName: {
      type: String,
    },

    favorites: {
      type: Boolean,
      default: false,
    },

    btns: {
      type: Array,
    },

    price: {
      type: String,
    },

    iconClasses: {
      type: String,
    },
  },

  methods: {
    onBtnClickHandler(btn) {
      this.$emit('btn-click', btn);
    },

    onLikeClickHandler() {
      this.$emit('onLikeClick');
    },

    onMoreBtnClickHandler() {
      this.$emit('more');
    },

    onOrganizationClick() {
      this.$emit('organization-click');
    },
    onVerticalBtnClickHandler() {
      this.$emit('clickVertical');
    },
  },

  computed: {
    mCardWrapperClasses() {
      return {
        'm-card--clickable': this.href && this.type === 'vertical',
        [`m-card-${this.type}`]: true,
      };
    },
    mCardIconClasses() {
      return {
        [`${this.iconClasses}`]: true,
      };
    },
  },
};
</script>
