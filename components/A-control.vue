<template>
  <label class="a-control__label" :class="labelItem">
    <div class="a-control__box">
      <input
        class="a-control__input"
        :type="typeBtn"
        v-model="myChecked"
        :checked="checked"
        :disabled="disabled"
        :value="valueControl"
        :name="name"

        @change="handleChange"
      />
      <span class="a-control__switch" :class="classes"></span>
    </div>
    <div :class="labelCtrl">
      <p class="">{{ title }}</p>
      <p class="a-control__label-control--text">{{ labelText }}</p>
    </div>
  </label>
</template>

<script>
import '~/assets/styles/A-control.scss';

export default {
  name: 'a-control',

  model: {
    prop: 'checked',
    event: 'input',
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    labelText: {
      type: String,
    },
    name: {
      type: String,
    },
    valueControl: {
      type: String,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    checked: {},
    labelBoxBr: {
      type: Boolean,
      required: false,
    },
    typeBtn: {
      type: String,
      validator(value) {
        return ['checkbox', 'radio'].indexOf(value) !== -1;
      },
    },
    typeCtrl: {
      type: String,
      validator(value) {
        return ['checkbox', 'radiobutton', 'switch'].indexOf(value) !== -1;
      },
    },
    labelPosition: {
      type: String,
      validator(value) {
        return ['left', 'right'].indexOf(value) !== -1;
      },
    },
    labelSize: {
      type: String,
      validator(value) {
        return ['default', 'small'].indexOf(value) !== -1;
      },
    },
    labelBoxSize: {
      type: String,
      validator(value) {
        return ['default', 'small'].indexOf(value) !== -1;
      },
    },
    labelBoxBg: {
      type: String,
      validator(value) {
        return ['default', 'color'].indexOf(value) !== -1;
      },
    },
  },
  methods: {
    handleChange() {
      this.$nextTick(function () {
        this.$emit('change');
      });
    },
  },

  computed: {
    classes() {
      return {
        'a-control': true,
        [`a-control__switch--${this.typeCtrl}`]: true,
      };
    },
    labelCtrl() {
      return {
        'a-control__label-control': true,
        [`a-control__label-control--${this.labelPosition}`]: true,
        [`a-control__label-control--${this.labelSize}`]: true,
      };
    },
    labelItem() {
      return {
        'a-control__label-box': true,
        [`a-control__label-box--${this.labelBoxSize}`]: true,
        [`a-control__label-box--${this.labelBoxBg}`]: true,
        [`a-control__label-box--${this.labelBoxBr}`]: true,
        'a-control__label-box--label-text': this.labelText,
      };
    },
    myChecked: {
      get() {
        return this.checked;
      },
      set(newValue) {
        this.$emit('input', newValue);
      },
    },
  },
};
</script>
