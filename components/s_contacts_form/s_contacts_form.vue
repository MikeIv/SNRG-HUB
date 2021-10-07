<template>
  <section class="s-contacts-form">
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
    >
      <template v-slot:inputs>
        <a-input class="m-form__input" placeholder="Имя" type="text" />
        <a-input class="m-form__input" placeholder="Почта" type="email" />
        <a-input class="m-form__input" placeholder="Ваш вопрос" type="textarea" />
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
    };
  },
  components: {
    MForm,
    AInput,
  },
};
</script>
