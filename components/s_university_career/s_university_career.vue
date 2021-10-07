<template>
  <!-- <SUniversityCareer :title="title" :factoids="factoids" /> -->
  <section class="s-university-career">
    <div class="s-university-career__wrap">
      <h2 class="s-university-career__title a-font_h2" v-html="title"></h2>
      <div class="s-university-career__items">
        <AFactoid
          v-for="factoid in factoids"
          :key="factoid.id"
          :type="factoid.type"
          :title="factoid.title"
          :lineNumber="factoid.lineNumber"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { AFactoid } from '@cwespb/synergyui';
import './s_university_career.scss';

export default {
  name: 's_university_career',

  components: {
    AFactoid,
  },

  data() {
    return {
      title: 'У нас есть все для <span>построения успешной карьеры</span>',
      factoids: [
        {
          id: 1,
          lineNumber: '20 лет',
          title: 'успешной работы',
          type: 'line',
        },
        {
          id: 2,
          lineNumber: '12 тысяч',
          title: 'выпускников',
          type: 'line',
        },
        {
          id: 3,
          lineNumber: '15 тысяч',
          title: 'действующих студентов',
          type: 'line',
        },
      ],
    };
  },
};
</script>
