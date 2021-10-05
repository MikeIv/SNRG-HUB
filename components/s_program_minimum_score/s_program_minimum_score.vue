<template>
  <section class="s-program-minimum-score">
    <div class="s-program-minimum-score__header">
      <h2 class="s-program-minimum-score__title a-font_h2" v-html="title"></h2>
      <div class="s-program-minimum-score__btns">
        <ATag
          v-for="tab in tabs"
          :key="tab.id"
          :label="tab.label"
          :name="tab.name"
          :class="{ 'a-tag__item_active': tab.isActive }"
          @aTagClick="toggleTabs(tab)"
        />
      </div>
    </div>

    <div
      v-for="tab in tabs"
      :key="tab.id"
      class="s-program-minimum-score__items"
      :class="{ 's-program-minimum-score__items_active': tab.isActive }"
      v-show="tab.isActive"
    >
      <swiper :options="swiperOptionProgramExam">
        <swiper-slide v-for="(exam, idx) in tab.exams" :key="exam.id" class="s-program-minimum-score__item">
          <h5 class="s-program-minimum-score__item-caption a-font_h5">{{ slideCaption[idx] }}</h5>
          <div class="s-program-minimum-score__item-factoids">
            <AFactoid v-for="item in exam" :key="item.id" :type="item.type" :title="item.title" :number="item.number" />
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

import { ATag, AFactoid } from '@cwespb/synergyui';
import './s_program_minimum_score.scss';

export default {
  name: 's_program_minimum_score',

  components: {
    ATag,
    AFactoid,
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      swiperOptionProgramExam: {
        slidesPerView: 'auto',
        spaceBetween: 0,
        resistance: true,
        resistanceRatio: 0,
        breakpoints: {
          768: {
            grabCursor: true,
          },
        },
      },

      title: 'Минимальные баллы для поступления',
      tabs: [
        {
          name: 'budget',
          label: 'Бюджет',
          status: 'default',
          isActive: true,
          exams: {
            base: [
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
            choose: [
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
          },
        },
        {
          name: 'paid',
          label: 'Платное',
          status: 'default',
          isActive: false,
          exams: {
            base: [
              {
                type: 'number',
                title: 'Математика',
                number: '44',
              },
              {
                type: 'number',
                title: 'Русский язык',
                number: '55',
              },
            ],
            choose: [
              {
                type: 'number',
                title: 'Информатика',
                number: '66',
              },
              {
                type: 'number',
                title: 'Иностранный язык',
                number: '77',
              },
              {
                type: 'number',
                title: 'Физика',
                number: '88',
              },
            ],
          },
        },
      ],

      slideCaption: {
        base: 'Основные предметы',
        choose: 'Предметы по выбору',
      },
    };
  },
  /* eslint no-param-reassign: ["error", { "props": false }] */
  methods: {
    toggleTabs(selectedTab) {
      this.tabs.forEach((tab) => {
        tab.isActive = tab.name === selectedTab.name;
      });
    },
  },
};
</script>
