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
      @click="sendForm"
    >
      <template v-slot:inputs>
        <a-input class="m-form__input" v-model="dataForm.name" @input="handlerSave" placeholder="Имя" />
        <a-input
          type="phone"
          class="m-form__input"
          v-model="dataForm.phone"
          @validate="validatePhone"
          @input="handlerSave"
          placeholder="Телефон"
        />
        <a-input class="m-form__input" v-model="dataForm.email" @input="handlerSave" placeholder="Почта" />
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
      this.$lander.storage.save('programform', this.dataForm);
    },
    validatePhone(value) {
      this.validPhone = value.valid;
    },
  },
};
</script>
