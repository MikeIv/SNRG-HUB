<template>
  <section class="s-program-about" v-if="programAboutList.length">
    <div class="s-program-about__row">
      <h2 class="s-program-about__title a-font_h2" v-html="title"></h2>
      <p
        class="s-program-about__description a-font_xl"
        v-if="programAboutDescription.value"
        v-html="programAboutDescription.value"
      ></p>
    </div>
    <div class="s-program-about__triggers">
      <AFactoids
        v-for="item in programAboutList"
        :key="item.id"
        :type="item.type"
        :title="item.title"
        :number="item.number"
        :image="item.image"
        class="s-program-about__triggers-item"
      />
    </div>
  </section>
</template>

<script>
import AFactoids from '@/components/_ui/A-factoids/A-factoids';
import './s_program_about.scss';

import getEntitiesSectionsDetail from '~/api/entitiesSectionsDetail';

export default {
  name: 's_program_about',

  components: {
    AFactoids,
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
      type: item.icon && item.icon.value ? 'image' : 'number',
    }));
    console.log(this.programAboutList);
  },
};
</script>
