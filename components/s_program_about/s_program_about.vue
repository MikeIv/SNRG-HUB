<template>
  <SProgramAbout :title="title" :description="description" :image="image" :factoids="factoids" />
</template>

<script>
import { SProgramAbout } from '@cwespb/synergyui';
import './s_program_about.scss';

export default {
  name: 's_program_about',

  components: {
    SProgramAbout,
  },

  data() {
    return {
      title: 'Зачем учиться <br>на <span>PHP-разработчика</span>',
      description:
        'PHP-программист — это специалист, который занимается созданием сайтов и различных web-приложений. Кроме того в его задачу входит интеграция цифровых продуктов с автоматизированными бизнес-системами',
      image: 'https://sys3.ru/marketplace/uploads/products_sections/610/8-items-0-icon.png',
      factoids: [
        {
          id: 1,
          number: '1450',
          title: 'компаний сейчас ищут специалистов на headhunter',
          type: 'number-horizontal',
        },
        {
          id: 2,
          number: '120 000 ₽',
          title: 'в среднем зарабатывает специалист среднего уровня',
          type: 'number-horizontal',
        },
        {
          id: 3,
          number: 'тест',
          title: 'тест',
          type: 'number-horizontal',
        },
      ],
    };
  },
};
</script>
