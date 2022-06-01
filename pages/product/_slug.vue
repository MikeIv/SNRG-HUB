<template>
  <div>
    <!-- <LazyHydrate :key="id" v-for="{ key, methods, title, id } in pageInfo.components" when-visible>
      <component :is="key" :methods="methods" :title="title" :productIds="pageInfo.entity_page"></component>
    </LazyHydrate> -->
    <s-program-infoblock />
    <s-program-people />
    <s-program-skills />
    <s-program-minimum-score />
  </div>
</template>

<script>
/* import LazyHydrate from 'vue-lazy-hydration'; */
import SProgramSkills from '~/components/product/s_program_skills/s_program_skills';
import SProgramPeople from '~/components/product/s_program_people/s_program_people';
import SProgramMinimumScore from '~/components/product/s_program_minimum_score/s_program_minimum_score';
import SProgramInfoblock from '~/components/product/s_program_infoblock/s_program_infoblock';

export default {
  layout: 'product',

  components: {
    SProgramSkills,
    SProgramPeople,
    SProgramMinimumScore,
    SProgramInfoblock,
    /* LazyHydrate, */
  },

  computed: {
    pageInfo() {
      return this.$store.state.pageInfo;
    },
    pageMeta() {
      return this.$store.state.pageMeta;
    },
  },

  head() {
    return {
      title: this.pageMeta?.title,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.pageMeta?.keywords,
        },
        {
          hid: 'description',
          name: 'description',
          content: this.pageMeta?.description,
        },
        {
          hid: 'og:type',
          name: 'og:type',
          content: 'website',
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.pageMeta?.title,
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: 'Synergyeducation',
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.pageMeta?.description,
        },
      ],
      bodyAttrs: {
        class: 'bg-gray',
      },
    };
  },
};
</script>

<style lang="scss">
.product-page {
  --layout-v-padding: 3.75rem; // 60px
  --layout-h-padding: 5rem; // 80px
  @media all and (max-width: 1199px) {
    --layout-h-padding: 1.875rem; // 30px
    --layout-v-padding: 2.5rem; // 40px
  }
  @media all and (max-width: 767px) {
    --layout-h-padding: 1rem; // 16px
    --layout-v-padding: 2rem; // 32px
  }
  @media screen and (max-width: 767px) {
    .l-default {
      --layout-padding: 0;
    }
  }
}
</style>
