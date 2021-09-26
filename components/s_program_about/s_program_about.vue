<template>
  <SProgramAbout :title="title" :description="description" :factoids="programAboutList" />
</template>

<script>
import { SProgramAbout } from '@cwespb/synergyui';
import './s_program_about.scss';

import getEntitiesSectionsDetail from '~/api/entitiesSectionsDetail';

export default {
  name: 's_program_about',

  components: {
    SProgramAbout,
  },

  data() {
    return {
      programAboutList: [],
      baseUrl: process.env.NUXT_ENV_S3BACKET,
    };
  },

  props: ['methods', 'title'],
  async fetch() {
    const expandedMethod = this.methods[0].data;
    const preData = await getEntitiesSectionsDetail(expandedMethod);
    this.programAboutListArray = preData.json.items.data.map((item, index) => ({
      id: index + 1,
      number: item.title.value,
      title: item.description.value,
      image: item.icon.value,
    }));
  },
};
</script>
