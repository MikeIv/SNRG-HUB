<template>
  <section class="s-program-price" ref="form" id="form-price">
    <APopup :visible="isPopupPrice" @close="closePopup" type="iframe" :link="payment"> </APopup>
    <m-form-pay
      :title="title"
      :iconSrc="iconSrc"
      :text="text"
      :courseName="courseName"
      :years="years"
      :study="study"
      :priceText="priceText"
      :oldPrice="oldPrice"
      :currentPrice="currentPrice"
      :formTitle="formTitle"
      :btnText="btnText"
      :checkboxText="checkboxText"
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
          :class="{ 'error-name': !validName }"
          @input="
            handlerSave();
            validFormData();
          "
          v-model="fieldsData.firstName"
          placeholder="Фамилия"
        />
        <a-input
          class="m-form__input"
          :class="{ 'error-name': !validName }"
          @input="
            handlerSave();
            validFormData();
          "
          v-model="fieldsData.surname"
          placeholder="Имя"
        />
        <a-input
          class="m-form__input"
          :class="{ 'error-name': !validName }"
          @input="
            handlerSave();
            validFormData();
          "
          v-model="fieldsData.patronymic"
          placeholder="Отчество (при наличии)"
        />
        <a-input
          class="m-form__input"
          :class="{ 'error-mail': !validFlag }"
          v-model="fieldsData.email"
          @input="
            handlerSave();
            validFormData();
          "
          placeholder="Электронная почта"
        />
        <vue-tel-input
          class="m-form__input"
          :class="{ error: !validPhone }"
          v-bind="vueTelOpts"
          type="phone"
          placeholder="Телефон"
          @validate="validFormData"
          v-model="fieldsData.phone"
          @input="validatePhone"
        />
      </template>
    </m-form-pay>
  </section>
</template>

<script>
import { MFormPay, AInput, APopup } from '@cwespb/synergyui';
import { VueTelInput } from 'vue-tel-input';
import './s_program_price.scss';

export default {
  name: 's_program_price',

  components: {
    MFormPay,
    AInput,
    VueTelInput,
    APopup,
  },

  data: () => ({
    title: 'Стоимость программы',
    formTitle: 'Зарегистрироваться и оплатить',
    checkboxText: 'Нажимая на кнопку, вы соглашаетсь с политикой конфиденциальности и на получение рассылок',
    btnText: 'Записаться',
    typeCtrl: 'checkbox',
    typeBtn: 'checkbox',
    checked: true,
    validFlag: false,
    validName: false,
    validPhone: false,
    disabled: 'false',
    courseName: 'Информатика и вычислительная техника. Автоматизированное управление бизнес-процессами и финансами',
    years: '4 года 6 месяцев',
    study: 'Бакалавриат',
    priceText: 'Стоимость курса',
    oldPrice: '45550 ₽',
    currentPrice: '35 000 ₽',
    iconSrc: 'https://sys3.ru/marketplace/uploads/organizations/yuIYPVAzTpYhkDo2acWAZAMLpIh4LiRGttzzlyFs.svg',
    text: 'Университет Синергия',
    fieldsData: {
      product_id: '71618903',
      birthdate: '01.01.1901',
      is_order: 'Y',
      gender: '-',
      firstName: '',
      phone: '',
      email: '',
      publicOffer: 'on',
    },
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
    maxPhoneLength: 16,
    isPopup: false,
    paymentLink: '',
  }),

  computed: {
    isPopupPrice() {
      return this.isPopup;
    },
    payment() {
      return this.paymentLink;
    },
  },

  mounted() {
    this.$emit('form-ref', this.$refs.form);
    const loadDataForm = this.$lander.storage.load('programpriceform');
    if (loadDataForm) this.fieldsData = loadDataForm;
  },

  methods: {
    sendForm() {
      const lander = {
        type: 'academy',
        unit: 'payments',
        land: 'KD_market',
        redirectUrl: '',
      };
      this.$store.commit('updateLander', lander);
      const currentData = this.fieldsData;
      currentData.name = `${this.fieldsData.firstName} ${this.fieldsData.surname} ${this.fieldsData.patronymic}`;
      const resp = this.$lander.send(currentData, lander);

      resp.then(() => {
        const formData = this.fieldsData;
        formData.isPayment = '';
        const respPrice = this.$lander.send(formData, lander);
        respPrice
          .then((result) => result.response.data)
          .then((priceData) => {
            this.getPaymentSrc(priceData);
          });
      });
    },
    getPaymentSrc(data) {
      const responseHTML = data;
      const htmlObject = document.createElement('div');
      htmlObject.innerHTML = responseHTML;
      const buttons = htmlObject.querySelectorAll('.form__button');
      buttons.forEach((el) => {
        const attr = el.getAttribute('data-src');
        if (attr) {
          this.paymentLink = attr;
        }
      });
      this.isPopup = true;
    },
    closePopup() {
      this.isPopup = false;
    },
    handlerSave() {
      const dataToSend = { ...this.fieldsData };
      delete dataToSend.comments;
      this.$lander.storage.save('sprogramformprice', dataToSend);
    },
    validatePhone(phone, { valid, number }) {
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
    },
    validFormData() {
      const dataForm = [{ value: this.fieldsData.name }, { value: this.fieldsData.email, type: 'email' }];
      this.validFlag = this.$lander.valid(dataForm) && this.validPhone;
      if (/^[A-ZА-ЯЁ]+$/i.test(this.fieldsData.name)) {
        this.validName = true;
      } else {
        this.validName = false;
      }
    },
  },
};
</script>
