<template>
  <section class="s-banner-top" @click="goto">
    <div class="l-wide">
      <div class="s-banner-top__wrapper">
        <img class="s-banner-top__image" src="@/assets/images/s-banner-top.png" alt="image" />
        <div class="s-banner-top__text">
          <h2 class="s-banner-top__title">Разместите учебное заведение или программу обучения</h2>
          <h4 class="s-banner-top__subtitle">Попробуйте все инструменты бесплатно</h4>
        </div>
        <a-button
          class="s-banner-top__button"
          bgColor="accent"
          label="Оставить заявку"
          @click="showAddRequestPopupHandler"
        />
      </div>
    </div>
    <a-popup class="s-banner-top__popup" :visible="addRequestPopup" @close="addRequestPopup = false">
      <h2 class="s-banner-top__popup-title a-font_h4">Разместите учебное заведение или программу обучения</h2>
      <div class="s-banner-top__popup-content">
        <div class="s-banner-top__popup-inputs">
          <div class="s-banner-top__popup-row">
            <a-input
              class="s-banner-top__popup-input"
              @input="validFormData"
              v-model="fieldsData.name"
              placeholder="Имя"
            />
            <vue-tel-input
              class="s-banner-top__popup-input"
              v-bind="vueTelOpts"
              type="phone"
              placeholder="Телефон"
              v-model="fieldsData.phone"
              @input="validatePhone"
            >
            </vue-tel-input>
            <a-input
              class="s-banner-top__popup-input"
              @input="validFormData"
              v-model="fieldsData.email"
              placeholder="Почта"
            />
          </div>
          <div class="s-banner-top__popup-row">
            <a-input
              class="s-banner-top__popup-input institution"
              @input="validFormData"
              v-model="fieldsData.institution"
              placeholder="Название учебного заведения"
            />
            <a-button
              class="s-banner-top__button popup"
              :disabled="!isChecked || !validFlag"
              bgColor="accent"
              label="Отправить"
              @click="sendRequestHandler"
            />
          </div>
        </div>
        <a-control
          class="s-banner-top__popup-checkbox"
          :checked="isChecked"
          @change="isChecked = !isChecked"
          typeBtn="checkbox"
          typeCtrl="checkbox"
          title="Нажимая на кнопку, я соглашаюсь с политикой конфиденциальности и на получение рассылок"
          labelPosition="right"
        />
      </div>
    </a-popup>
  </section>
</template>

<script>
import { VueTelInput } from 'vue-tel-input';
import {
  AButton, APopup, AControl, AInput,
} from '@cwespb/synergyui';
import './s_banner_top.scss';

export default {
  name: 'SBannerTop',

  components: {
    AButton,
    APopup,
    AControl,
    AInput,
    VueTelInput,
  },

  data() {
    return {
      addRequestPopup: false,
      isChecked: true,

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

      redirectURL: 'https://synergyhub.ru/campus/',

      fieldsData: {
        name: '',
        phone: '',
        email: '',
        institution: '',
      },
      comments: {},
      land: {},

      validFlag: false,
      validPhone: false,
    };
  },

  methods: {
    validFormData() {
      const dataForm = [
        { value: this.fieldsData.name },
        { value: this.fieldsData.email, type: 'email' },
        { value: this.fieldsData.institution },
      ];
      this.validFlag = this.$lander.valid(dataForm) && this.validPhone;
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

    showAddRequestPopupHandler() {
      this.addRequestPopup = true;
    },

    sendRequestHandler() {
      this.comments = {
        'comments[Учебное заведение]': this.fieldsData.institution,
      };

      this.land = {
        land: 'BANNER.HUB_market',
      };

      this.$lander.send({ ...this.fieldsData, ...this.comments, ...this.land });
    },

    goto() {
      window.location.href = this.redirectURL;
    },
  },
};
</script>
