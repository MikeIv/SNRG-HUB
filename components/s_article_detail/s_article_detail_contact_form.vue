<template>
  <section class="s-contact-form-detail" ref="form" id="form">
    <m-form
      :title="title"
      :checkboxText="checkboxText"
      :btnText="btnText"
      :typeCtrl="typeCtrl"
      :typeBtn="typeBtn"
      :checked="checked"
      :submitDisabled="!validFlag"
      @submit-disabled="validFlag = $event"
      @click="sendForm"
    >
      <template v-slot:inputs>
        <a-input
          class="m-form__input"
          :class="{ 'error-mail': !emailErrorFlag }"
          @input="validFormData"
          v-model="fieldsData.email"
          placeholder="Почта"
        />
        <a-input
          class="m-form__input"
          :class="{ 'error-name': !nameErrorFlag }"
          @input="validFormData"
          v-model="fieldsData.name"
          placeholder="Имя"
        />
      </template>
    </m-form>
  </section>
</template>

<script>
import { MForm, AInput } from '@cwespb/synergyui';
import './s_article_detail_contact_form.scss';

export default {
  name: 's-article-detail-contact-form',

  props: {
    title: {
      type: String,
      required: false,
      default: 'Хочешь получать актульную информацию?',
    },

    formProduct: {
      type: Object,
      required: false,
    },
  },

  components: {
    MForm,
    AInput,
  },

  data: () => ({
    checkboxText: 'Нажимая на кнопку, вы соглашаетсь с политикой конфиденциальности и на получение рассылок',
    btnText: 'Записаться',
    typeCtrl: 'checkbox',
    typeBtn: 'checkbox',
    checked: true,
    validFlag: true,
    validName: false,
    nameErrorFlag: true,
    emailErrorFlag: true,

    fieldsData: {
      name: '',
      email: '',
    },
  }),

  mounted() {
    this.$emit('form-ref', this.$refs.form);

    const loadDataForm = this.$lander.storage.load('sprogramform');
    if (loadDataForm) this.fieldsData = loadDataForm;
  },

  methods: {
    sendForm() {
      if (this.formProduct) {
        this.fieldsData.comment = `Клик из формы попапа продукта: ${this.formProduct.name}`;
      }

      if (this.checkedValidateError()) {
        this.$lander
          .send(
            this.fieldsData,
            {},
            this.$route.name === 'edu-platform-slug' || this.$route.name === 'edu-platform'
              ? this.$route.path
              : undefined,
          )
          .then(() => {});
      }
    },
    handlerSave() {
      const dataToSend = { ...this.fieldsData };
      delete dataToSend.comments;
      this.$lander.storage.save('sprogramform', dataToSend);
    },
    validFormData() {
      this.handlerSave();
    },
    checkedValidateError() {
      this.nameErrorFlag = /^([A-ZА-ЯЁ][-,a-z, a-яё. ']+[ ]*)+$/i.test(this.fieldsData.name);
      this.emailErrorFlag = this.$lander.valid([{ value: this.fieldsData.email, type: 'email' }]);

      console.log('as', this.nameErrorFlag && this.emailErrorFlag);

      return this.nameErrorFlag && this.emailErrorFlag;
    },
  },
};
</script>
