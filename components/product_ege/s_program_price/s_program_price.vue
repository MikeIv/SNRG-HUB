<template>
  <section class="s-program-price" ref="form" id="form-price" :class="formClass">
    <div class="s-program-price__info">
      <h3 class="s-program-price__title a-font_h5">{{ title }}</h3>
      <div class="s-program-price__info-wrapper">
        <div class="s-program-price__left">
          <div class="s-program-price__course">
            <div class="s-program-price__course-items">
              <div
                class="s-program-price__course-item a-font_l"
                v-for="(course, id) in priceInfo.courses.items"
                :key="id"
              >
                {{ course.text }}
              </div>
            </div>
          </div>
          <div class="s-program-price__course">
            <div class="s-program-price__course-items">
              <div
                class="s-program-price__course-item a-font_l"
                v-for="(subject, id) in priceInfo.subjects.items"
                :key="id"
              >
                {{ subject.text }}
              </div>
            </div>
          </div>
        </div>
        <div class="s-program-price__right">
          <div class="s-program-price__right-item">
            <div class="s-program-price__item-title a-font_l">{{ priceInfo.price.title }}</div>
            <div class="s-program-price__old a-font_xl">{{ priceInfo.price.priceOld }}</div>
            <div class="s-program-price__new a-font_h5">{{ priceInfo.price.priceNow }}</div>
          </div>
          <div class="s-program-price__right-item">
            <div class="s-program-price__item-title a-font_l">{{ priceInfo.time.title }}</div>
            <div class="s-program-price__time a-font_xl">{{ priceInfo.time.value }}</div>
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
    title: 'Расчет стоимости курса',
    priceInfo: {
      courses: {
        items: [
          {
            text: 'Подготовка к ЕГЭ (11 класс)',
            value: 'Подготовка к ЕГЭ (11 класс)',
            isActive: false,
          },
          {
            text: 'Подготовка к ЕГЭ (9 класс)',
            value: 'Подготовка к ЕГЭ (9 класс)',
            isActive: false,
          },
        ],
      },
      subjects: {
        title: 'Выберете предмет:',
        items: [
          {
            text: 'Математика Профиль',
            value: 'Математика Профиль',
            isActive: false,
          },
          {
            text: 'Русский язык',
            value: 'Русский язык',
            isActive: false,
          },
          {
            text: 'Химия',
            value: 'Химия',
            isActive: false,
          },
          {
            text: 'Биология',
            value: 'Биология',
            isActive: false,
          },
          {
            text: 'Обществознание',
            value: 'Обществознание',
            isActive: false,
          },
        ],
      },
      price: {
        title: 'Стоимость:',
        priceOld: '6400 ₽/мес',
        priceNow: '4 400 ₽/мес',
      },
      time: {
        title: 'Продолжительность:',
        value: '120 часов',
      },
    },

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

    this.getActiveCourse(0);
    this.getActiveSubject(0);
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

    getActiveCourse(id) {
      this.priceInfo.courses.items.forEach((el) => {
        const element = el;

        element.isActive = false;
      });
      this.priceInfo.courses.items[id].isActive = true;
    },

    getActiveSubject(id) {
      this.priceInfo.subjects.items.forEach((el) => {
        const element = el;

        element.isActive = false;
      });
      this.priceInfo.subjects.items[id].isActive = true;
    },
  },
};
</script>
