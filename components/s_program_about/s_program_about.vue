<template>
  <SProgramAbout v-if="programAboutList.length" :title="title" :description="programAboutDescription.value" :items="programAboutList" />
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
      programAboutDescription: [],
      programAboutList: [],
      baseUrl: process.env.NUXT_ENV_S3BACKET,
    };
  },

  props: ['methods', 'title'],
  async fetch() {
    const expandedMethod = this.methods[0].data;
    const preData = await getEntitiesSectionsDetail(expandedMethod);
    this.programAboutDescription = preData.json.description;
    this.programAboutList = preData.json.items.data.map((item, index) => ({
      id: index,
      number: item.title.value,
      title: item.description.value ?? '',
      image: item.icon ? this.baseUrl + item.icon.value : '',
      type: item.icon && item.icon.value ? 'image' : 'number-horizontal',
    }));
  },
};
</script>
