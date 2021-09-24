<template>
  <div class="l-wide m-quiz" v-if="dataQuiz">
    <!-- baner -->
    <div
      v-if="banerFlag"
      class="m-quiz__baner"
      :style="`background-image: url(${baseUrl}/${dataQuiz.background_image})`"
    >
      <div class="m-quiz__baner-img" :style="`background-image: url(${baseUrl}/${dataQuiz.person_image})`"></div>
      <h1 class="m-quiz__title a-font_h1">{{ dataQuiz.title }}</h1>
      <div class="m-quiz__descript a-font_l-m">{{ dataQuiz.text }}</div>
      <a-button bgColor="accent" :label="dataQuiz.button" @onClickBtn="startQuiz"></a-button>
    </div>
    <!-- quiz -->
    <div class="m-quiz__quiz" v-else-if="countPosition != count">
      <div class="m-quiz__questions">
        <div class="m-quiz__prev" v-if="countPosition > 0" @click="prevQuiz">
          <i class="si-chevron-left"></i>К предыдущему вопросу
        </div>
        <h5 class="m-quiz__question a-font_h5">{{ dataQuestion[countPosition].question }}</h5>
      </div>
      <div class="m-quiz__answers">
        <div class="m-quiz__control" v-for="(item, index) in dataQuestion[countPosition].answers" :key="index">
          <a-control
            :title="item.answer"
            typeBtn="radio"
            typeCtrl="radiobutton"
            labelPosition="right"
            :valueControl="item.answer"
            v-model="ansver"
            name="quiz"
            @change="changeQuiz(item)"
          >
          </a-control>
        </div>
      </div>
    </div>
    <!-- finish -->
    <div v-else class="m-quiz__finish">
      <div class="m-quiz__finish-text">
        <h5 class="m-quiz__finish-title a-font_h5">Мы подобрали вам программу обучения</h5>
        <div class="m-quiz__finish-desc a-font_l-m">
          Заполните форму, чтобы узнать больше о программе и наших предложений
        </div>
      </div>
      <div class="m-quiz__finish-inputs">
        <div class="m-quiz__finish-data">
          <a-input placeholder="Имя" v-model="send.name"></a-input>
          <a-input placeholder="Телефон" v-model="send.tel"></a-input>
          <a-button bgColor="accent" size="large" label="Отправить" :disabled="!sogl" @click="sendQuiz"></a-button>
        </div>
        <div class="m-quiz__finish-sogl">
          <a-control
            typeBtn="checkbox"
            typeCtrl="checkbox"
            v-model="sogl"
            labelPosition="right"
            title="Нажимая на кнопку, вы соглашаетсь с политикой конфиденциальности и на получение рассылок"
          >
          </a-control>
        </div>
      </div>
    </div>

    <a-progressbar :percent="progress" />
  </div>
</template>

<script>
import {
  AButton, AInput, AControl, AProgressbar,
} from '@cwespb/synergyui';
import getQuizzesDetail from '~/api/quizzesDetail';

import './s_quiz.scss';

export default {
  name: 's-quiz',
  components: {
    AProgressbar,
    AControl,
    AButton,
    AInput,
  },

  data: () => ({
    dataQuiz: null,
    dataQuestion: [],
    baseUrl: process.env.NUXT_ENV_S3BACKET,
    banerFlag: true,
    count: null,
    countPosition: 0,

    listAnsvers: [],
    ansver: '',

    send: {
      name: '',
      tel: '',
    },
    sogl: true,
  }),

  props: {
    imageFon: String,
    image: String,
  },

  computed: {
    progress() {
      return (this.countPosition / this.count) * 100;
    },
  },

  async fetch() {
    const expandedMethod = this.methods;
    const response = await getQuizzesDetail(expandedMethod);
    this.dataQuiz = response;
    this.dataQuestion = response.questions.filter((item) => item.answers.length > 0);
    this.count = this.dataQuestion.length;
  },

  methods: {
    prevQuiz() {
      this.countPosition -= 1;
      this.ansver = this.listAnsvers[this.countPosition].ansver;
    },

    async startQuiz() {
      this.banerFlag = false;
    },

    sendQuiz() {},

    changeQuiz(value) {
      this.listAnsvers[this.countPosition] = { ...value, ansver: this.ansver };
      this.countPosition += 1;
    },
  },
};
</script>
