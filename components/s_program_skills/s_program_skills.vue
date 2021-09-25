<template>
<div>
  <SProgramSkills :title="title" :items="programSkillsList.data" :type="icon"/>
  <pre>{{programSkillsList}}</pre>
</div>
</template>

<script>
import { SProgramSkills } from '@cwespb/synergyui';
import './s_program_skills.scss';
import getEntitiesSectionsDetail from '~/api/entitiesSectionsDetail';

export default {
  name: 's_program_skills',

  components: {
    SProgramSkills,
  },

  data() {
    return {
      programSkillsList: [],
    };
  },

  props: ['methods', 'title'],
  async fetch() {
    const expandedMethod = this.methods[0].data;
    let preData = await getEntitiesSectionsDetail(expandedMethod);
    preData = preData.json.items;

    this.programSkillsList = preData.map(({ data: { title }, ...item }) => ({ ...item, data: title }));
  },
};
</script>
