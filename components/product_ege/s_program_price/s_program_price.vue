<template>
  <section class="s-program-price" ref="form" id="form-price" :class="formClass">
    <div class="s-program-price__info">
      <h3 class="s-program-price__title a-font_h5">{{ title }}</h3>
      <div class="s-program-price__info-wrapper">
        <div class="s-program-price__left">
          <div class="s-program-price__course">
            <div class="s-program-price__course-title a-font_l">{{ priceInfo.courses.title }}</div>
            <div class="s-program-price__course-items">
              <div
                class="s-program-price__course-item a-font_l"
                :class="{ active: course.isActive }"
                v-for="(course, id) in priceInfo.courses.items"
                :key="id"
              >
                {{ course.text }}
              </div>
            </div>
          </div>
          <div class="s-program-price__course">
            <div class="s-program-price__course-title a-font_l">{{ priceInfo.subjects.title }}</div>
            <div class="s-program-price__course-items">
              <div
                class="s-program-price__course-item a-font_l"
                :class="{ active: subject.isActive }"
                v-for="(subject, id) in priceInfo.subjects.items"
                :key="id"
              >
                {{ subject.text }}
              </div>
            </div>
          </div>
        </div>
        <div class="s-program-price__right">
          <div class="s-program-price__right-item">
            <div class="s-program-price__item-title a-font_l">{{ priceInfo.price.title }}</div>
            <div class="s-program-price__old a-font_xl">{{ priceInfo.price.priceOld }}</div>
            <div class="s-program-price__new a-font_h5">{{ priceInfo.price.priceNow }}</div>
          </div>
          <div class="s-program-price__right-item">
            <div class="s-program-price__item-title a-font_l">{{ priceInfo.time.title }}</div>
            <div class="s-program-price__time a-font_xl">{{ priceInfo.time.value }}</div>
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
    title: 'Расчет стоимости курса',
    priceInfo: {
      courses: {
        title: 'Выберете курс:',
        items: [
          {
            text: 'Подготовка к ЕГЭ (11 класс)',
            value: 'Подготовка к ЕГЭ (11 класс)',
            isActive: false,
          },
          {
            text: 'Подготовка к ЕГЭ (9 класс)',
            value: 'Подготовка к ЕГЭ (9 класс)',
            isActive: false,
          },
        ],
      },
      subjects: {
        title: 'Выберете предмет:',
        items: [
          {
            text: 'Математика Профиль',
            value: 'Математика Профиль',
            isActive: false,
          },
          {
            text: 'Русский язык',
            value: 'Русский язык',
            isActive: false,
          },
          {
            text: 'Химия',
            value: 'Химия',
            isActive: false,
          },
          {
            text: 'Биология',
            value: 'Биология',
            isActive: false,
          },
          {
            text: 'Обществознание',
            value: 'Обществознание',
            isActive: false,
          },
        ],
      },
      price: {
        title: 'Стоимость:',
        priceOld: '6400 ₽/мес',
        priceNow: '4 400 ₽/мес',
      },
      time: {
        title: 'Продолжительность:',
        value: '120 часов',
      },
    },

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

    this.getActiveCourse(0);
    this.getActiveSubject(0);
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

    getActiveCourse(id) {
      this.priceInfo.courses.items.forEach((el) => {
        const element = el;

        element.isActive = false;
      });
      this.priceInfo.courses.items[id].isActive = true;
    },

    getActiveSubject(id) {
      this.priceInfo.subjects.items.forEach((el) => {
        const element = el;

        element.isActive = false;
      });
      this.priceInfo.subjects.items[id].isActive = true;
    },
  },
};
</script>
