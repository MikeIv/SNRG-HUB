<template>
  <section class="s-program-form" ref="form" id="form">
    <MForm
      :actionForm="actionForm"
      :title="title"
      :checkboxText="checkboxText"
      :btnText="btnText"
      :typeCtrl="typeCtrl"
      :typeBtn="typeBtn"
      :checked="checked"
    >
      <a-input class="m-form__input" placeholder="Имя" type="text"/>
      <a-input class="m-form__input" placeholder="Телефон" type="tel"/>
      <a-input class="m-form__input" placeholder="Почта" type="email"/>
    </MForm>
  </section>
</template>

<script>
import { MForm, AInput } from '@cwespb/synergyui';
import './s_program_form.scss';

export default {
  name: 's_program_form',

  components: {
    MForm,
    AInput,
  },

  data() {
    return {
      actionForm: '/',
      title: 'Записаться на курс или получить бесплатную консультацию',
      checkboxText: 'Нажимая на кнопку, вы соглашаетсь с политикой конфиденциальности и на получение рассылок',
      btnText: 'Записаться',
      typeCtrl: 'checkbox',
      typeBtn: 'checkbox',
      checked: true,
    };
  },

  mounted() {
    this.$emit('form-ref', this.$refs.form);
  },
};
</script>
