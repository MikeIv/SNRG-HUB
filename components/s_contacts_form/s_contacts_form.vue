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
          :class="{ 'error-name': !nameErrorFlag }"
          @input="validFormData"
          v-model="fieldsData.name"
          placeholder="Имя"
        />

        <a-input
          class="m-form__input"
          :class="{ 'error-mail': !emailErrorFlag }"
          @input="validFormData"
          v-model="fieldsData.email"
          placeholder="Почта"
        />

        <a-input
          class="m-form__input"
          type="textarea"
          @input="validFormData"
          v-model="fieldsData.question"
          placeholder="Ваш вопрос"
        />
      </template>
    </m-form>
  </section>
</template>

<script>
import { MForm, AInput } from '@cwespb/synergyui';
import sendContactForm from '~/api/sendContactForm';

import './s_contacts_form.scss';

export default {
  name: 'SContactsForm',

  data() {
    return {
      title: 'Обратная связь',
      subtitle: 'Если у вас возник вопрос напишите нам в поддержку через форму обратной связи',
      buttonText: 'Отправить',
      validFlag: true,
      validName: false,
      nameErrorFlag: true,
      emailErrorFlag: true,
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
    async sendForm() {
      const requestData = {
        name: this.fieldsData.name,
        email: this.fieldsData.email,
        message: this.fieldsData.question,
      };

      await sendContactForm(requestData);
      await this.$router.push('/thanks');
    },

    handlerSave() {
      const dataToSend = { ...this.fieldsData };
      delete dataToSend.comments;
      this.$lander.storage.save('contactsform', dataToSend);
    },
    validFormData() {
      const dataForm = [
        { value: this.fieldsData.name },
        { value: this.fieldsData.email, type: 'email' },
        { value: this.fieldsData.question },
      ];
      this.validFlag = this.$lander.valid(dataForm);
      if (/^([A-ZА-ЯЁ][-,a-z, a-яё. ']+[ ]*)+$/i.test(this.fieldsData.name)) {
        this.validName = true;
      } else {
        this.validName = false;
      }
    },
  },

  components: {
    MForm,
    AInput,
  },
};
</script>
