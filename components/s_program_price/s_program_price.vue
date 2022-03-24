<template>
  <section class="s-program-price" ref="form" id="form-price">
    <APopup :visible="isPopupPrice" @close="closePopup" type="iframe" :link="payment"> </APopup>
    <APopup class="s-program-price__confirmation" :visible="confirmationCodePopup" @close="closeConfirmationCodePopup">
      <div class="s-program-price__confirmation-content">
        <h2 class="s-program-price__confirmation-title">Вам поступит звонок</h2>
        <div class="s-program-price__confirmation-telephone">
          <span class="s-program-price__confirmation-number">+7</span>
          <span class="s-program-price__confirmation-number">000</span>
          <span class="s-program-price__confirmation-number">000</span>
          <span class="s-program-price__confirmation-number code">12</span>
          <span class="s-program-price__confirmation-number code">34</span>
        </div>
        <p class="s-program-price__confirmation-text">Введите последние 4 цифры номера,<br />с которого Вам позвонят</p>
        <div class="s-program-price__confirmation-inputs">
          <input
            v-for="(v, index) in values"
            :ref="iRefs[index]"
            :key="`${id}-${index}`"
            :autoFocus="index === autoFocusIndex"
            :pattern="[0 - 9]"
            :data-id="index"
            :value="v"
            class="s-program-price__confirmation-input"
            type="number"
            min="0"
            max="9"
            maxlength="1"
            size="1"
            :required="true"
            @input="onValueChange"
            @focus="onFocus"
            @keydown="onKeyDown"
          />
        </div>
        <a-control
          class="s-program-price__confirmation-checkbox"
          typeBtn="checkbox"
          typeCtrl="checkbox"
          title="Отправляя код, я соглашаюсь с политикой конфиденциальности и на получение рассылок"
          labelPosition="right"
          :checked="isChecked"
          @change="changePolicyControl"
        />

        <span v-if="codeError" class="s-program-price__confirmation-error">Введенный код неверен или истек</span>

        <span v-if="resend && !sendCode" class="s-program-price__confirmation-message">
          Повторный запрос через {{ formattedTimeLeft }}
        </span>

        <a-button
          v-if="sendCode"
          id="confirmButton"
          class="s-program-price__confirmation-button"
          label="Отправить"
          bgColor="accent"
          @click="sendConfirmationCode"
        />
        <a-button
          v-if="!sendCode && !resend"
          class="s-program-price__confirmation-button"
          label="Запросить код повторно"
          bgColor="ghost-primary"
          @click="getConfirmationCode('call', true)"
        />
        <a-button
          class="s-program-price__confirmation-button"
          label="Получить код по СМС"
          bgColor="none"
          @click="getConfirmationCode('sms')"
        />
      </div>
    </APopup>
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
      @click="getConfirmationCode('call', false)"
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
import {
  MFormPay, AInput, APopup, AControl, AButton,
} from '@cwespb/synergyui';
import { VueTelInput } from 'vue-tel-input';
import getConfirmationCode from '~/api/confirmationCode';
import checkConfirmationCode from '~/api/checkConfirmationCode';
import './s_program_price.scss';

const KEY_CODE = {
  backspace: 8,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
};

