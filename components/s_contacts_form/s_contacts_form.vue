<template>
  <section class="s-contacts-form">
    <m-form
      :isVertical="true" 
      :title="title"
      titleClass="a-font_h2"
      :subtitle="subtitle"
      :checked="checked"
      typeCtrl= 'checkbox'
      typeBtn= 'checkbox'
      :btnText="buttonText"
      :checkboxText="checkboxText"
    >
      <template v-slot:inputs>
        <a-input class="m-form__input" placeholder="Имя" type="text"/>
        <a-input class="m-form__input" placeholder="Почта" type="email"/>
        <a-input class="m-form__input" placeholder="Ваш вопрос" type="textarea"/>
      </template>
    </m-form>
  </section>
</template>

<script>
import { MForm, AInput } from '@cwespb/synergyui';
import './s_contacts_form.scss';

export default {
  name: 'SContactsMain',

  data() {
    return {
      title: 'Обратная связь',
      subtitle: 'Если у вас возник вопрос напишите нам в поддержку через форму обратной связи',
      buttonText: 'Отправить',
      checked: true,
      checkboxText: 'Нажимая на кнопку, вы соглашаетсь с политикой конфиденциальности и на получение рассылок',
      requisites: [
        { id: 1, pretitle: 'Наименование', title: 'ООО «Синерджи Юниверсити»' },
        { id: 2, pretitle: 'ИНН', title: '7743361338' },
        { id: 3, pretitle: 'ОГРН', title: '121700233002' },
      ],
    };
  },
  components: {
    MForm,
    AInput,
  },
};
</script>
