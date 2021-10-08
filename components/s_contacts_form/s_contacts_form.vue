<template>
  <section class="s-contacts-form" ref="form">
    <m-form
      :isVertical="true"
      titleClass="a-font_h2"
      typeCtrl="checkbox"
      typeBtn="checkbox"
      :title="title"
      :subtitle="subtitle"
      :checked="checked"
      :btnText="buttonText"
      :checkboxText="checkboxText"
      @click="sendForm"
    >
      <template v-slot:inputs>
        <a-input class="m-form__input" @input="handlerSave" v-model="dataForm.name" placeholder="Имя" />
        <a-input class="m-form__input" @input="handlerSave" v-model="dataForm.email" placeholder="Почта" />
        <a-input
          class="m-form__input"
          @input="handlerSave"
          v-model="dataForm.question"
          placeholder="Ваш вопрос"
          type="textarea"
        />
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
      checked: true,
      checkboxText: 'Нажимая на кнопку, вы соглашаетсь с политикой конфиденциальности и на получение рассылок',
      dataForm: {
        name: '',
        email: '',
        question: '',
      },
    };
  },
  mounted() {
    this.$emit('contactsform-ref', this.$refs.form);

    const loadDataForm = this.$lander.storage.load('contactsform');
    if (loadDataForm) this.dataForm = loadDataForm;
  },
  methods: {
    sendForm() {
      this.$lander.send(this.dataForm).then(() => {});
    },
    handlerSave() {
      this.$lander.storage.save('contactsform', this.dataForm);
    },
  },
  components: {
    MForm,
    AInput,
  },
};
</script>
