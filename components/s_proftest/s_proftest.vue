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
        question: 'Какой супер-способностью ты бы хотел обладать?',
        answers: [
          { answer: 'передвигать предметы в пространстве' },
          { answer: 'запускать шаровые молнии' },
          { answer: 'менять внешность' },
          { answer: 'разговаривать с животными' },
        ],
      },
      {
        question: 'На какой YouTube канал ты бы подписался?',
        answers: [
          { answer: 'современный дизайн интерьера' },
          { answer: 'танковый биатлон' },
          { answer: 'все о моде, красоте и здоровье' },
          { answer: 'новые разработки космической энергетики' },
        ],
      },
      {
        question: 'В каникулы тебе предложили тематическую смену в лагере. Какую ты выберешь?',
        answers: [
          { answer: 'театральную и киносмену' },
          { answer: 'волонтерскую в заповеднике' },
          { answer: 'предпринимательскую' },
          { answer: 'скаутскую по навыкам выживания' },
        ],
      },
      {
        question:
          'Представь, что тебя пригласили в команду по разработке нового электромобиля. Чем бы ты мог заняться?',
        answers: [
          { answer: 'новыми материалами для кузова' },
          { answer: 'программным обеспечением' },
          { answer: 'сборкой двигателя' },
          { answer: 'расчетом стоимости и прибыли' },
        ],
      },
      {
        question: 'Тебя попросили разобраться в конфликтной ситуации в классе. С чего ты начнешь?',
        answers: [
          { answer: 'выясню у участников их мнение' },
          { answer: 'сделаю google опрос общественного мнения' },
          { answer: 'попрошу помощи друга' },
          { answer: 'проанализирую устав школы по правилам действий в конфликтной ситуации' },
        ],
      },
      {
        question: 'Какой вид деятельности тебе больше нравится?',
        answers: [
          { answer: 'фантазировать или придумывать что-то новое' },
          { answer: 'конструировать, чертить или проектировать модель' },
          { answer: 'петь, танцевать или рисовать' },
          { answer: 'управлять или проверять технику' },
        ],
      },
      {
        question: 'Тебе предложили стажировку. Какую организацию ты бы выбрал?',
        answers: [
          { answer: 'юридическое агентство' },
          { answer: 'архитектурное бюро' },
          { answer: 'департамент внешней торговли' },
          { answer: 'клиника стоматологии и косметологии' },
        ],
      },
      {
        question: 'Какой кружок в школе ты бы выбрал?',
        answers: [
          { answer: '«Электрика для начинающих»' },
          { answer: '«Разговорный клуб иностранных языков»' },
          { answer: 'Курс по здоровой кулинарии' },
          { answer: 'Тренинг «Психология лидерства»' },
        ],
      },
      {
        question: 'Какая новость тебя заинтересует?',
        answers: [
          { answer: 'анонс нового телефона' },
          { answer: 'топ-10 списка Forbes' },
          { answer: 'презентация электрокара' },
          { answer: 'проходной балл ЕГЭ по обществознанию' },
        ],
      },
      {
        question: 'Что ты положишь в «капсулу времени» для следующих поколений?',
        answers: [
          { answer: 'семена редких растений' },
          { answer: 'жесткий диск с документацией для водородного двигателя' },
          { answer: 'генетический код вымирающих животных' },
          { answer: 'чертежи космических ракет' },
        ],
      },
      {
        question: 'У тебя есть возможность поехать в другую страну. В качестве коготы бы поехал?',
        answers: [
          { answer: 'как торговый представитель крупной компании' },
          { answer: 'как киберспортсмен на международный турнир' },
          { answer: 'как переводчик на международный форум по безопасности' },
          { answer: 'как артист в турне' },
        ],
      },
      {
        question: 'Тебе подарили сертификат на мастер-класс. Какой ты выберешь?',
        answers: [
          { answer: 'по правам на интеллектуальную собственность' },
          { answer: 'по сценической пластике и речи' },
          { answer: 'по первой помощи в экстремальной ситуации' },
          { answer: 'по монтажу видео для социальных сетей' },
        ],
      },
      {
        question: 'Что более важно из списка для благополучия людей?',
        answers: [
          { answer: 'развитие компьютерных технологий и искусственного интеллекта' },
          { answer: 'доступность и качество медицины' },
          { answer: 'техника, которая заменит человека на тяжелых работах' },
          { answer: 'эффективная правоохранительная система' },
        ],
      },
      {
        question: 'Тебе нужно купить подарок родителям, как ты выберешь заработать деньги?',
        answers: [
          { answer: 'займусь репетиторством по математике' },
          { answer: 'сделаю творческий продукт и продам на ярмарке' },
          { answer: 'подработаю в MacDonalds' },
          { answer: 'сделаю в сети сайт или настрою рекламу' },
        ],
      },
      {
        question: 'Представь, что тебя предложили стать директором школы, что ты изменишь?',
        answers: [
          { answer: 'сделаю современный медицинский кабинет' },
          { answer: 'куплю крутые компьютеры' },
          { answer: 'устрою вечеринку' },
          { answer: 'заведу школьный TikTok' },
        ],
      },
      {
        question: 'Чем ты займешься в свободное время?',
        answers: [
          { answer: 'ремонтом или запуском квадрокоптеров' },
          { answer: 'спортом' },
          { answer: 'программированием' },
          { answer: 'организую с друзьями школьный концерт' },
        ],
      },
      {
        question: `Представь, что в будущем ты отправишься в космическую экспедицию на Марс.
        Какая роль подошла бы тебе больше всего?`,
        answers: [
          { answer: 'выращивать растения на космической станции' },
          { answer: 'вести расчет навигации' },
          { answer: 'отслеживать системы жизнеобеспечения' },
          { answer: 'изучать язык для общения с марсианами' },
        ],
      },
      {
        question: 'С кем бы ты хотел провести совместный прямой эфир в Instagram?',
        answers: [
          { answer: 'с трэвел блогером' },
          { answer: 'с главным редактором бизнес-журнала' },
          { answer: 'с кинологом' },
          { answer: 'с управляющим медицинским центром' },
        ],
      },
      {
        question: 'Вам с друзьями нужно выбрать школьный проект. Чтобы бы ты предложил выбрать?',
        answers: [
          { answer: 'вести наблюдение за муравьиной фермой' },
          { answer: 'придумать модель аккумулятора для электромобиля' },
          { answer: 'провести химический анализ состава йогуртов популярных торговых марок' },
          { answer: 'сделать макет «умного дома»' },
        ],
      },
      {
        question: 'Как ты думаешь, какая профессия будет в топе через 10 лет?',
        answers: [
          { answer: 'специалист по экотуризму' },
          { answer: 'финансовый кризис менеджер' },
          { answer: 'архитектор энергонулевых домов' },
          { answer: 'специалист по искусственному интеллекту' },
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
