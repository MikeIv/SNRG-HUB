<template>
  <SProgramContent :title="title" :direction="direction" :factoids="factoids" :items="programContentList" />
</template>

<script>
import { SProgramContent } from '@cwespb/synergyui';
import './s_program_content.scss';

import getEntitiesSectionsDetail from '~/api/entitiesSectionsDetail';

export default {
  name: 's_program_content',

  components: {
    SProgramContent,
  },

  data() {
    return {
      programContentList: [],
      direction: 'down',
      // factoids: [
      //   {
      //     id: 1,
      //     number: 93,
      //     title: 'тематических модуля',
      //     type: 'number',
      //     color: 'color_link',
      //   },
      // ],
    };
  },

  props: ['methods', 'title'],

  async fetch() {
    const expandedMethod = this.methods[0].data;
    const preData = await getEntitiesSectionsDetail(expandedMethod);
    this.programContentList = preData.json.items.data.map((item, index) => ({
      title: item.title.value,
      isActive: !index,
      listItems: item.items.data.map((elem, i) => ({
        id: i,
        type: 'dotted',
        text: elem.item.value,
        number: i + 1,
      })),
    }));
  },
};
</script>
