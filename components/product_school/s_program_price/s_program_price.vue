<template>
  <section class="s-program-price" ref="form" id="form-price" :class="formClass">
    <div class="s-program-price__info">
      <h3 class="s-program-price__title a-font_h5">{{ title }}</h3>
      <div class="s-program-price__items">
        <div class="s-program-price__item" v-for="(item, id) in pricesItems" :key="id">
          <div class="s-program-price__classes s-program-price__item-column">
            <div class="s-program-price__classes-title s-program-price__item-title a-font_l">
              {{ item.class.title }}
            </div>
            <div class="s-program-price__classes-text s-program-price__item-text a-font_xl">{{ item.class.text }}</div>
          </div>
          <div class="s-program-price__month s-program-price__item-column">
            <div class="s-program-price__month-title s-program-price__item-title a-font_l">{{ item.month.title }}</div>
            <div class="s-program-price__month-text s-program-price__item-text a-font_xl">{{ item.month.price }}</div>
          </div>
          <div class="s-program-price__year s-program-price__item-column">
            <div class="s-program-price__year-title s-program-price__item-title a-font_l">{{ item.prices.title }}</div>
            <div class="s-program-price__year-oldprice s-program-price__item-text a-font_xl">
              {{ item.prices.priceOld }}
            </div>
            <div class="s-program-price__year-price a-font_h5">{{ item.prices.priceNow }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="s-program-price__form">
      <m-form
        :title="formTitle"
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
    </div>
  </section>
</template>

<script>
import { MForm, AInput } from '@cwespb/synergyui';
import './s_program_price.scss';

export default {
  name: 's_program_price',

  props: ['formClass'],

  components: {
    MForm,
    AInput,
  },

  data: () => ({
    title: 'Стоимость обучения',
    pricesItems: [
      {
        class: {
          title: 'Класс',
          text: '5 — 8',
        },
        month: {
          title: 'Месяц',
          price: '13 000 ₽',
        },
        prices: {
          title: 'Учебный год',
          priceOld: '105 000 ₽',
          priceNow: '95 000 ₽',
        },
      },
      {
        class: {
          title: 'Класс',
          text: '9 — 10',
        },
        month: {
          title: 'Месяц',
          price: '15 000 ₽',
        },
        prices: {
          title: 'Учебный год',
          priceOld: '105 000 ₽',
          priceNow: '95 000 ₽',
        },
      },
      {
        class: {
          title: 'Класс',
          text: '9 — 10',
        },
        month: {
          title: 'Месяц',
          price: '15 000 ₽',
        },
        prices: {
          title: 'Учебный год',
          priceOld: '120 000 ₽',
          priceNow: '105 000 ₽',
        },
      },
    ],

    checkboxText: 'Нажимая на кнопку, вы соглашаетсь с политикой конфиденциальности и на получение рассылок',
    btnText: 'Записаться',
    typeCtrl: 'checkbox',
    typeBtn: 'checkbox',
    checked: true,
    validFlag: false,
    formTitle: 'Поступить в онлайн-школу «Синергия»',

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
      if (this.formProduct) {
        this.fieldsData.comment = `Клик из формы попапа продукта: ${this.formProduct.name}`;
      }

      this.$lander
        .send(this.fieldsData, {}, this.$route.name === 'edu-platform-slug' ? this.$route.path : undefined)
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
