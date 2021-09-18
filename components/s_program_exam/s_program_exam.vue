<template>
  <section class="s-program-exam">
    <div class="s-program-exam__wrapper">
      <div class="s-program-exam__header">
        <h2 class="s-program-exam__title a-font_h2" v-html="title"></h2>
        <div class="s-program-exam__btns">
          <AButton
            v-for="button in buttons"
            :key="button.id"
            :label="button.label"
            :backgroundColor="button.backgroundColor"
            :size="button.size"
          />
        </div>
      </div>
      <div class="s-program-exam__items">
        <swiper class="swiper" :options="swiperOption">
          <div class="s-program-exam__item swiper-slide">
            <AFactoid v-for="db in disciplineBase" :key="db.id" :type="db.type" :title="db.title" :number="db.number" />
          </div>
          <div class="s-program-exam__item swiper-slide">
            <AFactoid
              v-for="dc in disciplineChoose"
              :key="dc.id"
              :type="dc.type"
              :title="dc.title"
              :number="dc.number"
            />
          </div>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper } from 'vue-awesome-swiper';

import { AButton, AFactoid } from '@cwespb/synergyui';
import './s_program_exam.scss';

export default {
  name: 's_program_exam',

  components: {
    Swiper,
    AButton,
    AFactoid,
  },

  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },

  data() {
    return {
      baseUrl: process.env.NUXT_ENV_S3BACKET,
      swiperOption: {
        grabCursor: true,
        slidesPerView: 4,
        spaceBetween: 30,
        loop: true,
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          768: {
            spaceBetween: 30,
            slidesPerView: 2.5,
          },
          360: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
        },
      },

      title: 'Минимальные баллы для поступления',
      buttons: [
        {
          label: 'Бюджет',
          backgroundColor: 'accent',
          size: 'small',
        },
        {
          label: 'Платное',
          backgroundColor: 'custom',
          size: 'small',
        },
      ],
      disciplineBase: [
        {
          type: 'number',
          title: 'Математика',
          number: '39',
        },
        {
          type: 'number',
          title: 'Русский язык',
          number: '40',
        },
      ],
      disciplineChoose: [
        {
          type: 'number',
          title: 'Информатика',
          number: '39',
        },
        {
          type: 'number',
          title: 'Иностранный язык',
          number: '40',
        },
        {
          type: 'number',
          title: 'Физика',
          number: '40',
        },
      ],
    };
  },
};
</script>
