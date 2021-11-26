<template>
  <section class="s-proftest">
    <div class="l-wide">
      <div class="s-proftest__wrapper">
        <a-breadcrumbs :breadcrumbs="breadcrumbs" />
        <div class="s-proftest__content">
          <div class="s-proftest__left-col">
            <p class="s-proftest__subtitle">{{ subtitle }}</p>
            <h2 class="s-proftest__title">{{ title }}</h2>
            <p class="s-proftest__description">{{ description }}</p>
            <AButton class="s-proftest__btn" label="Пройти тест" bgColor="accent" v-if="!quizeShow" @click="getQuize" />
          </div>
          <div class="s-proftest__right-col">
            <div class="s-proftest__img-block">
              <img :src="require(`~/assets/images/${Img}`)" alt="Тест" class="s-proftest__img" />
            </div>
          </div>
          <div class="s-proftest__info" v-if="!quizeShow">
            <p class="s-proftest__info-description" v-html="infoAdd"></p>
            <a href="#" class="s-proftest__link" v-html="linkSign"></a>
            <p class="s-proftest__info-description">или</p>
            <a href="#" class="s-proftest__link" v-html="linkReg"></a>
          </div>
        </div>
      </div>

      <div class="s-proftest__wrapper" v-if="quizeShow">
        <MQuiz
          class="s-proftest__quiz"
          :questions="questions"
          @onSendQuizForm="sendRouteParams"
          @isQuizComplete="isQuizComplete"
        />
      </div>

      <div class="s-proftest__wrapper">
        <div class="s-proftest__content">
          <div class="s-proftest__left-col">
            <p class="s-proftest__subtitle">{{ resultSubtitle }}</p>
            <h2 class="s-proftest__title">{{ resultTitle }}</h2>
            <p class="s-proftest__description">{{ resultDescription }}</p>
            <AButton class="s-proftest__btn" label="Пройти еще раз" />
          </div>
          <div class="s-proftest__right-col">
            <div class="s-proftest__img-block">
              <img :src="require(`~/assets/images/${resultImg}`)" alt="Тест" class="s-proftest__img" />
            </div>
          </div>
        </div>
      </div>

      <div class="s-proftest__wrapper">
        <swiper ref="awesomeSwiper" :options="swiperOptionA">
          <swiper-slide v-for="product in productsList" :key="product.id">
            <nuxt-link :to="'/'" class="s-main-programs__wrapper" v-if="productsList && productsList.length > 0">
              <m-card
                :title="product.title"
                :bottomText="product.bottomText"
                :name="product.name"
                :description="product.description"
                :iconSrc="require(`~/static/${product.iconSrc}`)"
                :verticalImgSrc="require(`~/assets/images/${product.verticalImgSrc}`)"
                type="program"
              />
            </nuxt-link>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script>
import { AButton } from '@cwespb/synergyui';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import ABreadcrumbs from '~/components/a_breadcrumbs/a_breadcrumbs';
import MQuiz from '~/components/_ui/m_quiz/m_quiz';
import MCard from '~/components/_ui/M-card/M-card';
import './s_proftest.scss';

