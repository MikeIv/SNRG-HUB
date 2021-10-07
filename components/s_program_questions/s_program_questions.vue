<template>
  <!-- <SProgramQuestions v-if="questionsList.length" :title="title" :items="questionsList" /> -->
  <section class="s-program-questions" v-if="questionsList.length">
    <div class="s-program-questions__wrapper">
      <h2 class="s-program-questions__title a-font_h2" v-html="title"></h2>
      <div class="s-program-questions__body">
        <div class="s-program-questions__row" v-for="item in questionsList" :key="item.id" @click="showMore(item)">
          <div class="s-program-questions__top">
            <div class="title a-font_xxl">{{ item.title }}</div>
            <i class="s-program-content__icon" :class="`si-chevron-${item.isActive ? 'down' : 'up'}`"> </i>
          </div>
          <div class="s-program-questions__text a-font_xl" v-if="item.isActive">
            {{ item.text }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import './s_program_questions.scss';
import getEntitiesSectionsDetail from '~/api/entitiesSectionsDetail';

export default {
  name: 's_program_questions',

  data() {
    return {
      questionsList: [],
      isActive: false,
    };
  },

  props: ['methods', 'title'],
  async fetch() {
    const expandedMethod = this.methods[0].data;
    const preData = await getEntitiesSectionsDetail(expandedMethod);
    this.questionsList = preData.json.items.data
      .filter((item) => item.title.value && item.description.value)
      .map((item, index) => ({
        title: item.title.value,
        text: item.description.value,
        id: index + 1,
        isActive: !index,
      }));
  },

  methods: {
    showMore(elem) {
      this.questionsList.forEach((item, i) => {
        if (item === elem) {
          this.questionsList[i].isActive = !this.questionsList[i].isActive;
        } else {
          this.questionsList[i].isActive = false;
        }
      });
    },
  },
};
</script>
