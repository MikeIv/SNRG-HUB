<template>
  <section class="s-program-university">
    <div class="s-program-university__top">
      <h2 class="s-program-university__title a-font_h2" v-html="title"></h2>
      <p class="s-program-university__introtext a-font_xxl" v-html="introtext"></p>
      <p class="s-program-university__description" v-html="description"></p>
      <span class="s-program-university__img" v-if="image">
        <img :src="image" alt="" />
      </span>
    </div>
    <div class="s-program-university__factoids">
      <div class="s-program-university__factoids-item" v-for="(item, idx) in getAllItem" :key="idx">
        <AFactoid :title="item.description" :number="item.name" color="color_link" type="number" />
      </div>
      <div class="s-program-university__factoids-more" v-if="!flag && getAllItem.length < 6">
        <AButton size="large" bgColor="accent" label="Показать ещё" @click="flag = true"></AButton>
      </div>
    </div>
  </section>
</template>

<script>
import { AFactoid, AButton } from '@cwespb/synergyui';
import './s_program_university.scss';
import getOrganizationsDetail from '~/api/organizationsDetail';

export default {
  name: 'SProgramUniversity',

  components: {
    AFactoid,
    AButton,
  },
  computed: {
    getAllItem() {
      if (this.flag) {
        return this.programUniversityList;
      }
      return this.programUniversityList.slice(0, 6);
    },
  },
  data() {
    return {
      programUniversityList: [],
      baseUrl: process.env.NUXT_ENV_S3BACKET,
      title: '',
      introtext: '',
      description: '',
      image: '',
      flag: false,
    };
  },
  props: ['methods', 'productIds'],
  async fetch() {
    const expandedMethod = {
      filter: {
        product_id: this.productIds,
      },
      include: ['persons', 'city', 'triggers'],
    };
    const preData = await getOrganizationsDetail(expandedMethod);
    this.title = preData.data.name;
    this.introtext = preData.data.subtitle;
    this.description = preData.data.description;
    this.image = this.baseUrl + preData.data.logo;
    this.programUniversityList = preData.data.included.triggers;
  },
};
</script>
