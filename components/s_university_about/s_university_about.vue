<template>
  <section class="s-program-skills s-padding">
    <div class="l-wide">
      <h2 class="s-program-skills__title a-font_h2" v-html="title"></h2>
      <div class="s-program-skills__items">
        <AListElement v-for="(item, index) in programSkillsList" :key="index" :type="item.type" :label="item.value" />
      </div>
    </div>
  </section>
</template>

<script>
import { AListElement } from '@cwespb/synergyui';
import '../s_program_skills/s_program_skills.scss';
import getEntitiesSectionsDetail from '~/api/entitiesSectionsDetail';

export default {
  name: 'SProgramSkills',

  components: {
    AListElement,
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
    this.programSkillsList = preData.json.top.data.map(({ description }) => {
      // eslint-disable-next-line no-param-reassign
      description.type = 'icon';
      return description;
    });
  },
};
</script>
