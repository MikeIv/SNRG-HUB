<template>
  <section class="s-article-list s-padding">
    <div class="l-wide">
      <div class="s-article-list__title a-font_h5">{{ title }}</div>
      <div class="s-article-list__wrapper">
        <template v-for="(article, index) in articles">
          <m-article
            :key="article.id"
            :article="article"
            v-if="articles && articles.length > 0 && index < maxCardsCount"
            :randomColor="getRandomColor(article.included.tags[0].name)"
          >
          </m-article>
        </template>
      </div>
      <nuxt-link to="/journal" class="s-article-list__btn-link">
        <AButton
          label="Показать все"
          bgColor="accent"
          size="large"
          class="s-article-list__btn"
          @click="onButtonMoreClick"
        />
      </nuxt-link>
    </div>
  </section>
</template>
<script>
import './s_article_list.scss';
import { AButton } from '@cwespb/synergyui';
import MArticle from '~/components/_ui/m_article/m_article';
import getArticlesList from '~/api/articlesList';

export default {
  name: 'SArticleList',
  data() {
    return {
      flag: false,
      baseUrl: process.env.NUXT_ENV_S3BACKET,
      maxCardsCount: 4,
      articles: [],
      tagColors: [
        'rgba(228, 43, 43, 1)',
        'rgba(5, 161, 143, 1)',
        'rgba(220, 3, 198, 1)',
        'rgba(0, 169, 227, 1)',
        'rgba(67, 86, 255, 1)',
        'rgba(107, 190, 0, 1)',
      ],
      tagColorsList: {},
      countColorIndex: 0,
      tags: [],
      urlToCatalog: '/journal',
    };
  },
  components: {
    MArticle,
    AButton,
  },

  props: ['methods', 'title', 'optionsSection'],

  async fetch() {
    const expandedMethod = {
      filter: {
        published: true,
      },
      include: ['publicationTypes', 'journalContent', 'articleAuthors', 'tags'],
    };
    const response = await getArticlesList(expandedMethod);
    this.articles = response.data;
  },

  mounted() {
    console.log(this.optionsSection);
  },

  methods: {
    showMoreCards() {
      this.flag = true;
    },
    getRandomColor(name) {
      if (Object.prototype.hasOwnProperty.call(this.tagColorsList, name)) {
        return this.tagColorsList[name];
      }

      this.tagColorsList[name] = this.tagColors[this.countColorIndex];
      if (this.countColorIndex === 5) {
        this.countColorIndex = 0;
      } else {
        this.countColorIndex += 1;
      }

      return this.tagColorsList[name];
    },
    onButtonMoreClick() {
      this.$router.push(this.urlToCatalog);
    },
  },
};
</script>
