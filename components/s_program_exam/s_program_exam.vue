<template>
  <section class="s-program-exam">
    <div class="s-program-exam__wrapper">
      <div class="s-program-exam__header">
        <h2 class="s-program-exam__title a-font_h2" v-html="title"></h2>
        <div class="s-program-exam__btns">
          <ATag v-for="button in buttons" :key="button.id" :label="button.label" />
        </div>
      </div>
      <div class="s-program-exam__items" v-show="isActive" :selected="true">
        <swiper class="swiper" :options="swiperOption">
          <div class="s-program-exam__item swiper-slide">
            <h5 class="s-program-exam__item-caption a-font_h5">Основные предметы</h5>
            <div class="s-program-exam__item-factoids">
              <AFactoid
                v-for="db in disciplineBase"
                :key="db.id"
                :type="db.type"
                :title="db.title"
                :number="db.number"
              />
            </div>
          </div>
          <div class="s-program-exam__item swiper-slide">
            <h5 class="s-program-exam__item-caption a-font_h5">Предметы по выбору</h5>
            <div class="s-program-exam__item-factoids">
              <AFactoid
                v-for="dc in disciplineChoose"
                :key="dc.id"
                :type="dc.type"
                :title="dc.title"
                :number="dc.number"
              />
            </div>
          </div>
        </swiper>
      </div>
      <div class="s-program-exam__items" v-show="isActive">
        <swiper class="swiper" :options="swiperOption">
          <div class="s-program-exam__item swiper-slide">
            <h5 class="s-program-exam__item-caption a-font_h5">Предметы по выбору</h5>
            <div class="s-program-exam__item-factoids">
              <AFactoid
                v-for="dc in disciplineChoose"
                :key="dc.id"
                :type="dc.type"
                :title="dc.title"
                :number="dc.number"
              />
            </div>
          </div>
          <div class="s-program-exam__item swiper-slide">
            <h5 class="s-program-exam__item-caption a-font_h5">Основные предметы</h5>
            <div class="s-program-exam__item-factoids">
              <AFactoid
                v-for="db in disciplineBase"
                :key="db.id"
                :type="db.type"
                :title="db.title"
                :number="db.number"
              />
            </div>
          </div>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper } from 'vue-awesome-swiper';

import { ATag, AFactoid } from '@cwespb/synergyui';
import './s_program_exam.scss';

export default {
  name: 's_program_exam',

  components: {
    Swiper,
    ATag,
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
        slidesPerView: 'auto',
        spaceBetween: 0,
        loop: false,
        breakpoints: {
          768: {
            slidesPerView: 'auto',
          },
          360: {
            slidesPerView: 1.25,
          },
        },
      },

      title: 'Минимальные баллы для поступления',
      buttons: [
        {
          label: 'Бюджет',
          status: 'default',
        },
        {
          label: 'Платное',
          status: 'default',
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

  methods: {
    aTagClick(e) {
      console.log(e);
    },
  },
};
</script>
