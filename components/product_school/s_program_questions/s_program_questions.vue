<template>
  <section class="s-program-questions" v-if="questionsList.length">
    <div class="s-program-questions__wrapper">
      <h2 class="s-program-questions__title a-font_h2" v-html="title"></h2>
      <div class="s-program-questions__body">
        <div class="s-program-questions__row" v-for="(item, id) in questionsList" :key="id" @click="showMore(item, id)">
          <div class="s-program-questions__top">
            <div class="title a-font_xxl">{{ item.title }}</div>
            <i class="s-program-content__icon" :class="`si-chevron-${item.isActive ? 'down' : 'up'}`"> </i>
          </div>
          <div class="s-program-questions__text a-font_xl" v-if="item.isActive">
            <div class="s-program-questions__text-wrap">
              {{ item.text }}
            </div>
          </div>
          <div class="s-program-questions__timetable timetable" v-if="item.timetable && item.isActive">
            <div class="timetable-title a-font_xxl">
              {{ item.timetable.title }}
            </div>
            <swiper :options="swiperOptions">
              <swiper-slide class="s-program-questions__timetable-table">
                <div class="timetable-time">
                  <div class="timetable-time__title a-font_xl">{{ item.timetable.time.title }}</div>
                  <div class="timetable-time__items">
                    <div
                      class="timetable-time__item a-font_l"
                      v-for="(time, id) in item.timetable.time.items"
                      :key="id"
                    >
                      {{ time }}
                    </div>
                  </div>
                </div>
                <div class="timetable-days">
                  <div class="timetable-day" v-for="(day, id) in item.timetable.days" :key="id">
                    <div class="timetable-day__title a-font_xl">
                      {{ day.title }}
                    </div>
                    <div class="timetable-day__subjects">
                      <div class="timetable-day__subject a-font_l" v-for="(subject, id) in day.subjects" :key="id">
                        {{ subject }}
                      </div>
                    </div>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import './s_program_questions.scss';

export default {
  name: 's_program_questions',

  components: {
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      questionsList: [],
      isActive: false,
      title: '',
      swiperOptions: {
        slidesPerView: 'auto',
        resistance: true,
        resistanceRatio: 0,
        freeMode: true,
      },
    };
  },

  props: ['dataObject'],

  mounted() {
    this.title = this.dataObject.title;
    this.questionsList = this.dataObject.list;
  },

  methods: {
    showMore(elem) {
      const question = elem;

      this.questionsList.forEach((el) => {
        const item = el;
        item.isActive = false;
      });

      question.isActive = true;
    },
  },
};
</script>
