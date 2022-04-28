<template>
  <section class="s-program-price" ref="form" id="form-price" v-if="fieldsData.product_id">
    <div class="l-wide l-border-radius">
      <APopup :visible="isPopupPrice" @close="closePopup" type="iframe" :link="payment"> </APopup>
      <APopup :visible="accountAlreadyExists" @close="closeAccountAlreadyExistsPopup">
        <div class="s-program-price__exist">
          <span class="s-program-price__exist-text">
            Учетная запись с такими данными уже существует<br />
            Войдите через учетную запись Synergy ID</span
          >
          <a-button class="s-program-price__exist-button" bgColor="accent" label="Авторизоваться" @click="login" />
        </div>
      </APopup>
      <APopup
        class="s-program-price__confirmation"
        :visible="confirmationCodePopup"
        @close="closeConfirmationCodePopup"
      >
        <div class="s-program-price__confirmation-content">
          <h2 class="s-program-price__confirmation-title">Вам поступит звонок</h2>
          <div class="s-program-price__confirmation-telephone">
            <span class="s-program-price__confirmation-number">+7</span>
            <span class="s-program-price__confirmation-number">000</span>
            <span class="s-program-price__confirmation-number">000</span>
            <span class="s-program-price__confirmation-number code">12</span>
            <span class="s-program-price__confirmation-number code">34</span>
          </div>
          <p class="s-program-price__confirmation-text">
            Введите последние 4 цифры номера,<br />с которого Вам позвонят
          </p>
          <span class="s-program-price__confirmation-warn"
            >Если вы абонент Билайна, то вместо звонка вам придёт смс.</span
          >
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
            @click="resendConfirmationCode"
          />
          <!--          <a-button-->
          <!--            v-if="!sendCode && +timeLeft <= 0"-->
          <!--            class="s-program-price__confirmation-button"-->
          <!--            label="Получить код по СМС"-->
          <!--            bgColor="none"-->
          <!--            @click="getConfirmationCode('sms')"-->
          <!--          />-->
        </div>
      </APopup>
      <m-form-pay
        class="s-program-price__form"
        :class="{ authorized: isAuthenticated }"
        :title="title"
        :iconSrc="`${baseUrl}${iconSrc}`"
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
          <div class="s-program-price__authorized" v-if="userInfo">
            <div class="s-program-price__authorized-row">
              <span class="s-program-price__authorized-label">Имя</span>
              <span class="s-program-price__authorized-value">{{ userInfo.account_information.name }}</span>
            </div>
            <div class="s-program-price__authorized-row" v-if="userInfo.email">
              <span class="s-program-price__authorized-label">Почта</span>
              <span class="s-program-price__authorized-value">{{ userInfo.email.email }}</span>
            </div>
            <div class="s-program-price__authorized-row" v-if="userInfo.phone">
              <span class="s-program-price__authorized-label">Телефон</span>
              <span class="s-program-price__authorized-value">{{ userInfo.phone.phone }}</span>
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
            v-model="fieldsData.patronymic"
            @input="validFormData"
            placeholder="Отчество (при наличии)"
            @focus="changeFocusInput"
            @blur="changeBlurInput"
          />
          <span v-if="emailAlreadyTaken" class="m-form__input-error">Такой email уже занят</span>
          <a-input
            class="m-form__input"
            :class="{ 'error-mail': !emailErrorFlag }"
            v-model="fieldsData.email"
            @input="validFormData"
            placeholder="Электронная почта"
            @focus="changeFocusInput"
            @blur="changeBlurInput"
          />
          <span v-if="phoneAlreadyTaken" class="m-form__input-error">Такой телефон уже занят</span>
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
          <span v-if="unknownError" class="m-form__input-error unknown">Неизвестная ошибка. Попробуйте позже</span>
        </template>
      </m-form-pay>
    </div>
  </section>
</template>

