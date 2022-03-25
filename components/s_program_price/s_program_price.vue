<template>
  <section class="s-program-price" ref="form" id="form-price" v-if="fieldsData.product_id">
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

        <span v-if="+timeLeft > 0 && !sendCode" class="s-program-price__confirmation-message">
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
          v-if="!sendCode && +timeLeft <= 0"
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
      class="s-program-price__form"
      :class="{ authorized: isAuthenticated }"
      :title="title"
      :iconSrc="iconSrc"
      :text="text"
      :courseName="courseName"
      :years="years"
      :study="study"
      :priceText="priceText"
      :oldPrice="oldPrice"
      :currentPrice="currentPrice"
      :formTitle="isAuthenticated ? 'Оплатить' : formTitle"
      :btnText="btnText"
      :checkboxText="checkboxText"
      :typeCtrl="typeCtrl"
      :typeBtn="typeBtn"
      :checked="checked"
      :submitDisabled="!validFlag"
      @submit-disabled="validFlag = $event"
      @click="onFormButtonClickHandler"
    >
      <template v-if="isAuthenticated" v-slot:inputs>
        <div class="s-program-price__authorized" v-if="user">
          <div class="s-program-price__authorized-row">
            <span class="s-program-price__authorized-label">Имя</span>
            <span class="s-program-price__authorized-value">{{ user.account_information.name }}</span>
          </div>
          <div class="s-program-price__authorized-row" v-if="user.email">
            <span class="s-program-price__authorized-label">Почта</span>
            <span class="s-program-price__authorized-value">{{ user.email.email }}</span>
          </div>
          <div class="s-program-price__authorized-row" v-if="user.phone">
            <span class="s-program-price__authorized-label">Телефон</span>
            <span class="s-program-price__authorized-value">{{ user.phone.phone }}</span>
          </div>
        </div>
      </template>
      <template v-else v-slot:inputs>
        <a-input
          class="m-form__input"
          :class="{ 'error-name': !surnameErrorFlag }"
          @input="validFormData"
          v-model="fieldsData.surname"
          placeholder="Фамилия"
          @focus="changeFocusInput"
          @blur="changeBlurInput"
        />
        <a-input
          class="m-form__input"
          :class="{ 'error-name': !nameErrorFlag }"
          @input="validFormData"
          v-model="fieldsData.name"
          placeholder="Имя"
          @focus="changeFocusInput"
          @blur="changeBlurInput"
        />
        <a-input
          class="m-form__input"
          :class="{ 'error-name': !patronymicErrorFlag }"
          @input="validFormData"
          v-model="fieldsData.patronymic"
          placeholder="Отчество (при наличии)"
          @focus="changeFocusInput"
          @blur="changeBlurInput"
        />
        <a-input
          class="m-form__input"
          :class="{ 'error-mail': !emailErrorFlag }"
          v-model="fieldsData.email"
          @input="validFormData"
          placeholder="Электронная почта"
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
        />
      </template>
    </m-form-pay>
  </section>
</template>

