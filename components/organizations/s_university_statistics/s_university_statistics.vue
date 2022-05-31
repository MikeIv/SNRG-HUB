<template>
  <section class="s-university-statistics s-margin">
    <div class="l-wide l-border-radius">
      <div class="s-university-statistics__header">
        <h2 class="s-university-statistics__title a-font_h2" v-html="title"></h2>
        <div class="s-university-statistics__tags">
          <span v-for="tag in tags" :key="tag.id" class="s-university-statistics__tag"
            ><i class="si-done"></i> {{ tag }}</span
          >
        </div>
      </div>

      <swiper ref="awesomeSwiper" :options="swiperOptionStatistics" class="s-university-statistics__factoids">
        <swiper-slide v-for="factoid in factoids" :key="factoid.id" class="">
          <a-factoid :color="factoid.color" :type="factoid.type" :title="factoid.title" :number="factoid.number" />
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script>
import { directive } from 'vue-awesome-swiper';
import { AFactoid } from '@cwespb/synergyui';
import './s_university_statistics.scss';

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
      title: 'Статистика',
      tags: ['Военный центр', 'Общежитие', 'Государственный'],
      factoids: [
        {
          number: '200+',
          title: 'Программ',
          type: 'number',
          color: 'color_link',
        },
        {
          number: '3 838',
          title: 'Бюджетных мест',
          type: 'number',
          color: 'color_link',
        },
        {
          number: '6 399',
          title: 'Платных мест',
          type: 'number',
          color: 'color_link',
        },
        {
          number: 'от 220 000',
          title: 'рублей в год',
          type: 'number',
          color: 'color_link',
        },
      ],

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
};
</script>
