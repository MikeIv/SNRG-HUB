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
          <h5 class="m-quiz__question a-font_h5">{{ dataQuestion[countPosition].question }}</h5>
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
      <template v-else-if="view">
        <SAccountTestsResult @bannerBtnClick="resultBtnClickHandle" :hideTitle="true" />
      </template>

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
    banerFlag: true,
    btnNextDisabled: true,
    count: null,
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
    sogl: true,
    validFlag: false,
    validPhone: false,
  }),

  props: {
    methods: Array,
    quizId: Number,
    view: String,
    questions: {
      type: Array,
      default: () => [],
    },
  },

  watch: {
    countPosition() {
      if (this.countPosition === this.dataQuestion.length) this.$emit('isQuizComplete');
    },
  },
  computed: {
    progress() {
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
    dataQuestion() {
      return [...this.questions];
    },
  },

  async fetch() {
    /* let expandedMethod = {
      filter: {},
    };

    if (this.methods) {
      expandedMethod = this.methods[0].data;
    } else {
      expandedMethod.filter.id = this.quizId;
    }

    const response = await getQuizzesDetail(expandedMethod);
    this.dataQuiz = response;
    this.dataQuestion = response.questions.filter((item) => item.answers.length > 0); */
    this.count = this.dataQuestion.length;
  },

  mounted() {
    this.$nextTick(function () {
      const loadDataForm = this.$lander.storage.load('quizform');
      if (loadDataForm) this.send = loadDataForm;
      const dataForm = [
        { value: this.send.name },
        { value: this.send.surname },
        { value: this.send.email, type: 'email' },
      ];
      this.validFlag = this.$lander.valid(dataForm);
    });

    this.dataQuestion.forEach(({ answers }) => {
      if (answers) {
        answers.forEach((item) => this.$set(item, 'checked', false));
      }
    });
  },

  methods: {
    validatePhone(phone, { valid, number }) {
      const telOpts = this.vueTelOpts;
      const inputOpts = telOpts.inputOptions;
      const isLocalCode = phone[0] === '8';

      inputOpts.maxlength = this.maxPhoneLength;
      telOpts.autoFormat = !isLocalCode;

      this.validPhone = valid && isLocalCode ? phone.length === this.localRuPhoneLength : valid;

      if (valid) {
        telOpts.mode = isLocalCode ? 'auto' : 'international';
        inputOpts.maxlength = isLocalCode ? this.localRuPhoneLength : number.length;
      }

      this.validFormData();
    },
    validFormData() {
      const dataForm = [
        { value: this.send.name },
        { value: this.send.surname },
        { value: this.send.email, type: 'email' },
      ];
      this.validFlag = this.$lander.valid(dataForm) && this.validPhone;
      this.$lander.storage.save('quizform', this.send);
    },
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

    async startQuiz() {
      this.banerFlag = false;
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
      this.$emit('onSendQuizForm');
    },

    changeQuiz(current, variants, { checkbox, maxSelectCount } = {}) {
      const answer = [];

      variants
        .filter((item) => {
          const itemLink = item;
          if (!checkbox && item !== current) itemLink.checked = false;
          return item.checked;
        })
        .forEach((item) => answer.push(item.answer));

      if (checkbox && !maxSelectCount) this.btnNextDisabled = answer.length < 1;

      this.listAnswers[this.countPosition] = {
        answer,
        disabled: this.btnNextDisabled,
        question: this.dataQuestion[this.countPosition].question,
      };

      if (!checkbox || (maxSelectCount && maxSelectCount === answer.length)) this.nextQuiz();
    },
    resultBtnClickHandle(key) {
      this.$emit('bannerBtnClick', key);
    },
  },
};
</script>
