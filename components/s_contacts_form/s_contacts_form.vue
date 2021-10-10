<template>
  <section class="s-contacts-form" ref="form">
    <m-form
      :isVertical="true"
      titleClass="a-font_h2"
      typeCtrl="checkbox"
      typeBtn="checkbox"
      :title="title"
      :subtitle="subtitle"
      :checked="true"
      :submitDisabled="!validFlag"
      :btnText="buttonText"
      :checkboxText="checkboxText"
      @submit-disabled="validFlag = $event"
      @click="sendForm"
    >
      <template v-slot:inputs>
        <a-input
        class="m-form__input"
        @input="handlerSave(); validFormData();" v-model="fieldsData.name" placeholder="Имя" />

        <a-input
        class="m-form__input"
        @input="handlerSave(); validFormData();" v-model="fieldsData.email" placeholder="Почта" />

        <a-input
        class="m-form__input" type="textarea"
        @input="handlerSave(); validFormData();" v-model="fieldsData.question" placeholder="Ваш вопрос" />
      </template>
    </m-form>
  </section>
</template>

<script>
import { MForm, AInput } from '@cwespb/synergyui';
import './s_contacts_form.scss';

export default {
  name: 'SContactsForm',

  data() {
    return {
      title: 'Обратная связь',
      subtitle: 'Если у вас возник вопрос напишите нам в поддержку через форму обратной связи',
      buttonText: 'Отправить',
      validFlag: false,
      checkboxText: 'Нажимая на кнопку, вы соглашаетсь с политикой конфиденциальности и на получение рассылок',
      fieldsData: {
        name: '',
        email: '',
        question: '',
      },
    };
  },
  mounted() {
    this.$emit('contactsform-ref', this.$refs.form);
    const loadDataForm = this.$lander.storage.load('contactsform');
    if (loadDataForm) this.fieldsData = loadDataForm;

    const dataForm = [
      { value: this.fieldsData.name },
      { value: this.fieldsData.email },
      { value: this.fieldsData.question },
    ];
    this.validFlag = this.$lander.valid(dataForm);
  },
  methods: {
    sendForm() {
      this.$lander.send(this.fieldsData);
    },
    handlerSave() {
      this.$lander.storage.save('contactsform', this.fieldsData);
    },
    validFormData() {
      const dataForm = [
        { value: this.fieldsData.name },
        { value: this.fieldsData.email, type: 'email' },
        { value: this.fieldsData.question },
      ];
      this.validFlag = this.$lander.valid(dataForm);
    },
  },

  components: {
    MForm,
    AInput,
  },
};
</script>
