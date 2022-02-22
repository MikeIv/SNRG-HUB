<template>
  <section class="m-quiz" v-if="dataQuiz" id="quiz">
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
      <div class="m-quiz__quiz" v-else-if="!isQuizOver">
        <div class="m-quiz__questions">
          <div class="m-quiz__prev" v-if="currentQuestionId > 1" @click="prevQuiz">
            <i class="si-chevron-left"></i>К предыдущему вопросу
          </div>
          <h5 class="m-quiz__question a-font_h5">
            {{ dataQuestion.find((question) => question.id === currentQuestionId).question }}
          </h5>
        </div>
        <div
          class="m-quiz__answers"
          :class="{ column: dataQuestion.find((question) => question.id === currentQuestionId).answers.length < 4 }"
        >
          <div
            class="m-quiz__control"
            v-for="(questionAnswer, index) in dataQuestion.find((question) => question.id === currentQuestionId)
              .answers"
            :key="index"
          >
            <a-control
              :title="questionAnswer.answer"
              typeBtn="radio"
              typeCtrl="radiobutton"
              labelPosition="right"
              :valueControl="questionAnswer.answer"
              v-model="answer"
              name="quiz"
              @change="
                changeQuiz(
                  dataQuestion.find((question) => question.id === currentQuestionId),
                  questionAnswer,
                )
              "
              @handleClick="
                nextQuizClick(
                  dataQuestion.find((question) => question.id === currentQuestionId),
                  questionAnswer,
                )
              "
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
            <a-input
              placeholder="Имя"
              v-model="send.name"
              @input="validQuizData"
              :class="{ 'error-name': !nameErrorFlag }"
            ></a-input>
            <vue-tel-input
              class="a-input__row"
              :class="{ error: !phoneErrorFlag }"
              v-bind="vueTelOpts"
              type="phone"
              placeholder="Телефон"
              v-model="send.phone"
              @input="validatePhone"
            >
            </vue-tel-input>
            <a-button
              bgColor="accent"
              size="large"
              label="Отправить"
              :disabled="!sogl || validFlag || !validPhone"
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
    </div>
  </section>
</template>

<script>
import { VueTelInput } from 'vue-tel-input';
import { AButton, AInput, AControl } from '@cwespb/synergyui';

import getQuizzesDetail from '~/api/quizzesDetail';

import './s_quiz.scss';

