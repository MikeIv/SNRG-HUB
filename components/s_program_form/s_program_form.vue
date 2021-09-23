<template>
  <section class="s-program-form">
    <MForm
      :actionForm="actionForm"
      :title="title"
      :checkboxText="checkboxText"
      :btnText="btnText"
      :inputs="inputs"
      :typeCtrl="typeCtrl"
      :typeBtn="typeBtn"
      :checked="checked"
    />
  </section>
</template>

<script>
import { MForm } from '@cwespb/synergyui';
import './s_program_form.scss';

export default {
  name: 's_program_form',

  components: {
    MForm,
  },

  data() {
    return {
      actionForm: '/',
      title: 'Записаться на курс или получить бесплатную консультацию',
      checkboxText: 'Нажимая на кнопку, вы соглашаетсь с политикой конфиденциальности и на получение рассылок',
      btnText: 'Записаться',
      inputs: [
        { placeholder: 'Имя', name: 'name', type: 'text' },
        { placeholder: 'Телефон', name: 'phone', type: 'tel' },
        { placeholder: 'Почта', name: 'email', type: 'email' },
      ],
      typeCtrl: 'checkbox',
      typeBtn: 'checkbox',
      checked: true,
    };
  },
};
</script>