export default {
  name: 's_program_price',

  components: {
    MFormPay,
    AInput,
    VueTelInput,
    APopup,
    AControl,
    AButton,
  },

  data() {
    const { values } = this;
    let vals;
    let autoFocusIndex = 0;
    if (values && values.length) {
      vals = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < 4; i++) {
        vals.push(values[i] || '');
      }
      autoFocusIndex = values.length >= 4 ? 0 : values.length;
    } else {
      vals = Array(4).fill('');
    }
    this.iRefs = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 4; i++) {
      this.iRefs.push(`input_${i}`);
    }
    this.id = +new Date();

    return {
      title: 'Стоимость программы',
      formTitle: 'Зарегистрироваться и оплатить',
      checkboxText: 'Нажимая на кнопку, вы соглашаетсь с политикой конфиденциальности и на получение рассылок',
      btnText: 'Перейти к оплате',
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

      confirmationCodePopup: true,
      isChecked: true,
      uuid: null,
      codeError: false,

      resend: false,
      timerInterval: null,
      timeLimit: 60,
      timePassed: 0,

      code: '',
      values: vals,
      autoFocusIndex,
      completed: false,

      isPopup: false,
      paymentLink: '',
    };
  },

  computed: {
    isPopupPrice() {
      return this.isPopup;
    },
    payment() {
      return this.paymentLink;
    },
    sendCode() {
      return this.completed && this.isChecked;
    },
    timeLeft() {
      return this.timeLimit - this.timePassed;
    },
    formattedTimeLeft() {
      const { timeLeft } = this;
      const minutes = Math.floor(timeLeft / 60);
      let seconds = timeLeft % 60;

      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      return `${minutes}:${seconds}`;
    },
  },

  watch: {
    timeLeft(newValue) {
      if (newValue === 0) {
        this.onTimesUp();
        this.resend = false;
      }
    },
  },

  mounted() {
    this.$emit('form-ref', this.$refs.form);
    const loadDataForm = this.$lander.storage.load('programpriceform');
    if (loadDataForm) this.fieldsData = loadDataForm;
  },

  methods: {
    onFocus(e) {
      e.target.select(e);
    },

    onValueChange(e) {
      const index = parseInt(e.target.dataset.id, 10);
      const { type, fields } = this;
      if (type === 'number') {
        e.target.value = e.target.value.replace(/[^\d]/gi, '');
      }
      // this.handleKeys[index] = false;
      if (e.target.value === '' || (type === 'number' && !e.target.validity.valid)) {
        return;
      }
      let next;
      const { value } = e.target;
      let { values } = this;
      values = Object.assign([], values);
      if (value.length > 1) {
        let nextIndex = value.length + index - 1;
        if (nextIndex >= fields) {
          nextIndex = fields - 1;
        }
        next = this.iRefs[nextIndex];
        const split = value.split('');
        split.forEach((item, i) => {
          const cursor = index + i;
          if (cursor < fields) {
            values[cursor] = item;
          }
        });
        this.values = values;
      } else {
        next = this.iRefs[index + 1];
        values[index] = value;
        this.values = values;
      }
      if (next) {
        const element = this.$refs[next][0];
        element.focus();
        element.select();
      }
      this.triggerChange(values);
    },

    onKeyDown(e) {
      const index = parseInt(e.target.dataset.id, 10);
      const prevIndex = index - 1;
      const nextIndex = index + 1;
      const prev = this.iRefs[prevIndex];
      const next = this.iRefs[nextIndex];
      switch (e.keyCode) {
        case KEY_CODE.backspace: {
          e.preventDefault();
          const vals = [...this.values];
          if (this.values[index]) {
            vals[index] = '';
            this.values = vals;
            this.triggerChange(vals);
          } else if (prev) {
            vals[prevIndex] = '';
            this.$refs[prev][0].focus();
            this.values = vals;
            this.triggerChange(vals);
          }
          break;
        }
        case KEY_CODE.left:
          e.preventDefault();
          if (prev) {
            this.$refs[prev][0].focus();
          }
          break;
        case KEY_CODE.right:
          e.preventDefault();
          if (next) {
            this.$refs[next][0].focus();
          }
          break;
        case KEY_CODE.up:
        case KEY_CODE.down:
          e.preventDefault();
          break;
        default:
          break;
      }
    },

    triggerChange(values = this.values) {
      const val = values.join('');
      if (val.length >= 4) {
        this.completed = true;
        this.code = val;
      } else {
        this.completed = false;
        this.code = val;
      }
    },

    changePolicyControl() {
      this.isChecked = !this.isChecked;
    },

    async getConfirmationCode(type, resend) {
      this.codeError = false;

      let formattedPhone = this.fieldsData.phone.replace(/\s+/g, '').replace(/[^0-9]/g, '');
      if (formattedPhone[0] === '8') {
        formattedPhone = formattedPhone.replace('8', '7');
      }

      const requestData = {
        type,
        phone: +formattedPhone,
      };

      if (resend) {
        this.resend = true;
        this.timeLimit = 60;
        this.timePassed = 0;
        this.startTimer();

        await getConfirmationCode(requestData).then((response) => {
          this.uuid = response.uuid;
        });
      } else {
        await getConfirmationCode(requestData).then((response) => {
          this.uuid = response.uuid;
          this.confirmationCodePopup = true;
        });
      }
    },

    async sendConfirmationCode() {
      this.codeError = false;

      const requestData = {
        uuid: this.uuid,
        code: this.code,
      };

      await checkConfirmationCode(requestData)
        .then((response) => {
          console.log('confirmation success', response);
        })
        .catch(() => {
          this.codeError = true;
        });
    },

    onTimesUp() {
      this.resendCodeBtnAvailable = true;
      clearInterval(this.timerInterval);
    },

    startTimer() {
      // eslint-disable-next-line no-return-assign
      this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
    },

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
    closeConfirmationCodePopup() {
      this.confirmationCodePopup = false;
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
