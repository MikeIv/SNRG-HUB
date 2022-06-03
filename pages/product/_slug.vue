<template>
  <div>
    <!-- <LazyHydrate :key="id" v-for="{ key, methods, title, id } in pageInfo.components" when-visible>
      <component :is="key" :methods="methods" :title="title" :productIds="pageInfo.entity_page"></component>
    </LazyHydrate> -->
    <s-program-content />
    <s-program-cpa-line />
    <s-program-about />
    <s-program-infoblock />
    <s-program-minimum-score />
    <s-program-people />
    <s-program-timeline />
    <s-program-skills />
    <s-program-minimum-score />
    <s-program-teachers />
    <s-program-reviews />
    <s-program-questions />
  </div>
</template>

<script>
/* import LazyHydrate from 'vue-lazy-hydration'; */
import SProgramContent from '~/components/product/s_program_content/s_program_content';
import SProgramAbout from '~/components/product/s_program_about/s_program_about';
import SProgramSkills from '~/components/product/s_program_skills/s_program_skills';
import SProgramPeople from '~/components/product/s_program_people/s_program_people';
import SProgramMinimumScore from '~/components/product/s_program_minimum_score/s_program_minimum_score';
import SProgramTeachers from '~/components/product/s_program_teachers/s_program_teachers';
import sProgramReviews from '~/components/product/s_program_reviews/s_program_reviews';
import SProgramTimeline from '~/components/product/s_program_timeline/s_program_timeline';
import SProgramInfoblock from '~/components/product/s_program_infoblock/s_program_infoblock';
import SProgramQuestions from '~/components/product/s_program_questions/s_program_questions';
import SProgramCpaLine from '~/components/product/s_program_cpa_line/s_program_cpa_line';

export default {
  layout: 'product',

  components: {
    SProgramContent,
    SProgramAbout,
    SProgramSkills,
    SProgramPeople,
    SProgramTeachers,
    SProgramMinimumScore,
    sProgramReviews,
    SProgramTimeline,
    SProgramInfoblock,
    SProgramQuestions,
    SProgramCpaLine,
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
