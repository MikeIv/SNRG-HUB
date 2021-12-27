<template>
  <section class="s-program-studies">
    <h2 class="s-program-studies__title a-font_h2" v-html="title"></h2>
    <div class="s-program-studies__subtitle a-font_xxl">
      {{ subtitle }}
    </div>
    <swiper :options="swiperOptions" class="s-program-studies__items">
      <swiper-slide class="s-program-studies__item" v-for="(item, id) in items" :key="id">
        <div class="s-program-studies__item-img" :class="item.imgTop"></div>
        <div class="s-program-studies__list">
          <div class="s-program-studies__list-title a-font_h6">
            {{ item.title }}
          </div>
          <div class="s-program-studies__list-items">
            <div class="s-program-studies__list-item" v-for="(li, id) in item.list" :key="id">
              <AListElement type="dotted" :label="li" class="" />
            </div>
            <div class="s-program-studies__list-message">
              <span class="s-program-studies__icon">!</span>
              <span class="s-program-studies__message a-font_m">{{ item.message }}</span>
            </div>
            <AButton label="Поступить в школу" bgColor="accent" @click="togglePopup" />
          </div>
        </div>
      </swiper-slide>
    </swiper>
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
        ref="popupform-ref"
        @click="sendForm"
      >
        <template v-slot:inputs>
          <AInput
            class="m-form__input"
            :class="{ 'error-name': !validName }"
            @input="validFormData()"
            v-model="fieldsData.name"
            placeholder="Имя"
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
          >
          </vue-tel-input>

          <AInput
            class="m-form__input"
            :class="{ 'error-mail': !validFlag }"
            @input="validFormData()"
            v-model="fieldsData.email"
            placeholder="Почта"
          />
        </template>
      </MForm>
    </APopup>
  </section>
</template>

<script>
import './s_program_studies.scss';
import { VueTelInput } from 'vue-tel-input';
import { AListElement, AButton, APopup, MForm, AInput } from '@cwespb/synergyui';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

export default {
  name: 'SProgramStudies',

  props: ['dataObject'],

  components: {
    AListElement,
    AButton,
    Swiper,
    SwiperSlide,
    APopup,
    MForm,
    AInput,
    VueTelInput,
  },

  data() {
    return {
      title: '',
      subtitle: '',
      items: [],
      swiperOptions: {
        slidesPerView: 1,
        spaceBetween: 10,
        resistance: true,
        resistanceRatio: 0,
        breakpoints: {
          767: {
            spaceBetween: 16,
          },
          991: {
            slidesPerView: 2,
          },
        },
      },
      validFlag: false,
      formChecked: true,
      maxPhoneLength: 16,
      fieldsData: {
        name: '',
        email: '',
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
      popupOptions: {
        visible: false,
        form: {
          title: 'Поступить в онлайн-школу «Синергия»',
          isVertical: true,
          btnText: 'Записаться',
          checkboxText: 'Нажимая на кнопку, я соглашаюсь с политикой конфиденциальности и на получение рассылок',
          checked: true,
        },
      },
    };
  },

  mounted() {
    this.$emit('popupform-ref', this.$refs.form);

    const loadDataForm = this.$lander.storage.load('popupform');

    if (loadDataForm) this.fieldsData = loadDataForm;

    this.validFormData();

    this.title = this.dataObject.title;
    this.subtitle = this.dataObject.subtitle;
    this.items = this.dataObject.items;
  },

  methods: {
    togglePopup() {
      this.popupOptions.visible = true;
    },
    sendForm() {
      this.$lander
        .send(this.fieldsData, {}, this.$route.name === 'edu-platform-slug' ? this.$route.path : undefined)
        .then(() => {});
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

      this.$lander.storage.save('form-reg', this.fieldsData);
    },
  },
};
</script>
