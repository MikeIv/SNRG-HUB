<template>
  <SProgramContent
    :title="title"
    :direction="direction"
    :factoids="factoids"
    :items="items"
  />
</template>

<script>
import { SProgramContent } from '@cwespb/synergyui';
import './s_program_content.scss';

export default {
  name: 's_program_content',

  components: {
    SProgramContent,
  },

  data() {
    return {
      title: 'Программа обучения',
      factoids: [
        {
          id: 1,
          number: 93,
          title: 'тематических модуля',
          type: 'number',
          color: 'color_link',
        },
        {
          id: 2,
          number: 280,
          title: 'онлайн-уроков',
          type: 'number',
          color: 'color_link',
        },
      ],
      direction: 'down',
      items: [
        {
          id: 1,
          title: 'Базовый курс по PHP',
          isActive: true,
          listItems: [
            {
              id: 1,
              type: 'numbered',
              text: 'Что такое PHP',
              number: 1,
            },
            {
              id: 2,
              type: 'numbered',
              text: 'Константы, операторы сравнения, ветвления',
              number: 2,
            },
            {
              id: 3,
              type: 'numbered',
              text: 'Массивы, отслеживание потребления памяти',
              number: 3,
            },
            {
              id: 4,
              type: 'numbered',
              text: 'Консольные скрипты, интерактивная консоль',
              number: 4,
            },
          ],
        },
        {
          id: 2,
          title: 'Продвинутый курс по PHP',
          isActive: false,
          listItems: [
            {
              id: 1,
              type: 'dotted',
              text: 'Что такое PHP',
              number: 1,
            },
            {
              id: 2,
              type: 'dotted',
              text: 'Установка PHP',
              number: 2,
            },
          ],
        },
        {
          id: 3,
          title: 'GIT и командная работа',
          isActive: false,
          listItems: [
            {
              id: 1,
              type: 'dotted',
              text: '"Lorem ipsum dolor sit amet, consectetur',
              number: 1,
            },
            {
              id: 2,
              type: 'dotted',
              text: 'Ut enim ad minima veniam',
              number: 2,
            },
          ],
        },
      ],
    };
  },
};
</script>
