<template>
  <SProgramQuestions :title="title" :items="questionsList" />
</template>

<script>
import { SProgramQuestions } from '@cwespb/synergyui';
import './s_program_questions.scss';
import getEntitiesSectionsDetail from '~/api/entitiesSectionsDetail';

export default {
  name: 's_program_questions',

  components: {
    SProgramQuestions,
  },

  data() {
    return {
      questionsList: [],
    };
  },

  props: ['methods', 'title'],
  async fetch() {
    const expandedMethod = this.methods[0].data;
    const preData = await getEntitiesSectionsDetail(expandedMethod);
    this.questionsList = preData.json.items.data.map((item, index) => ({
      title: item.title.value,
      text: item.description.value,
      id: index + 1,
      isActive: !index,
    }));
  },
};
</script>
