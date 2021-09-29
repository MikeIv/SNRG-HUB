<template>
  <section class="s-program-form" ref="form" id="form">
    <m-form
      :actionForm="actionForm"
      :title="title"
      :checkboxText="checkboxText"
      :btnText="btnText"
      :typeCtrl="typeCtrl"
      :typeBtn="typeBtn"
      :checked="checked"
      @click="sendForm"
    >
      <a-input class="m-form__input" v-model="dataForm.name" placeholder="Имя" type="text" />
      <a-input class="m-form__input" v-model="dataForm.phone" placeholder="Телефон" type="tel" />
      <a-input class="m-form__input" v-model="dataForm.email" placeholder="Почта" type="email" />
    </m-form>
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

  data: () => ({
    actionForm: '/',
    title: 'Записаться на курс или получить бесплатную консультацию',
    checkboxText: 'Нажимая на кнопку, вы соглашаетсь с политикой конфиденциальности и на получение рассылок',
    btnText: 'Записаться',
    typeCtrl: 'checkbox',
    typeBtn: 'checkbox',
    checked: true,

    dataForm: {
      name: '',
      phone: '',
      email: '',
    },
  }),

  mounted() {
    this.$emit('form-ref', this.$refs.form);
  },

  methods: {
    sendForm() {
      this.$validator.send(this.dataForm).then(() => {});
    },
  },
};
</script>
