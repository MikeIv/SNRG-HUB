<template>
  <SProgramContent
    :direction="direction"
    :factoids="programContentRightItems"
    :items="programContentList"
    :title="title"
  />
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
      programContentRightItems: [],
      direction: 'down',
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
    this.programContentRightItems = preData.json.rightItems.data.map((item, index) => ({
      id: index + 1,
      title: item.description && item.description.value ? item.description.value : '',
      number: item.title && item.title.value ? item.title.value : '',
      type: 'number',
      color: 'color_link',
    }));
  },
};
</script>
