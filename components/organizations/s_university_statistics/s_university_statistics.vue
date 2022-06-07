<template>
  <section v-if="sectionData" class="s-university-statistics s-margin">
    <div class="l-wide l-border-radius">
      <div class="s-university-statistics__header">
        <h2 class="s-university-statistics__title a-font_h2" v-html="sectionData.title" />
        <div class="s-university-statistics__tags">
          <span v-for="(tag, index) in sectionData.tags" :key="index" class="s-university-statistics__tag"
            ><i class="si-done"></i> {{ tag }}</span
          >
        </div>
      </div>

      <swiper ref="awesomeSwiper" :options="swiperOptionStatistics" class="s-university-statistics__factoids">
        <swiper-slide v-for="(item, index) in sectionData.items" :key="index">
          <a-factoid :color="item.color" :type="item.type" :title="item.title" :number="item.lineNumber" />
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script>
import { directive } from 'vue-awesome-swiper';
import { AFactoid } from '@cwespb/synergyui';
import './s_university_statistics.scss';
import getOrganizationSectionInfo from '~/api/organizationSectionInfo';

export default {
  name: 'SUniversityStatistics',

  components: {
    AFactoid,
  },

  directives: {
    swiper: directive,
  },

  computed: {
    swiper() {
      return this.$refs.awesomeSwiper.swiper;
    },
  },

  data() {
    return {
      sectionData: null,
      swiperOptionStatistics: {
        slidesPerView: 2,
        spaceBetween: 8,
        loop: false,
        breakpoints: {
          576: {
            slidesPerView: 3,
            spaceBetween: 8,
          },
          1199: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1300: {
            slidesPerView: 4,
            spaceBetween: 20,
            resistance: true,
            resistanceRatio: 0,
          },
        },
      },
    };
  },

  async fetch() {
    const requestData = { slug: this.$route.params.slug, key: 's-university-statistics' };
    this.sectionData = await getOrganizationSectionInfo(requestData);
  },
};
</script>