export default {
  name: 'SProftest',
  components: {
    ABreadcrumbs,
    AButton,
    MQuiz,
    MCard,
    Swiper,
    SwiperSlide,
  },

  data: () => ({
    baseURL: process.env.NUXT_ENV_S3BACKET,
    quizeShow: false,
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
    Img: 'proftest_img-01.png',
    subtitle: '30 вопросов',
    title: 'Тест на выбор профессии',
    description:
      // eslint-disable-next-line max-len
      'Многие абитуриенты испытывают трудности в выборе профессии. Чтобы узнать, какая профессия подходит именно вам, мы предлагаем пройти тест на выбор профессии, который поможет вам уточнить свой выбор, узнать будущую профессию, увидеть новые варианты. ',
    resultImg: 'proftest_img-02.png',
    resultSubtitle: 'Ваш результат',
    resultTitle: 'Предметно-действенное мышление ',
    resultDescription:
      // eslint-disable-next-line max-len
      'Предметно-действенное мышление свойственно людям дела. Они усваивают информацию через движения. Обычно они обладают хорошей координацией движений. Их руками создан весь окружающий нас предметный мир. Они водят машины, стоят у станков, собирают компьютеры. Без них невозможно реализовать самую блестящую идею. Этим мышление важно для спортсменов, танцоров, артистов.',
    infoAdd: 'Для прохождения теста необходимо',
    linkSign: 'войти',
    linkReg: 'зарегистрироваться',

    productsList: [
      {
        id: 1,
        title: 'Разработка Web-проектов',
        bottomText: 'Университет «Синергия»',
        name: 'name',
        description: 'Дополнительное образование',
        iconSrc: 'ms-icon-70x70.png',
        verticalImgSrc: 'proftest_card-img-01.png',
      },
      {
        id: 2,
        title: 'Разработка Web-проектов',
        bottomText: 'Университет «Синергия»',
        name: 'name',
        description: 'Дополнительное образование',
        iconSrc: 'ms-icon-70x70.png',
        verticalImgSrc: 'proftest_card-img-01.png',
      },
      {
        id: 3,
        title: 'Разработка Web-проектов',
        bottomText: 'Университет «Синергия»',
        name: 'name',
        description: 'Дополнительное образование',
        iconSrc: 'ms-icon-70x70.png',
        verticalImgSrc: 'proftest_card-img-01.png',
      },
      {
        id: 4,
        title: 'Разработка Web-проектов',
        bottomText: 'Университет «Синергия»',
        name: 'name',
        description: 'Дополнительное образование',
        iconSrc: 'ms-icon-70x70.png',
        verticalImgSrc: 'proftest_card-img-01.png',
      },
    ],

    dataQuiz: true,
    questions: [
      {
        id: 1,
        question: 'Мне легче что-либо сделать самому, чем объяснить другому',
        answers: [
          { answer: 'да, всегда', point: 3 },
          { answer: 'иногда', point: 2 },
          { answer: 'нет', point: 1 },
        ],
      },
      {
        id: 2,
        question: 'Я люблю читать книги',
        answers: [
          { answer: 'да, всегда', point: 3 },
          { answer: 'иногда', point: 2 },
          { answer: 'нет', point: 1 },
        ],
      },
      {
        id: 3,
        question: 'Мне нравится живопись, скульптура, архитектура',
        answers: [
          { answer: 'да, всегда', point: 3 },
          { answer: 'иногда', point: 2 },
          { answer: 'нет', point: 1 },
        ],
      },
      {
        id: 4,
        question: 'Даже в отлаженном деле я стараюсь что-то улучшить',
        answers: [
          { answer: 'да, всегда', point: 3 },
          { answer: 'иногда', point: 2 },
          { answer: 'нет', point: 1 },
        ],
      },
      {
        id: 5,
        question: 'Я лучше понимаю, если мне объясняют на предметах или рисунках',
        answers: [
          { answer: 'да, всегда', point: 3 },
          { answer: 'иногда', point: 2 },
          { answer: 'нет', point: 1 },
        ],
      },
      {
        id: 1,
        question: 'Я люблю играть в стратегические игры',
        answers: [
          { answer: 'да, всегда', point: 3 },
          { answer: 'иногда', point: 2 },
          { answer: 'нет', point: 1 },
        ],
      },
      {
        id: 2,
        question: 'Я легко излагаю свои мысли как в устной, так и в письменной форме',
        answers: [
          { answer: 'да, всегда', point: 3 },
          { answer: 'иногда', point: 2 },
          { answer: 'нет', point: 1 },
        ],
      },
      {
        id: 3,
        question: 'Я отчетливо могу представить героев и описываемые события, когда читаю книгу',
        answers: [
          { answer: 'да, всегда', point: 3 },
          { answer: 'иногда', point: 2 },
          { answer: 'нет', point: 1 },
        ],
      },
      {
        id: 4,
        question: 'Я предпочитаю самостоятельно планировать свою работу',
        answers: [
          { answer: 'да, всегда', point: 3 },
          { answer: 'иногда', point: 2 },
          { answer: 'нет', point: 1 },
        ],
      },
      {
        id: 5,
        question: 'Мне нравится все делать своими руками',
        answers: [
          { answer: 'да, всегда', point: 3 },
          { answer: 'иногда', point: 2 },
          { answer: 'нет', point: 1 },
        ],
      },
    ],
  }),

  methods: {
    getQuize() {
      this.quizeShow = !this.quizeShow;
    },
    sendRouteParams() {
      this.$router.push({
        name: 'account',
        params: {
          formName: this.formName,
        },
      });
    },
    isQuizComplete() {
      this.$emit('isQuizComplete');
    },
  },
};
</script>
