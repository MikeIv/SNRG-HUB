<template>
  <SUniversityCareer :title="title" :factoids="factoids" />
</template>

<script>
import { SUniversityCareer } from '@cwespb/synergyui';
import './s_university_career.scss';

export default {
  name: 's_university_career',

  components: {
    SUniversityCareer,
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
