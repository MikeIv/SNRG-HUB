<template>
  <SProgramSkills :title="title" :items="items" />
</template>

<script>
import { SProgramSkills } from '@cwespb/synergyui';
import './s_program_skills.scss';

export default {
  name: 's_program_skills',

  components: {
    SProgramSkills,
  },

  data() {
    return {
      title: 'Чему <span>вы научитесь</span>',
      items: [
        {
          id: 1,
          type: 'icon',
          text: 'Работа с базами данных',
        },
        {
          id: 2,
          type: 'icon',
          text: 'Разрабатывать технические задания для проектов',
        },
        {
          id: 3,
          type: 'icon',
          text: 'Верстать сайты любой сложности',
        },
        {
          id: 4,
          type: 'icon',
          text: 'Работа с разными операторами',
        },
        {
          id: 5,
          type: 'icon',
          text: 'Установка и настройка веб-серверов',
        },
        {
          id: 6,
          type: 'icon',
          text: 'Навыки работы с объектами',
        },
      ],
    };
  },
};
</script>