export default {
  name: 's-quiz',
  components: {
    AControl,
    AButton,
    AInput,
    VueTelInput,
  },

  data: () => ({
    dataQuiz: null,
    dataQuestion: [],
    baseUrl: process.env.NUXT_ENV_S3BACKET,
    banerFlag: true,
    count: null,
    countPosition: 0,
    currentQuestionId: 1,
    startListAnswer: {},

    isQuizOver: false,
    prevQuestionId: null,
    listAnswers: {},
    answer: '',
    maxPhoneLength: 16,
    vueTelOpts: {
      mode: 'international',
      preferredCountries: ['RU', 'US'],
      wrapperClasses: '',
      inputClasses: '',
      autoFormat: true,
      defaultCountry: 'RU',
      inputOptions: {
        inputClasses: 'a-input a-input--large a-input--base',
        showDialCode: false,
        placeholder: 'Телефон',
        maxlength: 14,
      },
    },
    send: {
      name: '',
      phone: '',
    },
    sogl: true,
    validFlag: true,
    validName: false,
    validPhone: false,
    nameErrorFlag: true,
    phoneErrorFlag: true,
  }),

  props: {
    imageFon: String,
    image: String,
    methods: Array,
    quizId: Number,
  },

  async fetch() {
    let expandedMethod = {
      filter: {},
      include: ['questions', 'questions.answers'],
    };

    if (this.methods) {
      expandedMethod = this.methods[0].data;
    } else {
      expandedMethod.filter.id = this.quizId;
    }

    const response = await getQuizzesDetail(expandedMethod);
    this.dataQuiz = response;
    this.dataQuestion = response.questions?.filter((item) => item.answers.length > 0);
    this.currentQuestionId = this.dataQuestion[0].id;
    this.count = this.dataQuestion.length;
  },

  mounted() {
    this.$nextTick(function () {
      this.$lander.cookie.set('test1', 'test dev');

      const loadDataForm = this.$lander.storage.load('quiz');
      if (loadDataForm) this.send = loadDataForm;

      const dataForm = [{ value: this.send.name }, { value: this.send.tel }];
      this.validFlag = this.$lander.valid(dataForm);

      if (this.dataQuiz) {
        this.getQuizParameters();
      }
    });
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('DOMContentLoaded', this.getQuizParameters);
  },

  updated() {
    if (this.dataQuiz) {
      this.getQuizParameters();
    }
  },

  created() {
    if (this.dataQuiz) {
      this.getQuizParameters();
    }
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('DOMContentLoaded', this.getQuizParameters);
  },

  methods: {
    validatePhone(phone, { valid, number }) {
      if (phone) {
        const telOpts = this.vueTelOpts;
        const inputOpts = telOpts.inputOptions;
        const isLocalCode = phone[0] === '8';

        inputOpts.maxlength = this.maxPhoneLength;
        telOpts.autoFormat = !isLocalCode;

        this.validPhone = valid && isLocalCode ? phone.length === 11 : valid;

        if (valid) {
          telOpts.mode = isLocalCode ? 'auto' : 'international';
          inputOpts.maxlength = isLocalCode ? 11 : number.length;
        } else {
          inputOpts.maxlength = 16;
        }
        this.validQuizData();
      }
    },

    handlerSave() {
      const dataToSend = { ...this.send };
      delete dataToSend.comments;
      this.$lander.storage.save('quiz', dataToSend);
    },

    async startQuiz() {
      this.banerFlag = false;
    },

    validQuizData() {
      this.handlerSave();
      this.checkedValidateError();
    },

    checkedValidateError() {
      this.nameErrorFlag = /^([A-ZА-ЯЁ][-,a-z, a-яё. ']+[ ]*)+$/i.test(this.send.name);
      this.phoneErrorFlag = this.validPhone === true && this.send.phone !== '';
      return this.nameErrorFlag && this.validPhone;
    },

    sendQuiz() {
      const dataQuiz = Object.values(this.listAnswers).map((item) => ({
        question: item.question,
        answer: item.answer,
      }));
      let quizString = '';
      for (let i = 0; i < dataQuiz.length; i += 1) {
        quizString = `${quizString} Вопрос: ${dataQuiz[i].question} - Ответ:  ${dataQuiz[i].answer} \n`;
      }
      this.send.comments = quizString;
      this.$lander.send(this.send);
    },

    prevQuiz() {
      if (Object.keys(this.listAnswers).length >= 1) {
        const lastQuestion = Object.entries(this.listAnswers)[Object.keys(this.listAnswers).length - 1][1];
        this.answer = lastQuestion.answer;
        this.currentQuestionId = lastQuestion.question_id;

        if (Object.keys(this.listAnswers).length !== 1) {
          delete this.listAnswers[lastQuestion.question_id];
        }
      }
    },

    changeQuiz(question, answer) {
      this.listAnswers[question.id] = {
        ...answer,
        question: question.question,
      };

      this.prevQuestionId = answer.question_id;
      this.answer = '';
      this.currentQuestionId = answer.next_question_id;
      if (answer.next_question_id === 1) {
        this.isQuizOver = true;
      }
    },

    nextQuizClick(question, answer) {
      if (answer.answer === this.answer) {
        this.changeQuiz(question, answer);
      }
    },

    handleScroll() {
      this.getQuizParameters();
    },

    getQuizParameters() {
      const quiz = {
        top: this.$el.offsetTop,
        height: this.$el.offsetHeight,
      };

      this.$store.commit('setQuizInfo', quiz);
    },
  },
};
</script>
