<template>
  <section class="s-university-statistics">
    <div class="s-university-statistics__header">
      <h2 class="s-program-timeline__title a-font_h2" v-html="title"></h2>
      <div class="s-university-statistics__tags">
        <span v-for="tag in tags" :key="tag.id" class="s-university-statistics__tag">{{ tag }}</span>
      </div>
    </div>

    <div class="s-university-statistics__factoids">
      <AFactoid
        v-for="factoid in factoids"
        :key="factoid.id"
        :color="factoid.color"
        :type="factoid.type"
        :title="factoid.title"
        :number="factoid.number"
      />
    </div>
  </section>
</template>

<script>
import { AFactoid } from '@cwespb/synergyui';
import './s_university_statistics.scss';

export default {
  name: 's_university_statistics',

  components: {
    AFactoid,
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
    };
  },
};
</script>
