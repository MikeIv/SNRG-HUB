<template>
  <div class="s-program-command">
    <h2 class="s-program-command__title a-font_h2" v-html="title"></h2>
    <div class="s-program-command__subtitle a-font_xxl">{{ subtitle }}</div>
    <div class="s-program-command__items" v-if="!isMobile">
      <div class="s-program-command__item" v-for="(item, id) in items" :key="id">
        <div class="s-program-command__item-icon">
          <i></i>
        </div>
        <div class="s-program-command__item-title a-font_xxl">
          {{ item.title }}
        </div>
        <div class="s-program-command__item-text a-font_xl">
          {{ item.text }}
        </div>
      </div>
    </div>

    <swiper class="s-program-command__items" :options="swiperOptions" v-if="isMobile">
      <swiper-slide class="s-program-command__item" v-for="(item, id) in items" :key="id">
        <div class="s-program-command__item-icon">
          <i></i>
        </div>
        <div class="s-program-command__item-title a-font_xxl">
          {{ item.title }}
        </div>
        <div class="s-program-command__item-text a-font_xl">
          {{ item.text }}
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import './s_program_command.scss';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

export default {
  name: 'SProgramCommand',

  components: {
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      isMobile: false,
      title: 'Команда <span>поддержки</span>',
      subtitle:
        // eslint-disable-next-line max-len
        'Образовательный процесс ученика сопровождает команда специалистов, которые следят за тем, чтобы обучение проходило эффективно и комфортно как для школьников, так и для их родителей.',
      items: [
        {
          icon: '',
          title: 'Куратор',
          // eslint-disable-next-line max-len
          text: 'Отвечает на технические и административные вопросы, предоставляет родителям ежемесячную отчетность по успеваемости и посещаемости, выполняет роль классного руководителя.',
        },
        {
          icon: '',
          title: 'Наставник',
          // eslint-disable-next-line max-len
          text: 'Помогает влиться в учебный процесс, разобраться с домашними заданиями и учебными материалами, а также поддерживает у ребёнка интерес к своему предмету на протяжении всего учебного года.',
        },
        {
          icon: '',
          title: 'Модератор',
          // eslint-disable-next-line max-len
          text: 'Отвечает на вопросы и следит за порядком во время вебинара. Помогает ученику разобраться с возникающими техническими проблемами и трудностями.',
        },
        {
          icon: '',
          title: 'Психолог',
          // eslint-disable-next-line max-len
          text: 'Помогает ученикам преодолеть трудности процесса обучения и определиться с будущей профессией и вузом. На постоянной основе дает родителям обратную связь по результатам общения с ребенком.',
        },
      ],
      swiperOptions: {
        slidesPerView: 'auto',
        spaceBetween: 26,
        resistance: true,
        resistanceRatio: 0,
      },
    };
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('DOMContentLoaded', this.handleResize);
    this.handleResize();
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('DOMContentLoaded', this.handleResize);
  },

  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;

      if (this.windowWidth < 767) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },
  },
};
</script>
