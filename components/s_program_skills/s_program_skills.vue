<template>
  <SProgramSkills :title="title" :items="programSkillsList" />
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
    const preData = await getEntitiesSectionsDetail(expandedMethod);
    // eslint-disable-next-line no-param-reassign
    this.programSkillsList = preData.json.items.data.map(({ title }) => {
      title.type = 'icon';
      return title;
    });
  },
};
</script>
