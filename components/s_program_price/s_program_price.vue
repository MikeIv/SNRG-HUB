<template>
  <section class="s-program-price">
    <MFormPay
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
      :actionForm="actionForm"
      :checkboxText="checkboxText"
      :typeCtrl="typeCtrl"
      :typeBtn="typeBtn"
      :checked="checked"
    >
      <a-input class="m-form__input" placeholder="Имя" type="text"/>
      <a-input class="m-form__input" placeholder="Телефон" type="tel"/>
      <a-input class="m-form__input" placeholder="Почта" type="email"/>
    </MFormPay>
  </section>
</template>

<script>
import { MFormPay, AInput } from '@cwespb/synergyui';
import './s_program_price.scss';

export default {
  name: 's_program_price',

  components: {
    MFormPay,
    AInput
  },

  data() {
    return {
      title: 'Стоимость программы',
      formTitle: 'Зарегистрироваться и оплатить',
      actionForm: '/',
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
    };
  },
};
</script>
