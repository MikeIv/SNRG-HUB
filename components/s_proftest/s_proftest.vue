<template>
  <section class="s-proftest s-padding">
    <div class="l-wide l-border-radius">
      <div class="s-proftest__wrapper">
        <div class="s-proftest__content">
          <div class="s-proftest__left-col">
            <p class="s-proftest__subtitle">{{ subtitle }}</p>
            <h1 class="s-proftest__title">{{ title }}</h1>
            <p class="s-proftest__description">{{ description }}</p>
            <AButton @click="getQuize" class="s-proftest__btn" label="Пройти тест" bgColor="accent" v-if="!quizeShow" />
          </div>
          <div class="s-proftest__right-col">
            <div class="s-proftest__img-block">
              <img :src="require(`~/assets/images/${Img}`)" alt="Тест" class="s-proftest__img" />
            </div>
          </div>
          <div class="s-proftest__info" v-if="authorization">
            <p class="s-proftest__info-description" v-html="infoAdd"></p>
            <a href="#" class="s-proftest__link" v-html="linkSign"></a>
            <p class="s-proftest__info-description">или</p>
            <a href="#" class="s-proftest__link" v-html="linkReg"></a>
          </div>
        </div>
      </div>

      <div class="s-proftest__wrapper" v-if="quizeShow && !quizComplete" ref="test" id="test">
        <MQuiz
          class="s-proftest__quiz"
          :questions="questions"
          @isQuizComplete="isQuizComplete"
          @set-question="changeHandler"
        />
      </div>

      <div class="s-proftest__wrapper" v-if="quizComplete">
        <div class="s-proftest__content">
          <div class="s-proftest__left-col">
            <p class="s-proftest__subtitle">{{ resultSubtitle }}</p>
            <h2 class="s-proftest__title">{{ getMindType.name }}</h2>
            <p class="s-proftest__description" v-html="getMindType.description"></p>
          </div>
          <div class="s-proftest__right-col">
            <div class="s-proftest__img-block mb">
              <img :src="`${baseURL}${getMindType.image}`" alt="Тест" class="s-proftest__img" />
            </div>
          </div>
          <AButton class="s-proftest__btn order" label="Пройти еще раз" @click="getReQuiz" />
        </div>
      </div>

      <div class="s-proftest__wrapper" v-if="quizComplete">
        <h1 class="s-proftest__title">{{ titleCards }}</h1>
        <div class="s-proftest__cards">
          <div class="s-proftest__card" v-for="directions in directionsList" :key="directions.id">
            <nuxt-link :to="`/catalog/${directions.slug}?page=1`">
              <m-card-edu
                :title="directions.name"
                :description="`${directions.product_count} программ`"
                :iconClasses="`${baseURL}${directions.preview_image}`"
              />
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { AButton } from '@cwespb/synergyui';
import MQuiz from '~/components/_ui/m_quiz/m_quiz';
import MCardEdu from '~/components/ui/m-card-edu/m_card_edu';
import getMindList from '~/api/proftestList';
import getQuestionsList from '~/api/proftestDetail';

import './s_proftest.scss';

export default {
  name: 'SProftest',
  components: {
    AButton,
    MQuiz,
    MCardEdu,
  },

  data: () => ({
    baseURL: process.env.NUXT_ENV_S3BACKET,
    authorization: false,
    quizeShow: false,
    quizComplete: false, // Скрытие  Quiz при true
    swiperOptionA: {
      slidesPerView: 'auto',
      spaceBetween: 20,
      resistance: true,
      resistanceRatio: 0,
      navigation: {
        nextEl: '.s-persons__next',
        prevEl: '.s-persons__prev',
      },
      breakpoints: {
        767: {
          spaceBetween: 20,
        },
        1440: {
          spaceBetween: 20,
        },
        1499: {
          spaceBetween: 20,
        },
      },
    },
    breadcrumbs: [
      {
        label: 'Тесты',
        href: '/',
      },
      {
        label: 'Тест на профессию',
        href: '/catalog',
      },
    ],
    Img: 'proftest_img-01.jpg',
    subtitle: '30 вопросов',
    title: 'Тест на выбор профессии',
    titleCards: 'Рекомендуемые направления обучения',
    description:
      // eslint-disable-next-line max-len
      'Многие абитуриенты испытывают трудности в выборе профессии. Чтобы узнать, какая профессия подходит именно вам, мы предлагаем пройти тест на выбор профессии, который поможет вам уточнить свой выбор, узнать будущую профессию, увидеть новые варианты. ',
    resultSubtitle: 'Ваш результат',
    infoAdd: 'Для прохождения теста необходимо',
    linkSign: 'войти',
    linkReg: 'зарегистрироваться',
    dataQuiz: true,
    questions: [],
    answers: [],
    mindType: [],
    directionsList: [],
    getMindType: {},
  }),

  props: {
    methods: {
      type: Array,
    },
  },

  async fetch() {
    // Типы мышления и их описание
    const expandedMethod = {
      filter: { id: 1 },
      include: ['test_questions', 'directions'],
    };
    const resp = await getMindList(expandedMethod);
    this.mindType = resp;

    // Список вопросов
    const expandedMethod2 = {
      filter: { id: 2 },
      include: ['test_questions'],
    };

    const response = await getQuestionsList(expandedMethod2);
    this.answers = response.included.test_questions;
    let questions = [];
    this.answers.forEach((item) => {
      const answers = [
        { answer: 'да, всегда', point: 3 },
        { answer: 'иногда', point: 2 },
        { answer: 'нет', point: 1 },
      ];
      // eslint-disable-next-line no-param-reassign
      item.answers = answers;
    });
    questions = [...this.answers, ...questions];
    this.questions = questions;
  },

  methods: {
    changeHandler(value) {
      this.dataQuestion = value;
    },
    getQuize() {
      this.quizeShow = !this.quizeShow;
      this.$nextTick(() => {
        const testBlock = document.getElementById('test');
        testBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    },
    getReQuiz() {
      this.quizeShow = !this.quizeShow;
      this.quizComplete = false;
      this.maxId = null;
    },
    isQuizComplete(id) {
      this.mindType.forEach((item, idx) => {
        if (idx > 0 && +item.id === +id) {
          this.directionsList = item.included.directions;
        }
      });
      this.getMindType = this.mindType.find((answer) => answer.id === Number(id));
      this.quizComplete = true;
    },
  },
};
</script>
