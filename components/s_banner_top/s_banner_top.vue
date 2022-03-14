<template>
  <section class="s-banner-top">
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
              :class="{ 'error-name': !nameErrorFlag }"
              @input="validFormData"
              v-model="fieldsData.name"
              placeholder="Имя"
            />
            <vue-tel-input
              class="s-banner-top__popup-input"
              :class="{ error: !phoneErrorFlag }"
              v-bind="vueTelOpts"
              type="phone"
              placeholder="Телефон"
              v-model="fieldsData.phone"
              @input="validatePhone"
            >
            </vue-tel-input>
            <a-input
              class="s-banner-top__popup-input"
              :class="{ 'error-mail': !emailErrorFlag }"
              @input="validFormData"
              v-model="fieldsData.email"
              placeholder="Почта"
            />
          </div>
          <div class="s-banner-top__popup-row">
            <a-input
              class="s-banner-top__popup-input institution"
              :class="{ 'error-institution': !institutionErrorFlag }"
              @input="validFormData"
              v-model="fieldsData.institution"
              placeholder="Название учебного заведения"
            />
            <a-button
              class="s-banner-top__button popup"
              bgColor="accent"
              label="Отправить"
              @click="showAddRequestPopupHandler"
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
import { AButton, APopup, AControl, AInput } from '@cwespb/synergyui';
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
      isChecked: false,

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

      nameErrorFlag: true,
      emailErrorFlag: true,
      phoneErrorFlag: true,
      institutionErrorFlag: true,

      fieldsData: {
        name: '',
        phone: '',
        email: '',
        institution: '',
      },
    };
  },

  methods: {
    validFormData() {},

    validatePhone() {},

    showAddRequestPopupHandler() {
      this.addRequestPopup = true;
      console.log('popup', this.addRequestPopup);
    },

    sendRequestHandler() {
      console.log('sendRequestHandler');
    },
  },
};
</script>
