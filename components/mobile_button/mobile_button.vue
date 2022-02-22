<template>
  <div class="mobile-button" v-if="isScroll && windowWidth < 767">
    <a-button
      bgColor="accent"
      label="Подобрать программу"
      class="a-font_button mobile-button__btn"
      @click="togglePopup"
    ></a-button>

    <APopup @close="popupOptions.visible = false" :visible="popupOptions.visible">
      <MForm
        :title="popupOptions.form.title"
        :isVertical="popupOptions.form.isVertical"
        :btnText="popupOptions.form.btnText"
        :checkboxText="popupOptions.form.checkboxText"
        :checked="popupOptions.form.checked"
        :submitDisabled="!validFlag"
        @submit-disabled="validFlag = $event"
        typeCtrl="checkbox"
        @click="sendForm"
        ref="popupform-ref"
      >
        <template v-slot:inputs>
          <AInput
            class="m-form__input"
            :class="{ 'error-name': !nameErrorFlag }"
            @input="validFormData"
            v-model="fieldsData.name"
            placeholder="Имя"
          />

          <vue-tel-input
            class="m-form__input"
            :class="{ error: !phoneErrorFlag }"
            v-bind="vueTelOpts"
            type="phone"
            placeholder="Телефон"
            v-model="fieldsData.phone"
            @input="validatePhone"
          >
          </vue-tel-input>

          <AInput
            class="m-form__input"
            :class="{ 'error-mail': !emailErrorFlag }"
            @input="validFormData"
            v-model="fieldsData.email"
            placeholder="Почта"
          />
        </template>
      </MForm>
    </APopup>
  </div>
</template>

<script>
import { VueTelInput } from 'vue-tel-input';
import {
  AButton, APopup, MForm, AInput,
} from '@cwespb/synergyui';
import './mobile_button.scss';

export default {
  name: 'MobileButton',

  components: {
    AButton,
    APopup,
    MForm,
    AInput,
    VueTelInput,
  },

  data() {
    return {
      isScroll: false,
      scrollPosition: null,
      startPosition: null,
      menuOpen: false,
      validFlag: true,
      validName: false,
      validPhone: false,
      nameErrorFlag: true,
      emailErrorFlag: true,
      phoneErrorFlag: true,
      windowWidth: 0,
      popupOptions: {
        visible: false,
        form: {
          title: 'Оставьте заявку и мы поможем вам подобрать программу',
          isVertical: true,
          btnText: 'Подобрать',
          checkboxText: 'Нажимая на кнопку, я соглашаюсь с политикой конфиденциальности и на получение рассылок',
          checked: true,
        },
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
      fieldsData: {
        name: '',
        phone: '',
        email: '',
      },
    };
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('DOMContentLoaded', this.handleResize);

    this.handleResize();

    this.$emit('popupform-ref', this.$refs.form);

    const loadDataForm = this.$lander.storage.load('popupform');

    if (loadDataForm) this.fieldsData = loadDataForm;
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('DOMContentLoaded', this.handleResize);
  },

  methods: {
    handleScroll() {
      this.scrollPosition = window.scrollY;

      if (!this.startPosition) {
        this.startPosition = this.scrollPosition;
      } else {
        this.startPosition = 0;
        this.isScroll = true;
      }
    },
    togglePopup() {
      this.popupOptions.visible = true;
    },
    sendForm() {
      if (this.checkedValidateError()) {
        this.$lander
          .send(this.fieldsData, {}, this.$route.name === 'edu-platform-slug' ? this.$route.path : undefined)
          .then(() => {});
      }
    },

    handlerSave() {
      const dataToSend = { ...this.fieldsData };
      delete dataToSend.comments;
      this.$lander.storage.save('popupform-reg', dataToSend);
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
      this.$lander.storage.save('popupform-reg', this.fieldsData);
    },

    checkedValidateError() {
      this.nameErrorFlag = /^([A-ZА-ЯЁ][-,a-z, a-яё. ']+[ ]*)+$/i.test(this.fieldsData.name);
      this.emailErrorFlag = this.$lander.valid([{ value: this.fieldsData.email, type: 'email' }]);
      this.phoneErrorFlag = this.validPhone === true && this.fieldsData.phone !== '';
      return this.nameErrorFlag && this.emailErrorFlag && this.validPhone;
    },

    handleResize() {
      this.windowWidth = window.innerWidth;
    },
  },
};
</script>
