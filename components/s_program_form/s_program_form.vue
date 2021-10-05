<template>
  <section class="s-program-form" ref="form" id="form">
    <m-form
      :title="title"
      :checkboxText="checkboxText"
      :btnText="btnText"
      :typeCtrl="typeCtrl"
      :typeBtn="typeBtn"
      :checked="checked"
      @click="sendForm"
    >
      <template v-slot:inputs>
        <a-input class="m-form__input" v-model="dataForm.name" placeholder="Имя" type="text" />
        <a-input class="m-form__input" v-model="dataForm.phone" placeholder="Телефон" type="tel" />
        <a-input class="m-form__input" v-model="dataForm.email" placeholder="Почта" type="email" />
      </template>
    </m-form>
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

  data: () => ({
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
      this.$formTools.send(this.dataForm).then(() => {});
    },
  },
};
</script>