<script>
/* eslint-disable max-len */
import {
  AInput, APopup, AControl, AButton,
} from '@cwespb/synergyui';
import { VueTelInput } from 'vue-tel-input';
import MFormPay from '~/components/_ui/m_form_pay/m_form_pay';
// import getConfirmationCode from '~/api/confirmationCode';
// import checkConfirmationCode from '~/api/checkConfirmationCode';
import getProductsDetails from '~/api/productsDetail';
import './s_program_price.scss';
import getDateFromDatesObj from '~/assets/js/getDateFromDatesObj';
import getParseDate from '~/assets/js/getParseDate';
import getOrganizationsDetail from '~/api/organizationsDetail';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapGetters } from 'vuex';

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

      emailAlreadyTaken: false,
      phoneAlreadyTaken: false,
      unknownError: false,
      accountAlreadyExists: false,

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
      timeLimit: 120,
      timePassed: 0,

      code: '',
      values: vals,
      autoFocusIndex,
      completed: false,

      isPopup: false,
      paymentLink: '',

      baseUrl: process.env.NUXT_ENV_S3BACKET,
    };
  },

  computed: {
    ...mapGetters({
      userInfo: 'auth/userInfo',
    }),
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
        this.userInfo?.phone?.status === 'confirmed'
        && Boolean(this.userInfo.account_information?.name)
        && Boolean(this.userInfo.account_information?.surname)
        && Boolean(this.userInfo.account_information?.patronymic)
      );
    },
    btnText() {
      return !this.isAuthenticated || (this.isAuthenticated && this.isEnoughtData)
        ? 'Перейти к оплате'
        : 'Заполнить данные';
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
    if (this.$store.state.auth.refresh_token) {
      await this.$store.dispatch('auth/refresh');
    }
    this.$emit('form-ref', this.$refs.form);
    const loadDataForm = this.$lander.storage.load('programpriceform');
    if (loadDataForm) this.fieldsData = loadDataForm;

    const detailsExpandedMethod = {
      filter: {
        slug: this.$route.params.slug,
      },
      include: ['offers'],
    };
    const detailsData = await getProductsDetails(detailsExpandedMethod);

    this.fieldsData = {
      product_id: '105734098',
      // product_id: detailsData.data?.included?.offers[0]?.product_id ?? '', // TODO: После апдейта эластика - вернуть как null
      birthdate: this.userInfo?.account_information?.birthday ?? '01.01.1901',
      is_order: 'Y',
      gender: this.userInfo?.account_information?.gender ?? '-',
      name: this.userInfo?.account_information?.name ?? '',
      surname: this.userInfo?.account_information?.surname ?? '',
      patronymic: this.userInfo?.account_information?.patronymic ?? '',
      phone: this.userInfo?.phone?.phone ?? '',
      email: this.userInfo?.email?.email ?? '',
      publicOffer: 'on',
    };

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
        product_id: detailsData.organization_id,
      },
      include: ['persons', 'city', 'triggers'],
    };
    const organizationsData = await getOrganizationsDetail(organizationsExpandedMethod);
    this.text = organizationsData.data?.abbreviation_name;
    this.iconSrc = organizationsData.data?.logo;
  },

  methods: {
    login() {
      this.$store.dispatch('auth/login');
    },

    closeAccountAlreadyExistsPopup() {
      this.accountAlreadyExists = false;
    },

    onFormButtonClickHandler() {
      if (this.isAuthenticated) {
        if (this.isEnoughtData) {
          this.sendForm();
        } else {
          window.location.href = `//${
            process.env.NODE_ENV === 'development' ? 'ogm-002-2640.c4.syndev.ru' : 'pass.synergy.ru'
          }/edit?redirectUrl=${window.location.href}`;
        }
      } else if (this.checkedValidateError()) {
        this.getConfirmationCode();
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

    async resendConfirmationCode() {
      this.codeError = false;
      this.startTimer();

      let formattedPhone = this.fieldsData.phone.replace(/\s+/g, '').replace(/[^0-9]/g, '');
      if (formattedPhone[0] === '8') {
        formattedPhone = formattedPhone.replace('8', '7');
      }

      await this.$axios.post(
        `${
          process.env.NODE_ENV === 'development' ? 'https://ogm-111-2795.c4.syndev.ru/' : 'https://pass.synergy.ru/'
        }auth/api/sid/v1/public/registration/resend/call`,
        {
          phone: formattedPhone,
        },
      );
    },

    async getConfirmationCode() {
      this.codeError = false;
      this.emailAlreadyTaken = false;
      this.phoneAlreadyTaken = false;
      this.accountAlreadyExists = false;
      this.startTimer();

      let formattedPhone = this.fieldsData.phone.replace(/\s+/g, '').replace(/[^0-9]/g, '');
      if (formattedPhone[0] === '8') {
        formattedPhone = formattedPhone.replace('8', '7');
      }

      const requestData = {
        name: this.fieldsData.name,
        surname: this.fieldsData.surname,
        patronymic: this.fieldsData?.patronymic,
        email: this.fieldsData?.email,
        phone: +formattedPhone,
      };

      try {
        await this.$axios.post(
          `${
            process.env.NODE_ENV === 'development' ? 'https://ogm-111-2795.c4.syndev.ru/' : 'https://pass.synergy.ru/'
          }auth/api/sid/v1/public/registration`,
          requestData,
        );
        this.confirmationCodePopup = true;
      } catch (error) {
        const errors = error?.response?.data?.errors?.validation;
        if (Object.hasOwn(errors, 'email')) {
          this.emailAlreadyTaken = true;
          this.accountAlreadyExists = true;
        }

        if (Object.hasOwn(errors, 'phone')) {
          this.phoneAlreadyTaken = true;
          this.accountAlreadyExists = true;
        }

        if (error?.response?.data?.errors?.pipeline_exception?.error_code === 'AUTH:000') {
          this.unknownError = true;
        }
      }
    },

    async sendConfirmationCode() {
      this.codeError = false;

      let formattedPhone = this.fieldsData.phone.replace(/\s+/g, '').replace(/[^0-9]/g, '');
      if (formattedPhone[0] === '8') {
        formattedPhone = formattedPhone.replace('8', '7');
      }

      const requestData = {
        code: this.code,
        phone: +formattedPhone,
      };

      try {
        await this.$axios
          .post(
            `${
              process.env.NODE_ENV === 'development' ? 'https://ogm-111-2795.c4.syndev.ru/' : 'https://pass.synergy.ru/'
            }auth/api/sid/v1/public/registration/confirm`,
            requestData,
          )
          .then((response) => {
            this.uuid = response?.data?.data?.account_uuid;
            this.closeConfirmationCodePopup();
            // this.sendFormToBitrix();
            this.sendForm();
          });
      } catch (error) {
        if (error.response.data.errors.pipeline_exception.status === 408) {
          this.codeError = true;
        }
      }
    },

    onTimesUp() {
      this.resend = false;
      clearInterval(this.timerInterval);
    },

    startTimer() {
      this.timeLimit = 120;
      this.timePassed = 0;
      // eslint-disable-next-line no-return-assign
      this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
    },

    // async sendFormToBitrix() {
    //   let formattedPhone = this.fieldsData.phone.replace(/\s+/g, '').replace(/[^0-9]/g, '');
    //   if (formattedPhone[0] === '8') {
    //     formattedPhone = formattedPhone.replace('8', '7');
    //   }
    //
    //   const requestData = {
    //     data: {
    //       LAST_NAME: this.fieldsData.surname,
    //       NAME: this.fieldsData.name,
    //       SECOND_NAME: this.fieldsData.patronymic,
    //       UF_SYNERGYID: this.uuid,
    //       LAND_CODE: 'KD_market',
    //       FM: {
    //         EMAIL: {
    //           n0: {
    //             VALUE: this.fieldsData.email,
    //             VALUE_TYPE: 'VERIFIED',
    //           },
    //         },
    //         PHONE: {
    //           n0: {
    //             VALUE: +formattedPhone,
    //             VALUE_TYPE: 'VERIFIED',
    //           },
    //         },
    //       },
    //     },
    //     params: {
    //       v2: '1',
    //       action: 'ContactAdd',
    //       token: '78CF4367155B97F4FD9868D1B5D',
    //     },
    //   };
    //
    //   await this.$axios.post('https://corp.synergy.ru/api/v2/', requestData);
    // },

    sendForm() {
      const lander = {
        type: 'academy',
        unit: 'payments',
        land: 'KD_market',
        noRedirect: true,
      };
      this.$store.commit('updateLander', lander);
      const currentData = this.fieldsData;
      window.localStorage.setItem('fieldsData', JSON.stringify(this.fieldsData));
      currentData.name = `${this.fieldsData.name} ${this.fieldsData.surname} ${this.fieldsData.patronymic}`;
      currentData.successPage = `https://${document.location.host}/payment-thanks${
        this.uuid ? `?uuid=${this.uuid}` : '/'
      }`;
      currentData.guid_synergy_id = this.uuid;
      const resp = this.$lander.send(currentData, lander);

      resp
        .then(() => {
          const formData = this.fieldsData;
          formData.isPayment = '';
          const respPrice = this.$lander.send(formData, lander);
          respPrice
            .then((result) => result.response.data)
            .then((priceData) => {
              this.getPaymentSrc(priceData);
            });
        })
        .catch(() => {
          window.localStorage.removeItem('fieldsData');
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
      return this.nameErrorFlag && this.surnameErrorFlag && this.emailErrorFlag && this.validPhone;
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