<script>
/* eslint-disable max-len */
import { AInput, APopup, AControl, AButton } from '@cwespb/synergyui';
import { VueTelInput } from 'vue-tel-input';
import MFormPay from '~/components/_ui/m_form_pay/m_form_pay';
import getConfirmationCode from '~/api/confirmationCode';
import checkConfirmationCode from '~/api/checkConfirmationCode';
import parseJWT from '~/assets/js/parseJWT';
import getProductsDetails from '~/api/productsDetail';
import './s_program_price.scss';
import getDateFromDatesObj from '~/assets/js/getDateFromDatesObj';
import getParseDate from '~/assets/js/getParseDate';
import getOrganizationsDetail from '~/api/organizationsDetail';

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
      courseName: 'Информатика и вычислительная техника. Автоматизированное управление бизнес-процессами и финансами',
      years: '4 года 6 месяцев',
      study: '',
      priceText: 'Стоимость курса',
      oldPrice: null,
      currentPrice: '',
      iconSrc: '',
      text: '',

      typeCtrl: 'checkbox',
      typeBtn: 'checkbox',
      checked: true,
      validFlag: false,
      validPhone: false,
      nameErrorFlag: true,
      surnameErrorFlag: true,
      patronymicErrorFlag: true,
      emailErrorFlag: true,
      phoneErrorFlag: true,

      fieldsData: {},
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

      confirmationCodePopup: false,
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

      user: null,
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
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated'];
    },
    isEnoughtData() {
      return (
        this.user?.phone?.status === 'confirmed' &&
        Boolean(this.user.account_information?.name) &&
        Boolean(this.user.account_information?.surname) &&
        Boolean(this.user.account_information?.patronymic)
      );
    },
    btnText() {
      return !this.isAuthenticated || (this.isAuthenticated && this.isEnoughtData)
        ? 'Перейти к оплате'
        : 'Заполнить данные';
    },
    successPage() {
      return this.isAuthenticated
        ? `https://${document.location.host}/payment-thanks`
        : `https://${document.location.host}/payment-thanks?name=${this.fieldsData.name}&surname=${this.fieldsData.surname}&patronymic=${this.fieldsData.patronymic}&phone=${this.fieldsData.phone}&email=${this.fieldsData.email}`;
    },
  },

  watch: {
    timeLeft(newValue) {
      if (newValue === 0) {
        this.onTimesUp();
      }
    },
  },

  async mounted() {
    this.$emit('form-ref', this.$refs.form);
    const loadDataForm = this.$lander.storage.load('programpriceform');
    if (loadDataForm) this.fieldsData = loadDataForm;

    this.user = parseJWT(this.$store.state.auth.access_token);
    this.fieldsData = {
      product_id: '71618903', // TODO: После апдейта эластика - вернуть как null
      birthdate: this.user?.account_information?.birthday ?? '01.01.1901',
      is_order: 'Y',
      gender: this.user?.account_information?.gender ?? '-',
      name: this.user?.account_information?.name ?? '',
      surname: this.user?.account_information?.surname ?? '',
      patronymic: this.user?.account_information?.patronymic ?? '',
      phone: this.user?.phone?.phone ?? '',
      email: this.user?.email?.email ?? '',
      publicOffer: 'on',
    };

    const detailsExpandedMethod = {
      filter: {
        slug: this.$route.params.slug,
      },
      include: ['offers'],
    };
    const detailsData = await getProductsDetails(detailsExpandedMethod);
    this.courseName = `${detailsData.data.name}`;
    const durationFormatValue = detailsData.data.duration_format_value;
    if (durationFormatValue) {
      this.years = getDateFromDatesObj(getParseDate(detailsData.data.duration_format_value));
    }
    this.currentPrice = `${detailsData.data?.included?.offers[0]?.price} ₽`;
    // eslint-disable-next-line max-len
    this.oldPrice = detailsData.data?.included?.offers[0]?.oldPrice
      ? `${detailsData.data?.included?.offers[0]?.oldPrice} ₽`
      : null;
    // this.fieldsData.product_id = detailsData.data?.included?.offers[0]?.product_id ?? null; //TODO:ВЕРНУТЬ ПОСЛЕ ОБНОВЛЕНИЯ ЭЛАСТИКА

    // eslint-disable-next-line prefer-destructuring
    this.study = detailsData.data?.included?.offers[0]?.properties['App\\Models\\Format'].join(' ');

    const organizationsExpandedMethod = {
      filter: {
        product_id: this.fieldsData.product_id,
      },
      include: ['persons', 'city', 'triggers'],
    };
    const organizationsData = await getOrganizationsDetail(organizationsExpandedMethod);
    this.text = organizationsData.data?.abbreviation_name;
    this.iconSrc = `https://sys3.ru/marketplace/${organizationsData.data?.logo}`;
  },

  methods: {
    onFormButtonClickHandler() {
      if (this.isAuthenticated) {
        if (this.isEnoughtData) {
          this.sendForm();
        } else {
          window.location.href = `//pass.synergy.ru/edit?redirectUrl${this.$route.fullPath}`;
        }
      } else if (this.checkedValidateError()) {
        this.getConfirmationCode('call', false);
      }
    },
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

    async getConfirmationCode(type) {
      this.codeError = false;
      this.startTimer();

      let formattedPhone = this.fieldsData.phone.replace(/\s+/g, '').replace(/[^0-9]/g, '');
      if (formattedPhone[0] === '8') {
        formattedPhone = formattedPhone.replace('8', '7');
      }

      const requestData = {
        type,
        phone: +formattedPhone,
      };
      await getConfirmationCode(requestData).then((response) => {
        this.uuid = response.uuid;
        this.confirmationCodePopup = true;
      });
    },

    async sendConfirmationCode() {
      this.codeError = false;

      const requestData = {
        uuid: this.uuid,
        code: this.code,
      };

      await checkConfirmationCode(requestData)
        .then(() => {
          this.closeConfirmationCodePopup();
          this.sendForm();
        })
        .catch(() => {
          this.codeError = true;
        });
    },

    onTimesUp() {
      this.resend = false;
      clearInterval(this.timerInterval);
    },

    startTimer() {
      this.timeLimit = 60;
      this.timePassed = 0;
      // eslint-disable-next-line no-return-assign
      this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
    },

    sendForm() {
      const lander = {
        type: 'academy',
        unit: 'payments',
        land: 'KD_market',
      };
      this.$store.commit('updateLander', lander);
      const currentData = this.fieldsData;
      currentData.name = `${this.fieldsData.name} ${this.fieldsData.surname} ${this.fieldsData.patronymic}`;
      currentData.successPage = this.successPage;
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
          console.log(this.paymentLink);
        }
      });
      window.location.href = this.paymentLink;
    },
    closePopup() {
      this.isPopup = false;
    },
    closeConfirmationCodePopup() {
      this.confirmationCodePopup = false;
      this.values = Array(4).fill('');
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
      this.surnameErrorFlag = /^([A-ZА-ЯЁ][-,a-z, a-яё. ']+[ ]*)+$/i.test(this.fieldsData.surname);
      this.patronymicErrorFlag = /^([A-ZА-ЯЁ][-,a-z, a-яё. ']+[ ]*)+$/i.test(this.fieldsData.patronymic);
      this.emailErrorFlag = this.$lander.valid([{ value: this.fieldsData.email, type: 'email' }]);
      this.phoneErrorFlag = this.validPhone === true && this.fieldsData.phone !== '';
      // eslint-disable-next-line max-len
      return (
        this.nameErrorFlag &&
        this.surnameErrorFlag &&
        this.patronymicErrorFlag &&
        this.emailErrorFlag &&
        this.validPhone
      );
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
