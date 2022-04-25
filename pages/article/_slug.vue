<template>
  <div class="s-article-detail__wrapper">
    <div class="l-wide l-border-radius">
      <SArticleDetail
        :content="articleBody"
        :title="title"
        :publicationTypes="publicationTypes"
        :date="dateArticle"
        :readingTime="readingTime"
        :subtitle="subtitle"
        :user="author"
        :previewImage="img"
        :digitalImage="digitalImage"
        :banner="banner"
        :categories="categories"
        :relatedArticles="relatedArticles"
        :tags="tags"
        :nameCourse="nameCourse"
        :studyingPrograms="programs"
      />
    </div>
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
      dateArticle: '',
      readingTime: 0,
      articleBody: '',
      subtitle: '',
      nameCourse: '',
      linkCourse: '',
      author: {},
      publicationTypes: {},
      img: '',
      digitalImage: '',
      banner: {},
      seoTags: [],
      categories: [],
      relatedArticles: [],
      programs: [],
      tags: [],
    };
  },

  middleware: ['parseUtms'],

  computed: {
    pageMeta() {
      return this.$store.state.pageMeta;
    },
    pageInfo() {
      return this.$store.state.pageInfo;
    },
  },

  async fetch() {
    const filter = {
      filter: { slug: this.$route.params.slug },
      include: [
        'journalContent',
        'publicationTypes',
        'studyingPrograms',
        'studyingPrograms.organization',
        'tags',
        'seoTags',
        'directions',
        'articleAuthors',
        'categories',
        'relatedArticles',
        'relatedArticles.journalContent',
      ],
    };

    const preData = await getArticleDetail(filter);

    const type = preData.included.publicationTypes[0];
    const author = preData.included.articleAuthors[0];
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    this.dateArticle = new Date(preData.created_at).toLocaleString('ru-Ru', options);
    this.title = preData.title;
    if (preData.included.seoTags) {
      this.seoTags = preData.included.seoTags;
    }
    this.subtitle = preData.included.journalContent.preview_text;
    this.readingTime = preData.included.journalContent.reading_time;
    // eslint-disable-next-line max-len
    this.articleBody = preData.included.journalContent.body.replace(
      /<([^>\s]+)[^>]*>(?:\s*(?:<br \/>|&nbsp;|&thinsp;|&ensp;|&emsp;|&#8201;|&#8194;|&#8195;)\s*)*<\/\1>/gm,
      '',
    );
    this.author = preData.included.journalContent.author;
    this.publicationTypes = type;
    this.author = author;
    this.img = preData.included.journalContent.preview_picture;
    this.digitalImage = preData.included.journalContent.digital_picture;
    this.banner = {
      title: preData.included.journalContent.banner_title ?? '',
      text: preData.included.journalContent.banner_text ?? '',
      img: preData.included.journalContent.banner_picture ?? '',
      link: preData.included.journalContent.banner_link ?? '',
    };
    this.categories = preData.included.categories;
    this.relatedArticles = preData.included.relatedArticles;
    this.tags = preData.included.tags;
    this.nameCourse = this.categories[0].name ?? '';
    this.linkCourse = this.categories[0].slug ?? '';
    this.programs = preData.included.studyingPrograms;
  },

  head() {
    return {
      title: this.pageMeta?.title,
      h1: this.pageMeta?.h1,
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
          hid: 'og:h1',
          name: 'og:h1',
          content: this.pageMeta?.h1,
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
