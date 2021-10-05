<template>
  <SProgramSkills :title="title" :items="universityAboutList" />
</template>

<script>
import { SProgramSkills } from '@cwespb/synergyui';
import './s_university_about.scss';
import getEntitiesSectionsDetail from '~/api/entitiesSectionsDetail';

export default {
  name: 's_university_about',

  components: {
    SProgramSkills,
  },

  data() {
    return {
      universityAboutList: [],
    };
  },
  props: ['methods', 'title'],
  async fetch() {
    const expandedMethod = this.methods[0].data;
    const preData = await getEntitiesSectionsDetail(expandedMethod);
    this.universityAboutList = preData.json.top.data.map(({ description }) => {
      // eslint-disable-next-line no-param-reassign
      description.type = 'icon';
      return description;
    });
  },
};
</script>
