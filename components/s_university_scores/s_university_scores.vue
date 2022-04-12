<template>
  <section class="s-university-score s-margin">
    <div class="l-wide l-border-radius">
      <h2 class="s-university-score__title a-font_h2" v-html="title"></h2>
      <div class="s-university-score__items">
        <a-factoid
          v-for="item in factoids"
          :key="item.id"
          :type="item.type"
          :title="item.title"
          :lineNumber="item.lineNumber"
          :color="item.colorLink"
        />
      </div>
      <div class="s-university-score__image" v-if="imageSrc">
        <img :src="imageSrc" alt="img" />
      </div>
    </div>
  </section>
</template>

<script>
import { AFactoid } from '@cwespb/synergyui';
import './s_university_scores.scss';
import getEntitiesSectionsDetail from '~/api/entitiesSectionsDetail';

export default {
  name: 's_university_scores',

  components: {
    AFactoid,
  },
  props: ['methods', 'title'],
  data() {
    return {
      factoids: [
        {
          id: 1,
          type: 'line',
          lineNumber: '68',
          title: 'бюджет',
          colorLink: 'color_link',
        },
        {
          id: 2,
          type: 'line',
          lineNumber: '60',
          title: 'платное',
          colorLink: 'color_link',
        },
      ],
      imageSrc:
        // eslint-disable-next-line max-len
        'data:image/svg+xml;base64, PHN2ZyB3aWR0aD0iMjY0IiBoZWlnaHQ9IjIxNiIgdmlld0JveD0iMCAwIDI2NCAyMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0yNDUuNDQzIDIyMi42NkwxMjEuOTU1IDEwOC4wMTRMMjQ1LjQ0MyAtNi42MjkzOUwyNjQgLTEzNy4wODJMMCAxMDcuOTg2TDI2NCAzNTMuMDgxTDI0NS40NDMgMjIyLjY2WiIgZmlsbD0iI0ZGMDA0MCIvPgo8L3N2Zz4K',
    };
  },
  async fetch() {
    const expandedMethod = this.methods[0].data;
    const preData = await getEntitiesSectionsDetail(expandedMethod);
    this.factoids[0].lineNumber = preData.json.budget_points.value;
    this.factoids[0].title = preData.json.budget_points.name;
    this.factoids[1].lineNumber = preData.json.contract_points.value;
    this.factoids[1].title = preData.json.contract_points.name;
  },
};
</script>
