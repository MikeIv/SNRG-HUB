<template>
  <section class="s-program-form s-margin" ref="form" id="form">
    <div class="l-wide l-border-radius">
      <m-form
        :title="title"
        :checkboxText="checkboxText"
        :btnText="btnText"
        :typeCtrl="typeCtrl"
        :typeBtn="typeBtn"
        :checked="checked"
        :submitDisabled="!validFlag"
        @submit-disabled="validFlag = $event"
        @click="sendForm"
      >
        <template v-slot:inputs>
          <a-input
            class="m-form__input"
            :class="{ 'error-name': !nameErrorFlag }"
            @input="validFormData"
            v-model="fieldsData.name"
            placeholder="Имя"
            @focus="changeFocusInput"
            @blur="changeBlurInput"
          />
          <vue-tel-input
            class="m-form__input"
            :class="{ error: !phoneErrorFlag }"
            v-bind="vueTelOpts"
            type="phone"
            placeholder="Телефон"
            v-model="fieldsData.phone"
            @input="validatePhone"
            @focus="changeFocusInput"
            @blur="changeBlurInput"
          >
          </vue-tel-input>
          <a-input
            class="m-form__input"
            :class="{ 'error-mail': !emailErrorFlag }"
            @input="validFormData"
            v-model="fieldsData.email"
            placeholder="Почта"
            @focus="changeFocusInput"
            @blur="changeBlurInput"
          />
        </template>
      </m-form>
    </div>
  </section>
</template>

<script>
import { VueTelInput } from 'vue-tel-input';
import { MForm, AInput } from '@cwespb/synergyui';
import './s_program_form.scss';

export default {
  name: 's_program_form',

  props: {
    title: {
      type: String,
      required: false,
      default: 'Записаться на курс или получить бесплатную консультацию',
    },

    formProduct: {
      type: Object,
      required: false,
    },
  },

  components: {
    MForm,
    AInput,
    VueTelInput,
  },

  data: () => ({
    checkboxText: 'Нажимая на кнопку, вы соглашаетсь с политикой конфиденциальности и на получение рассылок',
    btnText: 'Записаться',
    typeCtrl: 'checkbox',
    typeBtn: 'checkbox',
    checked: true,
    validFlag: true,
    validName: false,
    nameErrorFlag: true,
    emailErrorFlag: true,
    phoneErrorFlag: true,

    fieldsData: {
      name: '',
      phone: '',
      email: '',
    },
    maxPhoneLength: 16,
    vueTelOpts: {
      mode: 'international',
      preferredCountries: ['RU', 'US'],
      wrapperClasses: '',
      inputClasses: '',
      autoFormat: true,
      defaultCountry: 'RU',
      inputOptions: {
        inputClasses: 'a-input a-input--large a-input--base',
        showDialCode: false,
        placeholder: 'Телефон',
        maxlength: 14,
      },
    },

    validPhone: false,
  }),

  mounted() {
    this.$emit('form-ref', this.$refs.form);

    const loadDataForm = this.$lander.storage.load('sprogramform');
    if (loadDataForm) this.fieldsData = loadDataForm;
  },

  methods: {
    sendForm() {
      if (this.formProduct) {
        this.fieldsData.comment = `Клик из формы попапа продукта: ${this.formProduct.name}`;
      }

      if (this.checkedValidateError()) {
        this.$lander
          .send(
            this.fieldsData,
            {},
            this.$route.name === 'edu-platform-slug' || this.$route.name === 'edu-platform'
              ? this.$route.path
              : undefined,
          )
          .then(() => {});
      }
    },
    handlerSave() {
      const dataToSend = { ...this.fieldsData };
      delete dataToSend.comments;
      this.$lander.storage.save('sprogramform', dataToSend);
    },
    validatePhone(phone, { valid, number }) {
      if (phone) {
        const telOpts = this.vueTelOpts;
        const inputOpts = telOpts.inputOptions;
        const isLocalCode = phone[0] === '8';

        inputOpts.maxlength = this.maxPhoneLength;
        telOpts.autoFormat = !isLocalCode;

        this.validPhone = valid && isLocalCode ? phone.length === 11 : valid;

        if (valid) {
          telOpts.mode = isLocalCode ? 'auto' : 'international';
          inputOpts.maxlength = isLocalCode ? 11 : number.length;
        } else {
          inputOpts.maxlength = 16;
        }

        this.validFormData();
      }
    },
    validFormData() {
      this.handlerSave();
    },
    checkedValidateError() {
      this.nameErrorFlag = /^([A-ZА-ЯЁ][-,a-z, a-яё. ']+[ ]*)+$/i.test(this.fieldsData.name);
      this.emailErrorFlag = this.$lander.valid([{ value: this.fieldsData.email, type: 'email' }]);
      this.phoneErrorFlag = this.validPhone === true && this.fieldsData.phone !== '';
      return this.nameErrorFlag && this.emailErrorFlag && this.validPhone;
    },
    changeFocusInput() {
      this.$store.commit('changeIsVisible', false);
    },
    changeBlurInput() {
      this.$store.commit('changeIsVisible', true);
    },
  },
};
</script>
