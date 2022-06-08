<template>
  <div>
    <s-program-start :product="program" />
    <s-program-cpa-line />
    <s-program-infoblock />
    <s-program-about />
    <s-program-minimum-score />
    <s-program-people />
    <s-program-skills />
    <s-program-timeline />
    <s-program-content />
    <s-program-diploma />
    <!-- <s-program-form v-if="!(program && program.offers)" :formProduct="program" /> -->

    <s-program-university />
    <s-program-teachers />
    <s-program-reviews />
    <s-program-questions />
    <s-program-recommend :organizationSlug="program && program.organization.slug" :product="program" />
    <s-program-recommend :product="program" />
    <s-program-forms :program="program" />
    <!-- <s-program-price v-if="program && program.offers" :product="program" />
    <s-program-form v-else :formProduct="program" /> -->
  </div>
</template>

<script>
/* import LazyHydrate from 'vue-lazy-hydration'; */
import SProgramStart from '~/components/product/s_program_start/s_program_start';
import SProgramContent from '~/components/product/s_program_content/s_program_content';
import SProgramAbout from '~/components/product/s_program_about/s_program_about';
import SProgramUniversity from '~/components/product/s_program_university/s_program_university';
import SProgramSkills from '~/components/product/s_program_skills/s_program_skills';
import SProgramPeople from '~/components/product/s_program_people/s_program_people';
import SProgramMinimumScore from '~/components/product/s_program_minimum_score/s_program_minimum_score';
import SProgramTeachers from '~/components/product/s_program_teachers/s_program_teachers';
import sProgramReviews from '~/components/product/s_program_reviews/s_program_reviews';
import SProgramTimeline from '~/components/product/s_program_timeline/s_program_timeline';
import SProgramInfoblock from '~/components/product/s_program_infoblock/s_program_infoblock';
import SProgramQuestions from '~/components/product/s_program_questions/s_program_questions';
import SProgramForms from '~/components/product/s_program_forms/s_program_forms';
/* import SProgramForm from '~/components/s_program_form/s_program_form';
import SProgramPrice from '~/components/product/s_program_price/s_program_price'; */
import getProductInfo from '~/api/productInfo';
import SProgramRecommend from '~/components/product/s_program_recommend/s_program_recommend';
import SProgramCpaLine from '~/components/product/s_program_cpa_line/s_program_cpa_line';
import SProgramDiploma from '~/components/organizations/s_program_diploma/s_program_diploma';

export default {
  layout: 'product',

  data() {
    return {
      program: null,
    };
  },

  components: {
    SProgramStart,
    SProgramContent,
    SProgramAbout,
    SProgramUniversity,
    SProgramSkills,
    SProgramPeople,
    SProgramTeachers,
    SProgramMinimumScore,
    sProgramReviews,
    SProgramTimeline,
    SProgramInfoblock,
    SProgramQuestions,
    SProgramRecommend,
    SProgramCpaLine,
    SProgramForms,
    /* SProgramForm,
    SProgramPrice, */
    SProgramDiploma,
    /* LazyHydrate, */
  },

  computed: {
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

  methods: {
    async getProductData() {
      const requestData = { slug: this.$route.params.slug };
      const resp = await getProductInfo(requestData);
      const {
        id, relationships, attributes, type,
      } = resp.data[0];
      const [level] = relationships?.levels?.data;
      const formats = relationships?.formats?.data;
      const [offers] = relationships?.offers?.data;
      const organization = relationships?.organization?.data;
      const seoTag = relationships?.seoTag?.data;
      const category = relationships?.category?.data;
      this.program = {
        id,
        type,
        ...attributes,
        levels: this.getRelationDetailByIdAndType(level, resp.included),
        formats: this.getRelationListByIdAndType(formats, resp.included),
        organization: this.getRelationDetailByIdAndType(organization, resp.included),
        seoTag: this.getRelationDetailByIdAndType(seoTag, resp.included),
        category: this.getRelationDetailByIdAndType(category, resp.included),
        offers: this.getRelationDetailByIdAndType(offers, resp.included),
      };
    },
    getRelationDetailByIdAndType(searchParams, included) {
      const foundType = included.find(({ id, type }) => searchParams?.id === id && searchParams?.type === type);
      if (foundType) {
        const { id, attributes, type } = foundType;
        return { id, ...attributes, type };
      }
      return null;
    },
    getRelationListByIdAndType(searchList, included) {
      const results = [];
      searchList.forEach((searchParam) => {
        const foundType = included.find(({ id, type }) => searchParam?.id === id && searchParam?.type === type);
        if (foundType) {
          const { id, attributes, type } = foundType;
          results.push({ id, ...attributes, type });
        }
      });
      return results;
    },
  },

  async fetch() {
    await this.getProductData();
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
