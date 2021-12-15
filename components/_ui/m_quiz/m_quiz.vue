<template>
  <div :class="['m-quiz', { ...quizClasses }]">
    <!-- quiz -->
    <div class="m-quiz__box">
      <div class="m-quiz__questions-count a-font_h6">{{ questionsCountText }}</div>
      <div class="m-quiz__quiz" v-if="countPosition !== count">
        <div class="m-quiz__questions">
          <div class="m-quiz__prev" v-if="countPosition > 0" @click="prevQuiz">
            <i class="si-chevron-left"></i>Предыдущий вопрос
          </div>
          <h5 class="m-quiz__question a-font_h5">{{ dataQuestion[countPosition].name }}</h5>
        </div>
        <div :class="['m-quiz__answers']">
          <div class="m-quiz__control" v-for="(item, index) in dataQuestion[countPosition].answers" :key="index">
            <a-control
              :title="item.answer"
              :typeBtn="'radio'"
              :typeCtrl="'radiobutton'"
              labelPosition="right"
              :valueControl="item.answer"
              :checked="item.checked"
              v-model="item.checked"
              @change="changeQuiz(item, dataQuestion[countPosition].answers)"
              @handleClick="nextQuizClick(item, dataQuestion[countPosition].answers)"
            >
            </a-control>
          </div>
        </div>
      </div>
      <!-- finish form -->
      <a-progressbar v-if="toggleProgressbar" :percent="progress" />
    </div>
  </div>
</template>

<script>
import { AControl, AProgressbar } from '@cwespb/synergyui';
import './m_quiz.scss';

export default {
  name: 'm-quiz',
  components: {
    AProgressbar,
    AControl,
  },

  data: () => ({
    dataQuiz: true,
    baseUrl: process.env.NUXT_ENV_S3BACKET,
    maxId: 0,
    count: 0,
    countPosition: 0,
    listAnswers: [],
    answer: '',
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
  mounted() {
    this.dataQuestion.forEach(({ answers }) => {
      if (answers) {
        answers.forEach((item) => this.$set(item, 'checked', false));
      }
    });
    this.count = this.dataQuestion.length;
  },
  computed: {
    progress() {
      if (this.countPosition === 0) return 0;
      return (this.countPosition / this.count) * 100;
    },
    questionsCountText() {
      return this.countPosition !== this.count
        ? `Вопрос ${this.countPosition + 1} из ${this.dataQuestion.length}`
        : 'Ты справился!';
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
        this.$emit('set-question', value);
      },
    },
  },

  methods: {
    prevQuiz() {
      this.countPosition -= 1;
    },
    nextQuiz() {
      this.countPosition += 1;
    },

    nextQuizClick(current, variants, { checkbox } = {}) {
      variants.forEach((item) => {
        if (!checkbox && item !== current) {
          // eslint-disable-next-line no-param-reassign
          item.checked = false;
        }
        if (item.checked !== false) {
          this.nextQuiz();
        }
      });
    },
    changeQuiz(current, variants, { checkbox } = {}) {
      const answer = [];
      variants.forEach((item) => {
        if (!checkbox && item !== current) {
          // eslint-disable-next-line no-param-reassign
          item.checked = false;
        }
        if (item.checked) {
          answer.push(item);
        }
      });

      this.listAnswers[this.countPosition] = {
        id: this.dataQuestion[this.countPosition].type_thinking_id,
        point: answer[0].point,
      };

      this.nextQuiz();

      if (this.listAnswers.length === this.count) {
        this.getMaxId();
      }
    },
    getMaxId() {
      let objAnswers = {};
      objAnswers = this.listAnswers.reduce((acc, it) => ({ ...acc, [it.id]: (acc[it.id] || 0) + it.point }), {});
      const maxAnswerPoin = Math.max(...Object.values(objAnswers));
      let maxAnswerId = null;
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of Object.entries(objAnswers)) {
        if (value === maxAnswerPoin) maxAnswerId = key;
      }
      const maxAnswersCount = Object.values(objAnswers).filter((item) => item === maxAnswerPoin).length;
      if (maxAnswersCount > 1) maxAnswerId = Object.keys(objAnswers).length + 1;

      this.maxId = maxAnswerId;
    },
  },
};
</script>
