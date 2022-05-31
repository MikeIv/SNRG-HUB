<template>
  <section class="s-program-minimum-score">
    <div class="l-wide l-border-radius">
      <div class="s-program-minimum-score__header">
        <h2 class="s-program-minimum-score__title a-font_h2" v-html="sectionData.title"></h2>
        <div class="s-program-minimum-score__btns">
          <ATag
            v-for="(tab, idx) in sectionData.items"
            :key="idx"
            :label="tab.label"
            :class="{ 'a-tag__item_active': tab.isActive }"
            @aTagClick="toggleTabs(tab)"
          />
        </div>
      </div>

      <div
        v-for="(tab, idx) in sectionData.items"
        :key="idx"
        class="s-program-minimum-score__items"
        :class="{ 's-program-minimum-score__items_active': tab.isActive }"
        v-show="tab.isActive"
      >
        <swiper :options="swiperOptionProgramExam">
          <swiper-slide v-for="exam in tab.subjects" :key="exam.id" class="s-program-minimum-score__item">
            <h5 class="s-program-minimum-score__item-caption a-font_h5">{{ exam.title }}</h5>
            <div class="s-program-minimum-score__item-factoids">
              <AFactoids
                v-for="(item, idx) in exam.list"
                :key="idx"
                :type="item.type"
                :title="item.title"
                :number="item.number"
              />
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { ATag } from '@cwespb/synergyui';
import AFactoids from '@/components/_ui/A-factoids/A-factoids';
import './s_program_minimum_score.scss';
import getProductSectionInfo from '~/api/productSectionInfo';

export default {
  name: 'SProgramMinimumScore',

  components: {
    ATag,
    AFactoids,
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      swiperOptionProgramExam: {
        slidesPerView: 'auto',
        spaceBetween: 0,
        resistance: true,
        resistanceRatio: 0,
        breakpoints: {
          768: {
            grabCursor: true,
          },
        },
      },

      sectionData: {},
    };
  },
  async fetch() {
    const requestData = { slug: this.$route.params.slug, key: 's-program-minimum-score' };
    this.sectionData = await getProductSectionInfo(requestData);
  },
  /* eslint no-param-reassign: ["error", { "props": false }] */
  methods: {
    toggleTabs(selectedTab) {
      this.sectionData.items.forEach((tab) => {
        tab.isActive = tab.label === selectedTab.label;
      });
    },
  },
};
</script>
