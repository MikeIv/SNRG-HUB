<template>
  <section class="m-quiz" v-if="dataQuiz" id="quiz" ref="quiz">
    <div
      :class="
        this.$route.name === 'index' || this.$route.name === 'catalog' || this.$route.name === 'catalog-all'
          ? 'l-wide'
          : 'l-default'
      "
    >
      <!-- banner -->
      <div
        v-if="banerFlag"
        class="m-quiz__baner"
        :style="`background-image: url(${baseUrl}${dataQuiz.background_image})`"
      >
        <div class="m-quiz__baner-img" :style="`background-image: url(${baseUrl}${dataQuiz.person_image})`"></div>
        <h1 class="m-quiz__title a-font_h1" v-html="dataQuiz.title"></h1>
        <div class="m-quiz__descript a-font_l-m" v-html="dataQuiz.text"></div>
        <a-button bgColor="accent" :label="dataQuiz.button" @click="startQuiz"></a-button>
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
              v-model="answer"
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
            <a-input placeholder="Имя" v-model="send.name" @input="validQuizData"></a-input>
            <a-input
              type="phone"
              placeholder="Телефон"
              @validate="validatePhone"
              v-model="send.phone"
              @input="validQuizData"
            ></a-input>
            <a-button
              bgColor="accent"
              size="large"
              label="Отправить"
              :disabled="!sogl || !validFlag || !validPhone"
              @click="sendQuiz"
            ></a-button>
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

      <a-progressbar :percent="progress" v-if="!banerFlag" />
    </div>
  </section>
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

    listAnswers: [],
    answer: '',

    send: {
      name: '',
      phone: '',
    },
    sogl: true,
    validFlag: false,
    validPhone: false,
  }),

  props: {
    imageFon: String,
    image: String,
    methods: Array,
    quizId: Number,
  },

  computed: {
    progress() {
      return (this.countPosition / this.count) * 100;
    },
  },

  async fetch() {
    let expandedMethod = {
      filter: {},
    };

    if (this.methods) {
      expandedMethod = this.methods[0].data;
    } else {
      expandedMethod.filter.id = this.quizId;
    }

    const response = await getQuizzesDetail(expandedMethod);
    this.dataQuiz = response;
    this.dataQuestion = response.questions.filter((item) => item.answers.length > 0);
    this.count = this.dataQuestion.length;
  },

  mounted() {
    this.$store.state.quizTop = this.$el.offsetTop;
    this.$store.state.quizHeight = this.$el.offsetHeight;

    this.$nextTick(function () {
      this.$lander.cookie.set('test1', 'test dev');

      const loadDataForm = this.$lander.storage.load('quiz');
      if (loadDataForm) this.send = loadDataForm;

      const dataForm = [{ value: this.send.name }, { value: this.send.tel }];
      this.validFlag = this.$lander.valid(dataForm);
    });
  },

  created() {},

  methods: {
    validatePhone(value) {
      this.validPhone = value.valid;
    },
    prevQuiz() {
      this.countPosition -= 1;
      this.answer = this.listAnswers[this.countPosition].answer;
    },

    async startQuiz() {
      console.log(this.$lander.cookie.get('test1'));
      this.banerFlag = false;
    },

    validQuizData() {
      const dataForm = [{ value: this.send.name }, { value: this.send.tel }];
      this.validFlag = this.$lander.valid(dataForm);

      this.$lander.storage.save('quiz', this.send);
    },

    sendQuiz() {
      const dataQuiz = this.listAnswers.map((item) => ({ question: item.question, answer: item.answer }));
      let quizString = '';
      for (let i = 0; i < dataQuiz.length; i += 1) {
        quizString = `${quizString} Вопрос: ${dataQuiz[i].question} - Ответ:  ${dataQuiz[i].answer} \n`;
      }
      this.send.comment = quizString;
      this.$lander.send(this.send).then((response) => {
        console.log(response);
      });
    },

    changeQuiz(value) {
      this.listAnswers[this.countPosition] = {
        ...value,
        question: this.dataQuestion[this.countPosition].question,
      };
      this.answer = '';
      this.countPosition += 1;
    },
  },
};
</script>
