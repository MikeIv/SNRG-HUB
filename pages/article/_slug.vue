<template>
  <div class="l-wide">
    <SArticleDetail
      :content="articleBody"
      :title="title"
      :publicationTypes="publicationTypes"
      :date="date"
      :readingTime="readingTime"
      :subtitle="subtitle"
      :user="author"
    />
  </div>
</template>

<script>
import getArticleDetail from '~/api/articleDetail';
import SArticleDetail from '~/components/s_article_detail/s_article_detail';

export default {
  layout: 'article',

  components: {
    SArticleDetail,
  },

  data() {
    return {
      title: '',
      date: '',
      readingTime: '',
      articleBody: '',
      subtitle: '',
      author: '',
      publicationTypes: {},
    };
  },

  middleware: ['parseUtms'],

  computed: {
    pageMeta() {
      return this.$store.state.pageMeta;
    },
  },

  async fetch() {
    // eslint-disable-next-line max-len
    const filter = {
      filter: { slug: this.$route.params.slug },
      include: ['journalContent', 'publicationTypes', 'directions', 'articleAuthors'],
    };
    const preData = await getArticleDetail(filter);
    this.title = preData.title;
    this.subtitle = preData.included.journalContent.preview_text;
    // this.publicationTypes = preData.included.publicationTypes[0];
    this.date = preData.included.journalContent.publish_date;
    this.readingTime = preData.included.journalContent.readingTime;
    this.articleBody = preData.included.journalContent.body;
    this.author = preData.included.journalContent.author;
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
