<template>
  <section v-if="sectionData" class="s-program-questions s-margin">
    <div class="l-wide l-border-radius">
      <div class="s-program-questions__wrapper" itemscope itemtype="http://schema.org/Question">
        <h2 class="s-program-questions__title a-font_h2" v-html="sectionData.title || 'Часто задаваемые вопросы'" />
        <div class="s-program-questions__body">
          <div
            class="s-program-questions__row"
            v-for="(item, index) in sectionData.items"
            :key="index"
            @click.prevent="show = index"
          >
            <div class="s-program-questions__top">
              <div class="title a-font_xxl" itemprop="name">{{ item.title }}</div>
              <meta itemprop="answerCount" content="1" />
              <i class="s-program-content__icon" :class="`si-chevron-${show == index ? 'down' : 'up'}`"> </i>
            </div>
            <div
              class="s-program-questions__text a-font_xl"
              :class="{ _show: show == index }"
              itemprop="suggestedAnswer acceptedAnswer"
              itemscope
              itemtype="https://schema.org/Answer"
            >
              <div itemprop="text">{{ item.text }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import './s_program_questions.scss';
import getProductSectionInfo from '~/api/productSectionInfo';
import getOrganizationSectionInfo from '~/api/organizationSectionInfo';

export default {
  name: 'SProgramQuestions',

  data() {
    return {
      sectionData: null,
      show: 0,
    };
  },

  async fetch() {
    const requestData = { slug: this.$route.params.slug, key: 's-program-questions' };
    if (this.$route.name === 'product-slug') {
      this.sectionData = await getProductSectionInfo(requestData);
    } else {
      this.sectionData = await getOrganizationSectionInfo(requestData);
    }
  },
};
</script>
