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
            <AButton class="s-proftest__btn" label="Пройти тест" bgColor="accent" />
          </div>
          <div class="s-proftest__right-col">
            <div class="s-proftest__img-block">
              <img :src="require(`~/assets/images/${Img}`)" alt="Тест" class="s-proftest__img" />
            </div>
          </div>
        </div>
        <div class="s-proftest__info">
          <span class="s-proftest__info-description" v-html="infoDescr"></span>
          <a href="#" class="s-proftest__link" v-html="linkSign"></a>
          <span class="s-proftest__info-description">или</span>
          <a href="#" class="s-proftest__link" v-html="linkReg"></a>
        </div>
      </div>

      <div class="s-proftest__wrapper">
        <MQuiz />
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
        <template v-for="product in productsList">
          <nuxt-link
            :to="'/'"
            class="s-main-programs__wrapper"
            v-if="productsList && productsList.length > 0"
            :key="product.id"
          >
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
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import { AButton } from '@cwespb/synergyui';
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
  },

  data: () => ({
    baseURL: process.env.NUXT_ENV_S3BACKET,
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
        description: 'description',
        iconSrc: 'ms-icon-70x70.png',
        verticalImgSrc: 'proftest_card-img-01.png',
      },
    ],
  }),
};
</script>
