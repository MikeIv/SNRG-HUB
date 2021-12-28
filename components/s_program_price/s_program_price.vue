<template>
  <section class="s-program-price">
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
          v-model="dataForm.name"
          placeholder="Имя"
        />
        <a-input
          type="phone"
          class="m-form__input"
          :class="{ error: !validPhone }"
          v-model="dataForm.phone"
          @validate="validatePhone"
          @input="handlerSave"
          placeholder="Телефон"
        />
        <a-input
          class="m-form__input"
          :class="{ 'error-mail': !validFlag }"
          v-model="dataForm.email"
          @input="
            handlerSave();
            validFormData();
          "
          placeholder="Почта"
        />
      </template>
    </m-form-pay>
  </section>
</template>

<script>
import { MFormPay, AInput } from '@cwespb/synergyui';
import './s_program_price.scss';

export default {
  name: 's_program_price',

  components: {
    MFormPay,
    AInput,
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
    disabled: 'false',
    courseName: 'Информатика и вычислительная техника. Автоматизированное управление бизнес-процессами и финансами',
    years: '4 года 6 месяцев',
    study: 'Бакалавриат',
    priceText: 'Стоимость курса',
    oldPrice: '45550 ₽',
    currentPrice: '35 000 ₽',
    iconSrc: 'https://sys3.ru/marketplace/uploads/organizations/yuIYPVAzTpYhkDo2acWAZAMLpIh4LiRGttzzlyFs.svg',
    text: 'Университет Синергия',

    dataForm: {
      name: '',
      phone: '',
      email: '',
    },

    validPhone: false,
  }),

  mounted() {
    const loadDataForm = this.$lander.storage.load('programform');
    if (loadDataForm) this.dataForm = loadDataForm;
  },

  methods: {
    sendForm() {
      this.$lander.send(this.dataForm).then(() => {});
    },
    handlerSave() {
      const dataToSend = { ...this.dataForm };
      delete dataToSend.comments;
      this.$lander.storage.save('programform', dataToSend);
    },
    validatePhone(value) {
      this.validPhone = value.valid;
    },
    validFormData() {
      // eslint-disable-next-line max-len
      const dataForm = [
        { value: this.dataForm.name },
        { value: this.dataForm.phone },
        { value: this.dataForm.email, type: 'email' },
      ];
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
