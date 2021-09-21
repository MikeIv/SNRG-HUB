<template>
  <div class="m-quiz" v-if="dataQuiz">

    <!-- baner -->
    <div v-if="banerFlag" class="m-quiz__baner" :style="`background-image: url(${imageFon})`">
      <div class="m-quiz__baner-img" :style="`background-image: url(${image})`"></div>
      <h1 class="m-quiz__title a-font_h1">{{dataQuiz.title}}</h1>
      <div class="m-quiz__descript a-font_l-m">{{dataQuiz.text}}</div>
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
            @change="changeQuiz(item)">
          </a-control>
        </div>

      </div>
    </div>

    <!-- finish -->
    <div v-else class="m-quiz__finish">
      <div class="m-quiz__finish-text">
        <h5 class="m-quiz__finish-title a-font_h5">Мы подобрали вам программу обучения</h5>
        <div class="m-quiz__finish-desc a-font_l">
          Заполните форму, чтобы узнать больше о программе и наших предложений
        </div>
      </div>
      <div class="m-quiz__finish-inputs">
        <div class="m-quiz__finish-data">
          <a-input placeholder="Имя" v-model="send.name"></a-input>
          <a-input placeholder="Телефон" v-model="send.tel"></a-input>
          <a-button bgColor="accent" size="large" label="Отправить" @click="sendQuiz"></a-button>
        </div>
        <div class="m-quiz__finish-sogl a-font_l">
          Нажимая на кнопку, вы соглашаетсь с политикой конфиденциальности и на получение рассылок
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { AButton, AInput, AControl} from '@cwespb/synergyui';
  import getQuizzesDetail from '~/api/quizzesDetail';

  import '~/assets/styles/M-quiz.scss';

  export default {
    name: 'm-quiz',
    components: {
      AControl,
      AButton,
      AInput,
    },

    data: () => ({
      dataQuiz: null,
      dataQuestion: [],

      banerFlag: true,
      count: null,
      countPosition: 0,

      listAnsvers: [],
      ansver: '',

      send: {
        name: '',
        tel: '',
      },
      
    }),

    props: {
      imageFon: String,
      image: String,
      quizId: {},
    },

    async created() {
      const response = await getQuizzesDetail({ filter: { id: this.quizId } });
      console.log(response);

      this.dataQuiz = response;
      this.dataQuestion = response.questions.filter(item => item.answers.length > 0);
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

      sendQuiz() {

      },

      changeQuiz(value) {
        this.listAnsvers[this.countPosition] = { ...value, ansver: this.ansver };
        this.countPosition += 1;
      },

    },
  };
</script>
