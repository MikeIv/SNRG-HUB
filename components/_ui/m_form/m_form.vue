<template>
  <div class="m-form" :class="classes">
    <div class="m-form__box">
      <h5 :class="titleClass ? titleClass : 'a-font_h5'" v-html="title"></h5>
      <div class="m-form__subtitle a-font_xxl" v-if="subtitle" v-html="subtitle"></div>
    </div>
    <div class="m-form__inputs">
      <!-- <a-input
        v-for="(item, index) in inputs"
        :key="index"
        class="m-form__input"
        :type="item.type"
        :name="item.name"
        :placeholder="item.placeholder"
      ></a-input> -->

      <!-- Именованый слот для инпутов, для доступа в область видимости использующего компонента -->
      <slot name="inputs"></slot>

      <a-button
        class="m-form__submit"
        size="large"
        type="submit"
        :disabled="!isChecked || isSubmitDisabled"
        :label="btnText"
        @click="onClickBtn"
        bgColor="accent"
      ></a-button>
      <div class="m-form__checkbox">
        <a-control
          :checked="isChecked"
          :typeCtrl="typeCtrl"
          :typeBtn="typeCtrl"
          class="a-fornt_s"
          :class="isActive"
          :labelText="checkboxText"
          @change="isChecked = !isChecked"
          :disabled="!checked"
        ></a-control>
        <span class="m-form__checkbox-text" @click="changeSoglClickHandler">
          Нажимая на кнопку, вы соглашаетсь с
          <span class="m-form__checkbox-policy" @click.stop="showPolicyPopupClickHandler"
            >политикой конфиденциальности</span
          >
          и на получение рассылок
        </span>
      </div>
    </div>
    <APopup class="policy" @close="showPolicyPopup = false" :visible="showPolicyPopup">
      <div class="policy__popup" v-html="policy.text_full"></div>
    </APopup>
  </div>
</template>

<script>
// import AButton from '../../atoms/A-button/A-button';
// import AControl from '../../atoms/A-control/A-control';

import { AButton, AControl, APopup } from '@cwespb/synergyui';

import './m_form.scss';

export default {
  name: 'm_form',
  components: {
    AButton,
    AControl,
    APopup,
  },
  data() {
    return {
      isActive: false,
      isChecked: this.checked,
      showPolicyPopup: false,
      policy: {
        href: '',
        text: '',
      },
    };
  },
  props: {
    title: { type: String },
    titleClass: { type: String },
    subtitle: { type: String },
    checkboxText: { type: String },
    btnText: { type: String },
    typeCtrl: { type: String },
    typeBtn: { type: String },
    checked: { type: Boolean, required: false },
    submitDisabled: { type: Boolean, required: false },
    isVertical: { type: Boolean },
  },
  watch: {
    showPolicyPopup() {
      this.hideYScroll();
    },
  },
  methods: {
    onClickBtn() {
      this.$emit('click');
    },

    changeSoglClickHandler() {
      this.isChecked = !this.isChecked;
    },

    showPolicyPopupClickHandler() {
      this.showPolicyPopup = true;
    },

    hideYScroll() {
      const htmlWrapper = document.querySelector('html');
      const bodyWrapper = document.querySelector('body');

      if (this.showPolicyPopup) {
        htmlWrapper.style.overflow = 'hidden';
        bodyWrapper.style.overflow = 'hidden';
      } else {
        htmlWrapper.style.overflow = 'initial';
        bodyWrapper.style.overflow = 'initial';
      }
    },
  },
  computed: {
    classes() {
      return {
        'm-form--vertical': this.isVertical,
      };
    },
    isSubmitDisabled: {
      get() {
        return this.submitDisabled;
      },
      set(value) {
        this.$emit('submit-disabled', value);
      },
    },
  },
  created() {
    this.policy.href = this.$store.state.globalData.globalData.data.privacy_policy.link;
    this.policy.text = this.$store.state.globalData.globalData.data.privacy_policy.text;
    this.policy.text_full = this.$store.state.globalData.globalData.data.privacy_policy.text_full;
  },
};
</script>
