<template>
  <div class="m-form-pay">
    <div class="m-form-pay__title">
      <h2 class="a-font_h2">{{ title }}</h2>
    </div>
    <div class="m-form-pay__wrapper">
      <div class="m-form-pay__course course">
        <a-note class="m-form-pay__note" :text="text" :iconSrc="iconSrc" />
        <div class="course__title a-font_h6">{{ courseName }}</div>
        <div class="course__info a-font_m">
          <div class="course__row">
            <div class="course__row-left">Длительность курса</div>
            <div class="course__row-right" v-html="years"></div>
          </div>
          <div class="course__row">
            <div class="course__row-left">Формат обучения</div>
            <div class="course__row-right">{{ study }}</div>
          </div>
        </div>
        <div class="course__price">
          <div class="text a-font_xl">{{ priceText }}</div>
          <div class="oldPrice" v-if="oldPrice">{{ oldPrice }}</div>
          <div class="currentPrice">{{ currentPrice }}</div>
        </div>
      </div>
      <div class="m-form-pay__reg m-form">
        <div class="m-form__title">
          <h5 class="a-font_h5">{{ formTitle }}</h5>
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
            :disabled="!isChecked || isSend"
            :label="btnText"
            @click="onClickBtn"
            bgColor="accent"
          ></a-button>
          <div class="m-form__checkbox">
            <a-control
              :checked="isChecked"
              :typeCtrl="typeCtrl"
              :typeBtn="typeCtrl"
              :class="isActive"
              class="a-font_s"
              :labelText="checkboxText"
              @change="isChecked = !isChecked"
              :disabled="!checked"
            ></a-control>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ANote, AButton, AControl } from '@cwespb/synergyui';

import './m_form_pay.scss';

export default {
  name: 'M-form-pay',
  components: {
    AButton,
    AControl,
    ANote,
  },
  data() {
    return {
      isActive: false,
      isChecked: this.checked,
    };
  },
  props: {
    title: { type: String },
    formTitle: { type: String },
    checkboxText: { type: String },
    btnText: { type: String },
    typeCtrl: { type: String },
    typeBtn: { type: String },
    checked: { type: Boolean, required: false },
    courseName: { type: String },
    years: { type: String },
    study: { type: String },
    priceText: { type: String },
    oldPrice: { type: String },
    currentPrice: { type: String },
    iconSrc: { type: String },
    text: { type: String },
    isSend: { type: Boolean, required: false },
  },
  methods: {
    onClickBtn() {
      this.$emit('click');
    },
  },
};
</script>
