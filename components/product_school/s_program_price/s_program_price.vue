<template>
  <section class="s-program-price" ref="form" id="form-price" :class="formClass">
    <div class="s-program-price__info">
      <h3 class="s-program-price__title a-font_h5">{{ title }}</h3>
      <div class="s-program-price__items">
        <div class="s-program-price__item" v-for="(item, id) in pricesItems" :key="id">
          <div class="s-program-price__classes s-program-price__item-column">
            <div class="s-program-price__classes-title s-program-price__item-title a-font_l">
              {{ item.class.title }}
            </div>
            <div class="s-program-price__classes-text s-program-price__item-text a-font_xl">{{ item.class.text }}</div>
          </div>
          <div class="s-program-price__month s-program-price__item-column">
            <div class="s-program-price__month-title s-program-price__item-title a-font_l">{{ item.month.title }}</div>
            <div class="s-program-price__month-text s-program-price__item-text a-font_xl">{{ item.month.price }}</div>
          </div>
          <div class="s-program-price__year s-program-price__item-column">
            <div class="s-program-price__year-title s-program-price__item-title a-font_l">{{ item.prices.title }}</div>
            <div class="s-program-price__year-oldprice s-program-price__item-text a-font_xl">
              {{ item.prices.priceOld }}
            </div>
            <div class="s-program-price__year-price a-font_h5">{{ item.prices.priceNow }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="s-program-price__form">
      <m-form
        :title="formTitle"
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
            class="m-form__input a-input__wrapper"
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
import { AInput } from '@cwespb/synergyui';
import MForm from '@/components/_ui/m_form/m_form';
import './s_program_price.scss';

export default {
  name: 's_program_price',

  props: ['formClass'],

  components: {
    MForm,
    AInput,
    VueTelInput,
  },

  data: () => ({
    title: 'Стоимость обучения',
    pricesItems: [
      {
        class: {
          title: 'Класс',
          text: '5 — 8',
        },
        month: {
          title: 'Месяц',
          price: '13 000 ₽',
        },
        prices: {
          title: 'Учебный год',
          priceOld: '105 000 ₽',
          priceNow: '95 000 ₽',
        },
      },
      {
        class: {
          title: 'Класс',
          text: '9 — 10',
        },
        month: {
          title: 'Месяц',
          price: '15 000 ₽',
        },
        prices: {
          title: 'Учебный год',
          priceOld: '105 000 ₽',
          priceNow: '95 000 ₽',
        },
      },
      {
        class: {
          title: 'Класс',
          text: '9 — 10',
        },
        month: {
          title: 'Месяц',
          price: '15 000 ₽',
        },
        prices: {
          title: 'Учебный год',
          priceOld: '120 000 ₽',
          priceNow: '105 000 ₽',
        },
      },
    ],

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
    formTitle: 'Поступить в онлайн-школу «Синергия»',

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

    validPhone: false,
  }),

  mounted() {
    this.$emit('form-ref', this.$refs.form);

    const loadDataForm = this.$lander.storage.load('programform');
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
      this.$lander.storage.save('programform', this.fieldsData);
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
