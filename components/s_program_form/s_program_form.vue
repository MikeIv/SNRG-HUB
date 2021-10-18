<template>
  <section class="s-program-form" ref="form" id="form">
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
          @input="
            handlerSave();
            validFormData();
          "
          v-model="fieldsData.name"
          placeholder="Имя"
        />
        <a-input
          type="phone"
          class="m-form__input"
          @validate="validatePhone"
          v-model="fieldsData.phone"
          @input="
            handlerSave();
            validFormData();
          "
          placeholder="Телефон"
        />
        <a-input
          class="m-form__input"
          @input="
            handlerSave();
            validFormData();
          "
          v-model="fieldsData.email"
          placeholder="Почта"
        />
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
    validFlag: false,

    fieldsData: {
      name: '',
      phone: '',
      email: '',
    },

    validPhone: false,
  }),

  mounted() {
    this.$emit('form-ref', this.$refs.form);

    const loadDataForm = this.$lander.storage.load('programform');
    if (loadDataForm) this.fieldsData = loadDataForm;
  },

  methods: {
    sendForm() {
      this.$lander
        .send(this.fieldsData, {}, this.$route.name === 'lp-slug' ? this.$route.path : undefined)
        .then(() => {});
    },
    handlerSave() {
      this.$lander.storage.save('programform', this.fieldsData);
    },
    validatePhone(value) {
      this.validPhone = value.valid;
    },
    validFormData() {
      const dataForm = [{ value: this.fieldsData.name }, { value: this.fieldsData.email, type: 'email' }];
      this.validFlag = this.$lander.valid(dataForm) && this.validPhone;
    },
  },
};
</script>
