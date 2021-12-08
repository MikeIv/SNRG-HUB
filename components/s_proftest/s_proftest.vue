<template>
  <section class="s-proftest">
    <div class="l-wide">
      <div class="s-proftest__wrapper">
        <!-- <a-breadcrumbs :breadcrumbs="breadcrumbs" /> -->
        <div class="s-proftest__content">
          <div class="s-proftest__left-col">
            <p class="s-proftest__subtitle">{{ subtitle }}</p>
            <h1 class="s-proftest__title">{{ title }}</h1>
            <p class="s-proftest__description">{{ description }}</p>
            <AButton class="s-proftest__btn" label="Пройти тест" bgColor="accent" v-if="!quizeShow" @click="getQuiz" />
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

      <div class="s-proftest__wrapper" v-if="quizeShow && !quizComplete">
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
            <h2 class="s-proftest__title">{{ mindType.name }}</h2>
            <p class="s-proftest__description" v-html="mindType.description"></p>
            <AButton class="s-proftest__btn" label="Пройти еще раз" @click="getReQuiz" />
          </div>
          <div class="s-proftest__right-col">
            <div class="s-proftest__img-block">
              <img :src="`${baseURL}${mindType.image}`" alt="Тест" class="s-proftest__img" />
            </div>
          </div>
        </div>
      </div>

      <div class="s-proftest__wrapper" v-if="quizComplete">
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
// import ABreadcrumbs from '~/components/a_breadcrumbs/a_breadcrumbs';
import MQuiz from '~/components/_ui/m_quiz/m_quiz';
import MCardEdu from '~/components/ui/m-card-edu/m_card_edu';
import getQuestionsList from '~/api/proftestList';

import './s_proftest.scss';

export default {
  name: 'SProftest',
  components: {
    // ABreadcrumbs,
    AButton,
    MQuiz,
    MCardEdu,
  },

  data: () => ({
    baseURL: process.env.NUXT_ENV_S3BACKET,
    authorization: false,
    quizeShow: false,
    quizComplete: false, // Скрытие  Quiz при true
    mindType: {},
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
    directionsList: [],
  }),

  props: {
    methods: {
      type: Array,
    },
  },

  async fetch() {
    let expandedMethod = {
      filter: {
        id: 1,
      },
      include: ['test_questions', 'directions'],
    };

    if (this.methods) {
      expandedMethod = this.methods[0].data;
    } else {
      expandedMethod.filter.id = this.quizId;
    }

    const response = await getQuestionsList(expandedMethod);
    this.answers = response;
    let questions = [];
    response.forEach((item, idx) => {
      const linkItem = item;
      if (idx > 0) {
        linkItem.included.test_questions.forEach((obj) => {
          const answers = [
            { answer: 'да, всегда', point: 3 },
            { answer: 'иногда', point: 2 },
            { answer: 'нет', point: 1 },
          ];
          const linkObj = obj;
          linkObj.answers = answers;
        });
        questions = [...questions, ...linkItem.included.test_questions];
        this.questions = questions;
      }
    });
  },

  methods: {
    changeHandler(value) {
      this.dataQuestion = value;
    },

    getQuiz() {
      this.quizeShow = !this.quizeShow;
    },
    getReQuiz() {
      this.quizeShow = !this.quizeShow;
      this.quizComplete = false;
      this.maxId = null;
    },
    isQuizComplete(id) {
      this.answers.forEach((item, idx) => {
        if (idx > 0 && +item.id === +id) {
          this.directionsList = item.included.directions;
        }
      });
      this.mindType = this.answers.find((answer) => answer.id === Number(id));
      this.quizComplete = true;
    },
  },
};
</script>
