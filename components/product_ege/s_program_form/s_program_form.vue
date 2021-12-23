<template>
  <section class="s-program-form" ref="form" id="form" :class="formClass">
    <m-form
      :title="title"
      :checkboxText="checkboxText"
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
          :class="{ 'error-name': !validName }"
          @input="
            handlerSave();
            validFormData();
          "
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
        <a-input
          class="m-form__input"
          :class="{ 'error-mail': !validFlag }"
          @input="
            handlerSave();
            validFormData();
          "
          v-model="fieldsData.email"
          placeholder="Почта"
        />
      </template>
    </m-form>
  </section>
</template>

<script>
import { VueTelInput } from 'vue-tel-input';
import { MForm, AInput } from '@cwespb/synergyui';
import './s_program_form.scss';

export default {
  name: 's_program_form',

  props: {
    title: {
      type: String,
      required: false,
      default: 'Записаться на курс или получить бесплатную консультацию',
    },

    formProduct: {
      type: Object,
      required: false,
    },

    formClass: {
      type: String,
    },
  },

  components: {
    MForm,
    AInput,
    VueTelInput,
  },

  data: () => ({
    checkboxText: 'Нажимая на кнопку, вы соглашаетсь с политикой конфиденциальности и на получение рассылок',
    btnText: 'Записаться',
    typeCtrl: 'checkbox',
    typeBtn: 'checkbox',
    checked: true,
    validFlag: false,
    validName: false,

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

      this.$lander
        .send(this.fieldsData, {}, this.$route.name === 'edu-platform-slug' ? this.$route.path : undefined)
        .then(() => {});
    },
    handlerSave() {
      this.$lander.storage.save('programform', this.fieldsData);
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
      if (/[0-9]/.test(this.fieldsData.name)) {
        this.validName = false;
      } else {
        this.validName = true;
      }
    },
  },
};
</script>
