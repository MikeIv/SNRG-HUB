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
        <a-input class="m-form__input" @input="handlerSave" v-model="dataForm.name" placeholder="Имя" />
        <a-input
          type="phone"
          class="m-form__input"
          @validate="validatePhone"
          @input="handlerSave"
          v-model="dataForm.phone"
          placeholder="Телефон"
        />
        <a-input class="m-form__input" @input="handlerSave" v-model="dataForm.email" placeholder="Почта" />
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

    validPhone: false,
  }),

  mounted() {
    this.$emit('form-ref', this.$refs.form);

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
