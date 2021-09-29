<template>
  <SUniversityScore :title="title" :factoids="factoids" :imageSrc="imageSrc" />
</template>

<script>
import { SUniversityScore } from '@cwespb/synergyui';
import './s_university_score.scss';

export default {
  name: 's_university_score',

  components: {
    SUniversityScore,
  },

  data() {
    return {
      factoids: [
        {
          id: 1,
          type: 'line',
          lineNumber: '68',
          title: 'бюджет',
          colorLink: 'color_link',
        },
        {
          id: 2,
          type: 'line',
          lineNumber: '60',
          title: 'платное',
          colorLink: 'color_link',
        },
      ],
      title: 'Минимальный балл для постпуления в 2020',
      imageSrc:
        // eslint-disable-next-line max-len
        'data:image/svg+xml;base64, PHN2ZyB3aWR0aD0iMjY0IiBoZWlnaHQ9IjIxNiIgdmlld0JveD0iMCAwIDI2NCAyMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0yNDUuNDQzIDIyMi42NkwxMjEuOTU1IDEwOC4wMTRMMjQ1LjQ0MyAtNi42MjkzOUwyNjQgLTEzNy4wODJMMCAxMDcuOTg2TDI2NCAzNTMuMDgxTDI0NS40NDMgMjIyLjY2WiIgZmlsbD0iI0ZGMDA0MCIvPgo8L3N2Zz4K',
    };
  },
};
</script>
