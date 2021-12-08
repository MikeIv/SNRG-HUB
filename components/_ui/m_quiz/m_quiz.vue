<template>
  <div :class="['m-quiz', { ...quizClasses }]">
    <!-- quiz -->
    <div class="m-quiz__box">
      <div class="m-quiz__questions-count a-font_h6">{{ questionsCountText }}</div>
      <div class="m-quiz__quiz" v-if="countPosition != count">
        <div class="m-quiz__questions">
          <div class="m-quiz__prev" v-if="countPosition > 0" @click="prevQuiz">
            <i class="si-chevron-left"></i>Предыдущий вопрос
          </div>
          <h5 class="m-quiz__question a-font_h5">{{ dataQuestion[countPosition].name }}</h5>
          <span v-if="isMultiAnswer">выберите несколько вариантов ответа</span>
        </div>
        <div :class="['m-quiz__answers', { 'm-quiz__answers--f-wrap': isMultiAnswer }]">
          <div class="m-quiz__control" v-for="(item, index) in dataQuestion[countPosition].answers" :key="index">
            <a-control
              :title="item.answer"
              :typeBtn="isMultiAnswer ? 'checkbox' : 'radio'"
              :typeCtrl="isMultiAnswer ? 'checkbox' : 'radiobutton'"
              labelPosition="right"
              :valueControl="item.answer"
              v-model="item.checked"
              @change="changeQuiz(item, dataQuestion[countPosition].answers, dataQuestion[countPosition].answerOpts)"
            >
            </a-control>
          </div>
          <div class="m-quiz__button-wrap" v-if="showNextBtnQuiz">
            <a-button
              class="m-quiz__button"
              :disabled="btnNextDisabled"
              bgColor="accent"
              label="Далее"
              size="large"
              @click="nextQuiz"
            ></a-button>
          </div>
        </div>
      </div>

      <!-- finish form -->
      <a-progressbar v-if="toggleProgressbar" :percent="progress" />
    </div>
  </div>
</template>

<script>
import { AButton, AControl, AProgressbar } from '@cwespb/synergyui';

import './m_quiz.scss';

export default {
  name: 'm-quiz',
  components: {
    AProgressbar,
    AControl,
    AButton,
  },

  data: () => ({
    dataQuiz: true,
    baseUrl: process.env.NUXT_ENV_S3BACKET,
    btnNextDisabled: true,
    maxId: 0,
    count: 0,
    countPosition: 0,
    vueTelOpts: {
      mode: 'international',
      preferredCountries: ['RU', 'US'],
      autoFormat: true,
      inputOptions: {
        showDialCode: false,
        placeholder: 'Телефон',
        maxlength: 14,
      },
    },
    maxPhoneLength: 16,
    localRuPhoneLength: 11,
    listAnswers: [],
    answer: '',

    send: {
      name: '',
      phone: '',
      surname: '',
      email: '',
    },
  }),

  props: {
    quizId: Number,
    view: String,
    questions: {
      type: Array,
      default: () => [],
    },
  },

  watch: {
    countPosition() {
      if (this.countPosition === this.dataQuestion.length) this.$emit('isQuizComplete', this.maxId);
    },
  },
  computed: {
    progress() {
      if (this.countPosition === 0) return 0;
      return (this.countPosition / this.count) * 100;
    },
    isMultiAnswer() {
      const { answerOpts } = this.dataQuestion[this.countPosition];
      return answerOpts && answerOpts.checkbox;
    },
    questionsCountText() {
      return this.countPosition !== this.count
        ? `Вопрос ${this.countPosition + 1} из ${this.dataQuestion.length}`
        : 'Ты справился!';
    },
    showNextBtnQuiz() {
      const answerOpts = this.dataQuestion[this.countPosition]?.answerOpts;
      return answerOpts?.checkbox && !answerOpts?.maxSelectCount;
    },
    quizClasses() {
      return {
        [`m-quiz--${this.view}`]: this.view,
      };
    },
    toggleProgressbar() {
      return this.view ? this.countPosition !== this.dataQuestion.length : true;
    },
    dataQuestion: {
      get() {
        return [...this.questions];
      },
      set(value) {
        this.$emit('change-data-question', value);
      },
    },
  },

  async fetch() {
    this.count = this.dataQuestion.length;
  },

  mounted() {
    this.dataQuestion.forEach(({ answers }) => {
      if (answers) {
        answers.forEach((item) => this.$set(item, 'checked', false));
      }
    });
  },

  methods: {
    prevQuiz() {
      this.countPosition -= 1;
      this.setBtnNextState();
    },
    nextQuiz() {
      this.countPosition += 1;
      this.setBtnNextState();
    },
    setBtnNextState() {
      const btnNextState = this.listAnswers[this.countPosition]?.disabled;
      this.btnNextDisabled = btnNextState === undefined || btnNextState;
    },

    sendQuiz() {
      const dataQuiz = this.listAnswers.map((item) => ({ question: item.question, answer: item.answer }));
      let quizString = '';
      for (let i = 0; i < dataQuiz.length; i += 1) {
        quizString = `${quizString} Вопрос: ${dataQuiz[i].question} - Ответ:  ${dataQuiz[i].answer} \n`;
      }
      this.send.comment = quizString;
      // this.$lander.send(this.send).then((response) => {});
    },

    changeQuiz(current, variants, { checkbox, maxSelectCount } = {}) {
      const answer = [];
      variants
        .filter((item) => {
          const itemLink = item;
          if (!checkbox && item !== current) itemLink.checked = false;
          return item.checked;
        })
        .forEach((item) => answer.push(item));
      if (checkbox && !maxSelectCount) this.btnNextDisabled = answer.length < 1;

      this.listAnswers[this.countPosition] = {
        id: this.dataQuestion[this.countPosition].type_thinking_id,
        point: answer[0].point,
        disabled: this.btnNextDisabled,
        question: this.dataQuestion[this.countPosition].name,
      };

      /**
       * Обработка теста и вывод результата
       * ****
       */

      /**
       * Получение объекта, где ключом является id, а значением сумма point'ов из массива того же id
       */
      let objAnswers = {};
      objAnswers = this.listAnswers.reduce((acc, it) => ({ ...acc, [it.id]: (acc[it.id] || 0) + it.point }), {});

      /**
       * Получение id, где значение point максимальное
       */
      const maxAnswerPoin = Math.max(...Object.values(objAnswers));
      let maxAnswerId = null;
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of Object.entries(objAnswers)) {
        if (value === maxAnswerPoin) maxAnswerId = key;
      }
      const maxAnswersCount = Object.values(objAnswers).filter((item) => item === maxAnswerPoin).length;
      if (maxAnswersCount > 1) maxAnswerId = Object.keys(objAnswers).length + 1;

      this.maxId = maxAnswerId;

      if (!checkbox || (maxSelectCount && maxSelectCount === answer.length)) this.nextQuiz();
    },
  },
};
</script>
