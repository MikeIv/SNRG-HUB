<template>
  <section class="s-program-studies">
    <h2 class="s-program-studies__title a-font_h2" v-html="title"></h2>
    <div class="s-program-studies__subtitle a-font_xxl">
      {{ subtitle }}
    </div>
    <swiper :options="swiperOptions" class="s-program-studies__items">
      <swiper-slide class="s-program-studies__item" v-for="(item, id) in items" :key="id">
        <div class="s-program-studies__item-img" :class="item.imgTop"></div>
        <div class="s-program-studies__list">
          <div class="s-program-studies__list-title a-font_h6">
            {{ item.title }}
          </div>
          <div class="s-program-studies__list-items">
            <div class="s-program-studies__list-item" v-for="(li, id) in item.list" :key="id">
              <AListElement type="dotted" :label="li" class="" />
            </div>
            <div class="s-program-studies__list-message">
              <span class="s-program-studies__icon">!</span>
              <span class="s-program-studies__message a-font_m">{{ item.message }}</span>
            </div>
            <AButton label="Поступить в школу" bgColor="accent" @click="togglePopup" />
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <APopup @close="popupOptions.visible = false" :visible="popupOptions.visible">
      <MForm
        :title="popupOptions.form.title"
        :isVertical="popupOptions.form.isVertical"
        :btnText="popupOptions.form.btnText"
        :checkboxText="popupOptions.form.checkboxText"
        ref="form"
      >
        <template v-slot:inputs>
          <AInput
            class="m-form__input"
            @input="
              handlerSave();
              validFormData();
            "
            v-model="fieldsData.name"
            placeholder="Имя"
          />

          <AInput
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

          <AInput
            class="m-form__input"
            @input="
              handlerSave();
              validFormData();
            "
            v-model="fieldsData.email"
            placeholder="Почта"
          />
        </template>
      </MForm>
    </APopup>
  </section>
</template>

<script>
import './s_program_studies.scss';
import {
  AListElement, AButton, APopup, MForm, AInput,
} from '@cwespb/synergyui';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

export default {
  name: 'SProgramStudies',

  props: ['dataObject'],

  components: {
    AListElement,
    AButton,
    Swiper,
    SwiperSlide,
    APopup,
    MForm,
    AInput,
  },

  data() {
    return {
      title: '',
      subtitle: '',
      items: [],
      swiperOptions: {
        slidesPerView: 1,
        spaceBetween: 10,
        resistance: true,
        resistanceRatio: 0,
        breakpoints: {
          767: {
            spaceBetween: 16,
          },
          991: {
            slidesPerView: 2,
          },
        },
      },
      popupOptions: {
        visible: false,
        form: {
          title: 'Поступить в онлайн-школу «Синергия»',
          isVertical: true,
          btnText: 'Записаться',
          checkboxText: 'Нажимая на кнопку, я соглашаюсь с политикой конфиденциальности и на получение рассылок',
        },
      },
    };
  },

  mounted() {
    this.$emit('form-ref', this.$refs.form);

    const loadDataForm = this.$lander.storage.load('programform');

    if (loadDataForm) this.fieldsData = loadDataForm;

    this.title = this.dataObject.title;
    this.subtitle = this.dataObject.subtitle;
    this.items = this.dataObject.items;
  },

  methods: {
    togglePopup() {
      this.popupOptions.visible = true;
    },
    sendForm() {
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
